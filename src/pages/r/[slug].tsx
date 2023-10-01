import { api } from "@/utils/api";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Recipe: NextPage = () => {
  const router = useRouter()
  const { data } = api.recipe.getSingle.useQuery({ recipeId: router.query.slug as string });
  // console.log(data)

  return (
    <>
      <Head>
        <title>Recipe - {data?.name}</title>
        <meta name="description" content="Wonderfood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-red-500">
        <section>
          <article className="card">
            <div>
              <img src={data?.imageUrl || ''} alt={data?.name || ''} />
            </div>
            <section><h2>{data?.name}</h2>
              <p>{data?.description}</p>
              <ul>
                {data?.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.ingredient}</li>)}
              </ul>

              <p>{data?.instruction}</p>
              <div>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </section>
          </article>
        </section>
        <section>
          <div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Recipe;

