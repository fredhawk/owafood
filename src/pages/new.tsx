import { type NextPage } from "next";
import Head from "next/head";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "The recipe name must be at least 2 characters.",
  }),
  description: z.string().min(3, {
    message: "The description must be at least 3 characters.",
  }),
  diet: z.string().min(2, {
    message: "The diet field must have at least 2 characters."
  }),
  yield: z.string().min(1, {
    message: "The yield field must be have least 1 characters."
  }),
  instruction: z.string().min(3, {
    message: "The instruction field must have at least 3 characters."
  }),
  ingredients: z.preprocess((val) => String(val).trim().split('\n').filter((s) => !!s === true), z.string().trim().min(1).array().nonempty({ message: "Recipe must contain at least 1 ingredient." })),
  preptime: z.optional(z
    .number({ invalid_type_error: "Prep time must be a positive number." })
    .nonnegative({ message: "Value must be positive number." })
    .int({ message: "Value must be a whole number." })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .nonnegative({ message: "Value must be positive number." })
        .int({ message: "Value must be a whole number." })
    )),
  fatcontent: z.optional(z.string().min(1, {
    message: "The fatcontent field must have at least 1 characters."
  })),
  calories: z.optional(z
    .number({ invalid_type_error: "Calories must be a positive number." })
    .nonnegative({ message: "Value must be positive number." })
    .int({ message: "Value must be a whole number." })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .nonnegative({ message: "Value must be positive number." })
        .int({ message: "Value must be a whole number." })
    )),
  cooktime: z
    .number({ invalid_type_error: "Cook time must be a positive number." })
    .nonnegative({ message: "Value must be positive number." })
    .int({ message: "Value must be a whole number." })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .nonnegative({ message: "Value must be positive number." })
        .int({ message: "Value must be a whole number." })
    ),
  meal: z.string().min(3, {
    message: "The mealtype field must have at least 3 characters."
  }),
  imageUrl: z.string().optional(),
})

const New: NextPage = () => {
  const createRecipe = api.recipe.create.useMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Test",
      description: "Test",
      diet: "LCHF",
      yield: "4 portions",
      instruction: "Test instructions",
      ingredients: [],
      preptime: 23,
      fatcontent: "aslkjasdf",
      calories: 340,
      cooktime: 34,
      meal: "Dinner",
      imageUrl: "",
    },
  })

  function handleImgUpload (r: CldUploadWidgetResults) {
      form.setValue('imageUrl', r?.info?.secure_url)
    }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ingredients = values.ingredients.map((ingredient) => {
      return { ingredient: ingredient }
    })

    const newValues = {
      ...values,
      ingredients,
    }
    
    await createRecipe.mutateAsync(newValues)
    form.reset()
  }
  return (
    <>
      <Head>
        <title>Add Recipe</title>
        <meta name="description" content="Add new recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center py-4">
        <h1 className="py-8">New recipe</h1>
        <Form {...form}>
          <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe name</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipe name" {...field} />
                  </FormControl>
                  {/*<FormDescription> Name of the recipe. </FormDescription>*/}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet</FormLabel>
                  <FormControl>
                    <Input placeholder="Diet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yield"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yield (portions)</FormLabel>
                  <FormControl>
                    <Input placeholder="Yield" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ingredients" {...field} />
                  </FormControl>
                  <FormDescription>Put each ingredient on a new line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preptime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prep time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Prep time in minutes." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatcontent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fatcontent</FormLabel>
                  <FormControl>
                    <Input placeholder="Fatcontent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Calories" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cooktime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooktime (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Cooktime in minutes." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal</FormLabel>
                  <FormControl>
                    <Input placeholder="Which meal" {...field} />
                  </FormControl>
                  <FormDescription>At what meal would you eat this?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormControl>
                    <CldUploadButton onSuccess={handleImgUpload} className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950" uploadPreset="uz5knhx9" options={{ sources: ['local'] }}>Upload image of the meal</CldUploadButton>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add recipe</Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default New;

