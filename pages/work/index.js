import { createClient } from "contentful";
import Head from "next/head";
import Work from "../../components/Work";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const { items } = await client.getEntries({ content_type: "work" });

  return {
    props: {
      work: items,
    },
    revalidate: 1,
  };
}

export default function WorkPage({ work }) {
  const sortWork = work.sort((a, b) => a.fields.order - b.fields.order);

  return (
    <>
      <Head>
        <title>Daniel Court | Work</title>
      </Head>
      <Work work={sortWork} />
    </>
  );
}
