import { createClient } from "contentful";
import Head from "next/head";
import Work from "../components/Work";
import styles from "../styles/Home.module.css";

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

export default function Home({ work }) {
  const sortWork = work.sort((a, b) => a.fields.order - b.fields.order);

  return (
    <>
      <Head>
        <title>Daniel Court | Senior Front End Developer</title>
      </Head>
      <section className={styles.welcome}>
        <div className="container">
          <p className={styles.welcome__intro}>
            Hi, I'm Daniel Court, a Senior Front End Developer based in London.
          </p>
          <p>
            My experiences include working on large scale ecommerce projects
            across multiple markets right through to smaller brochure style CMS
            sites, working on agile feature led projects, leading a team of
            developers across multiple countries and line managing developers.
          </p>
          <p>
            I've most recently been using the following technologies Javascript,
            Vue, Vuex, Sass, BEM and Jest on a Optimizely CMS but I also have
            experience using React, Redux, Magento, Craft and Wordpress.
          </p>
        </div>
      </section>
      <Work work={sortWork} />
    </>
  );
}
