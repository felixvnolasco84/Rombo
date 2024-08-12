import { v } from "convex/values";
import { asyncMap } from "convex-helpers";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { PLANS } from "./schema";

export const getActivePlans = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (!userId) {
      return;
    }

    const [free, pro] = await asyncMap(
      [PLANS.FREE, PLANS.PRO] as const,
      (key) =>
        ctx.db
          .query("plans")
          .withIndex("key", (q) => q.eq("key", key))
          .unique()
    );
    if (!free || !pro) {
      throw new Error("Plan not found");
    }
    return { free, pro };
  },
});
