import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Doverstav.dev</title>
        <meta name="description" content="Doverstav.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>Humble beginnings</div>
        <Link href={"/projects"}>Projects</Link>
      </main>
    </>
  );
}
