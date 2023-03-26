import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "../../components/layout";

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <div>Humble beginnings</div>
        <Link href={"/projects"}>Projects</Link>
      </main>
    </Layout>
  );
}
