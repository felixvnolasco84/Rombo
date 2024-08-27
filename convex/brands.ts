import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: { id: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"brand">) => {
      const children = await ctx.db
        .query("brand")
        .withIndex("by_user_parent_and_org", (q) =>
          q.eq("userId", userId).eq("parentBrand", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      brandId: args.id,
      updatedAt: Date.now().toLocaleString(),
      action: "ARCHIVE",
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const getSidebar = query({
  args: {
    // orgId: v.string(),
    parentBrand: v.optional(v.id("brand")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("brand")
      .withIndex(
        "by_user_parent_and_org",
        (q) => q.eq("userId", userId).eq("parentBrand", args.parentBrand)
        // .eq("orgId", args.orgId)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    industry: v.string(),
    website: v.optional(v.string()),
    img: v.optional(v.string()),
    // orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const brandId = await ctx.db.insert("brand", {
      img: args.img,
      title: args.title,
      description: args.description,
      industry: args.industry,
      website: args.website,
      requests: [],
      userId,
      isArchived: false,
      updatedAt: Date.now(),
      isPublished: false,
      // orgId: args.orgId,
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: args.title,
      userId,
      updatedAt: Date.now().toLocaleString(),
      action: "CREATE",
      brandId,
      entityId: brandId,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return brandId;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("brand")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const restore = mutation({
  args: { id: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (documentId: Id<"brand">) => {
      const children = await ctx.db
        .query("brand")
        .withIndex("by_user_parent_and_org", (q) =>
          q.eq("userId", userId).eq("parentBrand", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"brand">> = {
      isArchived: false,
    };

    if (existingDocument.parentBrand) {
      const parent = await ctx.db.get(existingDocument.parentBrand);
      if (parent?.isArchived) {
        options.parentBrand = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      updatedAt: Date.now().toLocaleString(),
      action: "RESTORE",
      brandId: args.id,
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingBrand = await ctx.db.get(args.id);

    if (!existingBrand) {
      throw new Error("Not found");
    }

    if (existingBrand.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.delete(args.id);

    await ctx.db.insert("AuditLog", {
      entityTitle: existingBrand.title,
      userId,
      brandId: args.id,
      updatedAt: Date.now().toLocaleString(),
      action: "DELETE",
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("brand")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getById = query({
  args: { brandId: v.optional(v.id("brand")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (!args.brandId) {
      return undefined;
    }

    const brand = await ctx.db.get(args.brandId as Id<"brand">);

    const request = await ctx.db
      .query("requests")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    if (!brand) {
      throw new Error("Not found");
    }

    if (brand.isPublished && !brand.isArchived) {
      return brand;
    }

    //TODO: Uncomment this code to enable brand access control based in organization or user

    // if (brand.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    return brand;
  },
});

export const update = mutation({
  args: {
    id: v.id("brand"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    industry: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingBrand = await ctx.db.get(args.id);

    if (!existingBrand) {
      throw new Error("Not found");
    }

    //TODO: Uncomment this code to enable document access control based in organization or user
    // if (existingDocument.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    const brand = await ctx.db.patch(args.id, {
      ...rest,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: existingBrand.title,
      userId,
      brandId: args.id,
      updatedAt: Date.now().toLocaleString(),
      action: "UPDATE",
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return brand;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingBrand = await ctx.db.get(args.id);

    if (!existingBrand) {
      throw new Error("Not found");
    }

    if (existingBrand.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined,
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: existingBrand.title,
      userId,
      brandId: args.id,
      updatedAt: Date.now().toLocaleString(),
      action: "REMOVE_ICON",
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      img: undefined,
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      brandId: args.id,
      updatedAt: Date.now().toLocaleString(),
      action: "REMOVE_COVER_IMAGE",
      entityId: args.id,
      entityType: "BRAND",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});
