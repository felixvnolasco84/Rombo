import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { stat } from "fs";
import { title } from "process";
import { update } from "./requests";

export default defineSchema({
  spaces: defineTable({
    title: v.string(),
    orgId: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentSpace: v.optional(v.id("spaces")),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentSpace", "orgId"]),
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    orgId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["parentDocument", "orgId"]),
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),

  userFavoriteDocuments: defineTable({
    orgId: v.string(),
    userId: v.string(),
    documentId: v.id("documents"),
  })
    .index("by_document", ["documentId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_document", ["userId", "documentId"])
    .index("by_user_document_org", ["userId", "documentId", "orgId"]),
  userFavoriteBoards: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
  })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),

  orgSubscription: defineTable({
    orgId: v.string(),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    stripeCurrentPeriodEnd: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_subscription", ["stripeSubscriptionId"]),

  brand: defineTable({
    img: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    industry: v.string(),
    website: v.optional(v.string()),
    requests: v.array(v.id("requests")),
    orgId: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    parentBrand: v.optional(v.id("brand")),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    })
    .index("by_user", ["userId"])
    .index("by_user_parent_and_org", ["userId", "parentBrand", "orgId"]),

  requests: defineTable({
    coverImage: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    status: v.optional(v.string()),
    priority: v.optional(v.string()),
    // orgId: v.string(),
    order: v.optional(v.number()),
    deadline: v.optional(v.string()),
    brandId: v.id("brand"),
    userId: v.string(),
    isArchived: v.boolean(),
    dueDate: v.optional(v.string()),
    parentRequest: v.optional(v.id("requests")),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    updatedAt: v.optional(v.string()),
  })
    // .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      // filterFields: ["orgId"],
    })
    .index("by_user", ["userId"])
    // .index("by_user_parent_and_org", ["userId", "parentRequest", "orgId"]),
    .index("by_user_parent_and_org", ["userId", "parentRequest"]),

  controlLists: defineTable({
    title: v.string(),
    userId: v.string(),
    lists: v.array(v.id("controlList")),
    requestId: v.id("requests"),
  }).index("by_user_request", ["userId", "requestId"]),

  controList: defineTable({
    title: v.optional(v.string()),
    userId: v.string(),
    parentControlListsId: v.optional(v.id("controlLists")),
    requests: v.array(v.id("simpleRequests")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentControlListsId"]),

  simpleRequests: defineTable({
    title: v.string(),
    userId: v.string(),
    status: v.optional(v.string()),
    controlListId: v.id("controList"),
  })
    .index("by_user_listsControl", ["userId", "controlListId"])
    .index("by_user_listsControlAndStatus", [
      "userId",
      "controlListId",
      "status",
    ]),
  comment: defineTable({
    content: v.string(),
    userId: v.string(),
    entityId: v.id("entity"),
    entityType: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_entity", ["entityId"])
    .index("by_user", ["userId"])
    .index("by_user_entity", ["userId", "entityId"]),
});
