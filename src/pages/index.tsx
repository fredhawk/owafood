import { type NextPage } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input"

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();
  console.log(user)

  return (
    <>
      <Head>
        <title>Home of the worlds most delicious food</title>
        <meta name="description" content="Wonderfood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-red-500">
        <h1>Hi and welcome</h1>
        <Input type="email" placeholder="Email" />
      </main>
    </>
  );
};

export default Home;
