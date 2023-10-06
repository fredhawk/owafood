import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";


const Dashboard: NextPage = () => {
  const { data: recipes } = api.recipe.getRecipesByAuthor.useQuery();
  console.log(recipes)

  return (
    <>
      <Head>
        <title>Home of the worlds most delicious food</title>
        <meta name="description" content="Wonderfood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-red-500">
        <section>
          {recipes ? recipes.map((recipe) => (
            <Card key={recipe.id} className="max-w-md">
              {recipe.imageUrl ?
                <AspectRatio ratio={4 / 3}>
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </AspectRatio>
                : ''}
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.ingredient}</li>
                  ))}
                </ul>
                <p>{recipe.instruction}</p>
              </CardContent>
              <CardFooter>
                <p>{recipe.yield}</p>
                <Link href={`/r/${recipe.id}`}>Go to recipe</Link>
              </CardFooter>
            </Card>))
            : ''}
        </section>
        <section>
          <div>
            <pre>{JSON.stringify(recipes, null, 4)}</pre>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
