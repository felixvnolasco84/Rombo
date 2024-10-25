import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: { id: v.id("requests") },
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
    const recursiveArchive = async (documentId: Id<"requests">) => {

      const children = await ctx.db
        .query("requests")
        .withIndex("by_user_parent_and_org", (q) =>
          q.eq("userId", userId).eq("parentRequest", documentId)
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
      brandId: existingDocument.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "ARCHIVE",
      entityId: args.id,
      entityType: "Request",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const getByBrand = query({
  args: { brandId: v.id("brand") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("requests")
      .withIndex("by_user_and_org", (q) =>
        q.eq("userId", userId).eq("brandId", args.brandId)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getSidebar = query({
  args: {
    orgId: v.optional(v.string()),
    parentRequest: v.optional(v.id("requests")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("requests")
      .withIndex(
        "by_user_parent_and_org",
        (q) => q.eq("userId", userId).eq("parentRequest", args.parentRequest)
        // .eq("orgId", args.orgId)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});


export const createWithStatus = mutation({
  args: {
    title: v.string(),
    brandId: v.id("brand"),
    category: v.string(),
    description: v.string(),
    deadline: v.string(),
    parentRequest: v.optional(v.id("requests")),
    priority: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const request = await ctx.db.insert("requests", {
      title: args.title,
      description: args.description,
      category: args.category,
      parentRequest: args.parentRequest,
      order: 0,
      brandId: args.brandId,
      userId,
      isArchived: false,
      isPublished: false,
      priority: args.priority,
      status: args.status,
      deadline: args.deadline,
      updatedAt: new Date().toISOString.toString(),
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: args.title,
      userId,
      brandId: args.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "CREATE",
      entityId: request,
      entityType: "Request",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return request;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    brandId: v.id("brand"),
    category: v.string(),
    description: v.string(),
    deadline: v.string(),
    parentRequest: v.optional(v.id("requests")),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const request = await ctx.db.insert("requests", {
      title: args.title,
      description: args.description,
      category: args.category,
      parentRequest: args.parentRequest,
      order: 0,
      brandId: args.brandId,
      userId,
      isArchived: false,
      isPublished: false,
      priority: args.priority,
      status: "TO DO",
      deadline: args.deadline,
      updatedAt: new Date().toISOString.toString(),
    });

    const controlLists = await ctx.db.insert("controlLists", {
      requestId: request,
      title: "Control Lists",
      userId,
      lists: [],
    });

    const defaultControlList = await ctx.db.insert("controList", {
      parentControlListsId: controlLists,
      title: "Default Control List",
      userId,
      requests: [],
    });


    await ctx.db.insert("AuditLog", {
      entityTitle: args.title,
      userId,
      brandId: args.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "CREATE",
      entityId: request,
      entityType: "Request",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });
      

    return request;
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
      .query("requests")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const restore = mutation({
  args: { id: v.id("requests") },
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

    const recursiveRestore = async (documentId: Id<"requests">) => {
      const children = await ctx.db
        .query("requests")
        .withIndex("by_user_parent_and_org", (q) =>
          q.eq("userId", userId).eq("parentRequest", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"requests">> = {
      isArchived: false,
    };

    if (existingDocument.parentRequest) {
      const parent = await ctx.db.get(existingDocument.parentRequest);
      if (parent?.isArchived) {
        options.parentRequest = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      brandId: existingDocument.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "RESTORE",
      entityId: args.id,
      entityType: "Request",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("requests") },
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

    const document = await ctx.db.delete(args.id);

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      brandId: existingDocument.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "DELETE",
      entityId: args.id,
      entityType: "Request",
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
      .query("requests")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getById = query({
  args: { requestId: v.optional(v.id("requests")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!args.requestId) {
      return undefined;
    }

    const document = await ctx.db.get(args.requestId as Id<"requests">);

    if (!document) {
      throw new Error("Not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //TODO: Uncomment this code to enable document access control based in organization or user

    // if (document.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    return document;
  },
});


export const orderUpdate = mutation({
  args: {
    requests: v.array(
      v.object({
        _id: v.id("requests"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    for (const request of args.requests) {
      const existingDocument = await ctx.db.get(request._id);

      if (!existingDocument) {
        throw new Error("Not found");
      }

      console.log(request._id, request.order);

      const document = await ctx.db.patch(request._id, {
        order: request.order,
      });

      // await ctx.db.insert("AuditLog", {
      //   entityTitle: existingDocument.title,
      //   userId,
      //   brandId: existingDocument.brandId,
      //   updatedAt: new Date().toISOString.toString(),
      //   action: "UPDATE",
      //   entityId: args.id,
      //   entityType: "Request",
      //   userImage: identity.pictureUrl || "",
      //   userName: identity.name || "",
      // });

      return document;
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("requests"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    order: v.optional(v.number()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    priority: v.optional(v.string()),
    estimatedTime: v.optional(v.number()),
    assignee: v.optional(v.string()),
    status: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    //TODO: Uncomment this code to enable document access control based in organization or user
    // if (existingDocument.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    await ctx.db.insert("AuditLog", {
      entityTitle: existingDocument.title,
      userId,
      brandId: existingDocument.brandId,
      updatedAt: new Date().toISOString.toString(),
      action: "UPDATE",
      entityId: args.id,
      entityType: "Request",
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return document;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("requests") },
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
      icon: undefined,
    });

    return document;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("requests") },
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
      coverImage: undefined,
    });

    return document;
  },
});
