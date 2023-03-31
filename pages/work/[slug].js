import { createClient } from "contentful";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/WorkItem.module.css";
import Head from "next/head";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: "work" });
  const paths = response.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "work",
    "fields.slug": params.slug,
  });

  return {
    props: {
      work: items[0],
    },
    revalidate: 1,
  };
}

export default function RecipeDetails({ work }) {
  const {
    title,
    introduction,
    description,
    role,
    tech,
    agency,
    url,
    screenshots,
  } = work.fields;

  const pageTitle = `Daniel Court | ${title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <section className={styles.introduction}>
        <div className={styles.inner}>
          <h1>{title}</h1>
          {introduction && (
            <p className={styles.introduction__text}>{introduction}</p>
          )}
          {description && <p>{description}</p>}
        </div>
      </section>
      <section className={styles.list}>
        <div className={styles.inner}>
          {role && (
            <div className={styles.item}>
              <div className={styles.item__title}>Role</div>
              <div className={styles.item__value}>{role}</div>
            </div>
          )}
          {tech && (
            <div className={styles.item}>
              <div className={styles.item__title}>CMS</div>
              <div className={styles.item__value}>{tech}</div>
            </div>
          )}
          {agency && (
            <div className={styles.item}>
              <div className={styles.item__title}>Agency</div>
              <div className={styles.item__value}>{agency}</div>
            </div>
          )}
          {url && (
            <div className={styles.item}>
              <div className={styles.item__title}>URL</div>
              <div className={styles.item__value}>
                <a href={`http://${url}`} target="_blank">
                  {url}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className={styles.screenshots}>
        <Image
          className={styles.image}
          src={`https:${screenshots[0].fields.file.url}`}
          width={screenshots[0].fields.file.details.image.width}
          height={screenshots[0].fields.file.details.image.height}
          alt={`Screenshot of ${title} website`}
        />
      </section>
      <Link href="/work/" className={styles.more}>
        More Work
      </Link>
    </>
  );
}
