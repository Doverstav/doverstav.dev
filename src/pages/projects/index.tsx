import Link from "next/link";
import Layout from "../../../components/layout";
import { getProjectsData, ProjectData } from "../../../utils/projects";

interface ProjectsProps {
  allProjectsData: ProjectData[];
}

export default function Projects({ allProjectsData }: ProjectsProps) {
  return (
    <Layout>
      Projects {allProjectsData.length}:
      <div>
        {allProjectsData.map((projectFrontmatter) => (
          <>
            <Link href={`/projects/${projectFrontmatter.id}`}>
              {projectFrontmatter.title}
            </Link>
            <div>{projectFrontmatter.tags}</div>
          </>
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const allProjectsData = getProjectsData();

  return {
    props: {
      allProjectsData,
    },
  };
}
