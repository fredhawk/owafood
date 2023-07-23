import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      yield: z.string(),
      ingredients: z.object({
        ingredient: z.string()
    }).array(),
      instruction: z.string(),
      preptime: z.optional(z.number()),
      fatcontent: z.optional(z.string()),
      calories: z.optional(z.number()),
      cooktime: z.number(),
      meal: z.string(),
      diet: z.string(),
    })).mutation(async ({ input, ctx }) => {
      // TODO: redo ingredients
      console.log(input)
      const recipe = await ctx.prisma.recipe.create({
        data: {
          ...input,
          ingredients: {
            create: input.ingredients
          },
          authorId: ctx.auth.userId,
          imageUrl: 'https://placehold.co/600x400',
          datepublished: ''
        }
      })

      return recipe;
    })
});
