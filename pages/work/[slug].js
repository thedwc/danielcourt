import { createClient } from "contentful";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/WorkItem.module.css";
import Head from "next/head";
import WorkDetailItem from "../../components/WorkDetailItem";

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
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "work",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      work: items[0],
    },
    revalidate: 1,
  };
}

export default function WorkDetails({ work }) {
  if (!work) {
    return (
      <section className={styles.list}>
        <div className="container">Loading...</div>
      </section>
    );
  }

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
        <div className="container">
          <h1>{title}</h1>
          {introduction && (
            <p className={styles.introduction__text}>{introduction}</p>
          )}
          {description && <p>{description}</p>}
        </div>
      </section>
      <section className={styles.list}>
        <div className="container">
          {role && <WorkDetailItem title="Role" value={role} />}
          {tech && <WorkDetailItem title="CMS" value={tech} />}
          {agency && <WorkDetailItem title="Agency" value={agency} />}
          {url && <WorkDetailItem title="URL" value={url} hasLink="true" />}
        </div>
      </section>
      <section className={styles.screenshots}>
        <Image
          className={styles.screenshots__image}
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
