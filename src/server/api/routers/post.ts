import "server-only"; // Make sure you can't import this on client

import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(posts).values({
        name: input.name,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(posts).where(eq(posts.id, input.id)); // Delete post from DB
    }),

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany();
  }),
});
