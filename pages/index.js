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
            Hi, I'm a Senior Front End Developer based in London.
          </p>
          <p>
            My skills and experience include working with HTML5, CSS3, Less,
            Sass, BEM, jQuery, JavaScript, React, Redux, ES6, Grunt, Webpack,
            Git, Magento, Wordpress, Craft and Drupal. I also lead a team of
            Front End Developers and have experience of working with, and
            managing, freelancer developers as well as offshore developers.
          </p>
        </div>
      </section>
      <Work work={sortWork} />
    </>
  );
}
