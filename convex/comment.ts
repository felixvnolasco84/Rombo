import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// export const archive = mutation({
//   args: { id: v.id("requestsComments") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingComment = await ctx.db.get(args.id);

//     if (!existingComment) {
//       throw new Error("Not found");
//     }

//     if (existingComment.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const recursiveArchive = async (documentId: Id<"requestsComments">) => {
//       const children = await ctx.db
//         .query("requestsComments")
//         .withIndex("by_user_request", (q) =>
//           q.eq("userId", userId).eq("requestId", documentId)
//         )
//         .collect();

//       for (const child of children) {
//         await ctx.db.patch(child._id, {
//           isArchived: true,
//         });

//         await recursiveArchive(child._id);
//       }
//     };

//     const comment = await ctx.db.patch(args.id, {
//       isArchived: true,
//     });

//     recursiveArchive(args.id);

//     return comment;
//   },
// });

export const getByRequestId = query({
  args: { requestId: v.id("requests") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const comments = await ctx.db
      .query("requestsComments")
      .withIndex("by_user_request", (q) =>
        q.eq("userId", userId).eq("requestId", args.requestId)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return comments;
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

export const create = mutation({
  args: {
    entityId: v.id("requests"),
    brandId: v.id("brand"),
    parentEntity: v.optional(v.id("requests")),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const comment = await ctx.db.insert("requestsComments", {
      requestId: args.entityId,
      brandId: args.brandId,
      userProfile: identity.pictureUrl || "",
      userName: identity.name || "",
      content: args.content,
      userId: userId,
      isArchived: false,
    });

    await ctx.db.insert("AuditLog", {
      action: "CREATE",
      entityId: args.entityId,
      entityTitle: args.content,
      entityType: "Comment",
      userId,
      brandId: args.brandId,
      updatedAt: new Date().toISOString(),
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });
    return comment;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const comment = await ctx.db
      .query("requestsComments")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return comment;
  },
});

// export const restore = mutation({
//   args: { id: v.id("requestsComments") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const userId = identity.subject;

//     const existingComment = await ctx.db.get(args.id);

//     if (!existingComment) {
//       throw new Error("Not found");
//     }

//     if (existingComment.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const recursiveRestore = async (commentId: Id<"requestsComments">) => {
//       const children = await ctx.db
//         .query("requestsComments")
//         .withIndex("by_user_entity", (q) =>
//           q.eq("userId", userId).eq("commentId", commentId)
//         )
//         .collect();

//       for (const child of children) {
//         await ctx.db.patch(child._id, {
//           isArchived: false,
//         });

//         await recursiveRestore(child._id);
//       }
//     };

//     const options: Partial<Doc<"comments">> = {
//       isArchived: false,
//     };

//     if (existingComment.parentEntity) {
//       const parent = await ctx.db.get(existingComment.parentEntity);
//       if (parent?.isArchived) {
//         options.parentEntity = undefined;
//       }
//     }

//     const comment = await ctx.db.patch(args.id, options);

//     recursiveRestore(args.id);

//     return comment;
//   },
// });

export const remove = mutation({
  args: { id: v.id("requestsComments") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingComment = await ctx.db.get(args.id);

    if (!existingComment) {
      throw new Error("Not found");
    }

    if (existingComment.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const comment = await ctx.db.delete(args.id);

    await ctx.db.insert("AuditLog", {
      action: "DELETE",
      entityId: existingComment.requestId,
      entityTitle: existingComment.content,
      entityType: "Comment",
      userId,
      brandId: existingComment.brandId,
      updatedAt: new Date().toISOString(),
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return comment;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const comments = await ctx.db
      .query("requestsComments")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return comments;
  },
});

export const getById = query({
  args: { commentId: v.optional(v.id("requestsComments")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!args.commentId) {
      return undefined;
    }

    const comment = await ctx.db.get(args.commentId as Id<"requestsComments">);

    if (!comment) {
      throw new Error("Not found");
    }

    if (!comment.isArchived) {
      return comment;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //TODO: Uncomment this code to enable document access control based in organization or user

    // if (document.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    return comment;
  },
});

export const update = mutation({
  args: {
    commentId: v.id("requestsComments"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { commentId, ...rest } = args;

    const existingComment = await ctx.db.get(args.commentId);

    if (!existingComment) {
      throw new Error("Not found");
    }

    //TODO: Uncomment this code to enable document access control based in organization or user
    // if (existingDocument.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    const comment = await ctx.db.patch(args.commentId, {
      ...rest,
    });

    await ctx.db.insert("AuditLog", {
      action: "UPDATE",
      entityId: existingComment.requestId,
      entityTitle: existingComment.content,
      entityType: "Comment",
      userId,
      brandId: existingComment.brandId,
      updatedAt: new Date().toISOString(),
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return comment;
  },
});

// export const removeIcon = mutation({
//   args: { id: v.id("requests") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       icon: undefined,
//     });

//     return document;
//   },
// });

// export const removeCoverImage = mutation({
//   args: { id: v.id("requests") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }

//     const userId = identity.subject;

//     const existingDocument = await ctx.db.get(args.id);

//     if (!existingDocument) {
//       throw new Error("Not found");
//     }

//     if (existingDocument.userId !== userId) {
//       throw new Error("Unauthorized");
//     }

//     const document = await ctx.db.patch(args.id, {
//       coverImage: undefined,
//     });

//     return document;
//   },
// });
