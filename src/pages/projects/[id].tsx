import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import Layout from "../../../components/Layout";
import {
  getAllProjectsIds,
  getProjectData,
  ProjectDataWithContent,
} from "../../../utils/projects";
import { TagPill } from "../../../components/TagPill";
import Link from "next/link";
import styles from "./projects.module.css";

interface ProjectPageProps {
  projectData: ProjectDataWithContent;
}

export default function ProjectPage({ projectData }: ProjectPageProps) {
  return (
    <Layout>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      <article>
        <div className={styles.backLink}>
          <Link href={"/projects"}>{"<- Return to projects"}</Link>
        </div>
        <div>
          {projectData.tags.map((tag) => (
            <TagPill key={tag} tagText={tag} />
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
        <div className={styles.backLink}>
          <Link href={"/projects"}>{"<- Return to projects"}</Link>
        </div>
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  const paths = getAllProjectsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const projectData = await getProjectData(params.id);

  return {
    props: {
      projectData,
    },
  };
}
