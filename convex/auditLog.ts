import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    bradId: v.id("brand"),
    entityId: v.string(),
    entityTitle: v.string(),
    entityType: v.string(),
    action: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const activity = await ctx.db.insert("AuditLog", {
      entityTitle: args.title,
      userId,
      brandId: args.bradId,
      updatedAt: Date.now().toLocaleString(),
      action: args.action,
      entityId: args.entityId,
      entityType: args.entityType,
      userImage: identity.pictureUrl || "",
      userName: identity.name || "",
    });

    return activity;
  },
});

export const getByEntity = query({
  args: {
    entityId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const activity = await ctx.db
      .query("AuditLog")
      .withIndex("by_entity", (q) => q.eq("entityId", args.entityId))
      .order("desc")
      .collect();

    return activity;
  },
});

export const getByBrand = query({
  args: {
    brandId: v.id("brand"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const activity = await ctx.db
      .query("AuditLog")
      .withIndex("by_brand", (q) => q.eq("brandId", args.brandId))
      .order("desc")
      .collect();

    return activity;
  },
});
