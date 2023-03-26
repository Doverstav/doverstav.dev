import Head from "next/head";
import { ReactNode } from "react";
import styles from "./layout.module.css";

export interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Doverstav.dev</title>
        <meta name="description" content="Doverstav.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Doverstav.dev" />
      </Head>
      <main>{children}</main>
    </div>
  );
}
