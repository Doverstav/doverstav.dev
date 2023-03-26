import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import Layout from "../../../components/layout";
import {
  getAllProjectsIds,
  getProjectData,
  ProjectDataWithContent,
} from "../../../utils/projects";

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
        <div>
          {projectData.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
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
