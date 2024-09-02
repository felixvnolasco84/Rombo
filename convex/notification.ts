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
      .query("notifications")
      .withIndex("by_user_request", (q) =>
        q.eq("userId", userId).eq("requestId", args.requestId)
      )
      .order("desc")
      .collect();

    return comments;
  },
});

export const getAll = query({
  args: {
    // orgId: v.optional(v.string()),
    // parentRequest: v.optional(v.id("requests")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // const tasks = await ctx.db.query("notifications").order("desc").collect();
    const logs = await ctx.db.query("AuditLog").order("desc").collect();

    return logs;
  },
});

export const create = mutation({
  args: {
    requestId: v.id("requests"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const comment = await ctx.db.insert("notifications", {
      requestId: args.requestId,
      isRead: false,
      content: args.content,
      userId: userId,
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
    entityId: v.id("requests"),
    entityType: v.string(),
    parentEntity: v.optional(v.id("requests")),
    isArchived: v.boolean(),
    content: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { entityId, ...rest } = args;

    const existingComment = await ctx.db.get(args.entityId);

    if (!existingComment) {
      throw new Error("Not found");
    }

    //TODO: Uncomment this code to enable document access control based in organization or user
    // if (existingDocument.userId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    const comment = await ctx.db.patch(args.entityId, {
      ...rest,
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
