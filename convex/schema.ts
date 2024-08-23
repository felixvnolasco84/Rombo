import { defineSchema, defineTable } from "convex/server";
import { v, Infer } from "convex/values";
import { stat } from "fs";
import { title } from "process";
import { update } from "./requests";

export const CURRENCIES = {
  USD: "usd",
  EUR: "eur",
} as const;
export const currencyValidator = v.union(
  v.literal(CURRENCIES.USD),
  v.literal(CURRENCIES.EUR)
);
export type Currency = Infer<typeof currencyValidator>;

export const INTERVALS = {
  MONTH: "month",
  YEAR: "year",
} as const;
export const intervalValidator = v.union(
  v.literal(INTERVALS.MONTH),
  v.literal(INTERVALS.YEAR)
);
export type Interval = Infer<typeof intervalValidator>;

export const PLANS = {
  FREE: "free",
  PRO: "pro",
} as const;
export const planKeyValidator = v.union(
  v.literal(PLANS.FREE),
  v.literal(PLANS.PRO)
);
export type PlanKey = Infer<typeof planKeyValidator>;

const priceValidator = v.object({
  stripeId: v.string(),
  amount: v.number(),
});
const pricesValidator = v.object({
  [CURRENCIES.USD]: priceValidator,
  [CURRENCIES.EUR]: priceValidator,
});

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
    .index("by_user_and_org", ["userId", "orgId"])
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
    .index("by_user_and_org", ["userId", "brandId"])
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
  requestsComments: defineTable({
    requestId: v.id("requests"),
    parentEntity: v.optional(v.id("requestsComments")),
    isArchived: v.boolean(),
    content: v.string(),
    userId: v.string(),
    userName: v.string(),
    userProfile: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_request", ["userId", "requestId"]),
  notifications: defineTable({
    userId: v.string(),
    requestId: v.id("requests"),
    isRead: v.boolean(),
    content: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_request", ["requestId"])
    .index("by_user_request", ["userId", "requestId"]),
  plans: defineTable({
    key: planKeyValidator,
    stripeId: v.string(),
    name: v.string(),
    description: v.string(),
    prices: v.object({
      [INTERVALS.MONTH]: pricesValidator,
      [INTERVALS.YEAR]: pricesValidator,
    }),
  })
    .index("key", ["key"])
    .index("stripeId", ["stripeId"]),
  subscriptions: defineTable({
    userId: v.id("users"),
    planId: v.id("plans"),
    priceStripeId: v.string(),
    stripeId: v.string(),
    currency: currencyValidator,
    interval: intervalValidator,
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  })
    .index("userId", ["userId"])
    .index("stripeId", ["stripeId"]),
});
