import { type NextPage } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
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
  mealtype: z.string().min(3, {
    message: "The mealtype field must have at least 3 characters."
  }),
})

const New: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      diet: "",
      yield: "",
      instruction: "",
      ingredients: [],
      preptime: 0,
      fatcontent: "",
      calories: 0,
      cooktime: 0,
      mealtype: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mealtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal</FormLabel>
                  <FormControl>
                    <Input placeholder="Which meal" {...field} />
                  </FormControl>
                  {/*<FormDescription>Short description of the recipe.</FormDescription>*/}
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

