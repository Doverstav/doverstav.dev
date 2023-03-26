import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <h1>Humble beginnings</h1>
        <Link href={"/projects"}>Projects</Link>
      </main>
    </Layout>
  );
}
