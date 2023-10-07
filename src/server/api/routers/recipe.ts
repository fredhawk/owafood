import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getRecipesByAuthor: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      where: {
        authorId: ctx.auth.userId,
      },
      include: {
        ingredients: true,
      }
    })
  }),
  getSingle: publicProcedure.input(z.object({recipeId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: {
        id: input.recipeId,
      },
      include: {
        ingredients: true,
      }
    })
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      include: {
        ingredients: true,
      }
    });
  }),
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
      imageUrl: z.optional(z.string()),
    })).mutation(async ({ input, ctx }) => {
      const recipe = await ctx.prisma.recipe.create({
        data: {
          ...input,
          ingredients: {
            create: input.ingredients
          },
          authorId: ctx.auth.userId,
          datepublished: ''
        }
      })

      return recipe;
    }),
  delete: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
    const deleteIngredients = ctx.prisma.ingredient.deleteMany({
      where: {
        recipeId: input.id
      }
    })

    const deleteRecipe = ctx.prisma.recipe.delete({
      where: {
        id: input.id
      },
    })

    return await ctx.prisma.$transaction([deleteIngredients, deleteRecipe])
  })
});
