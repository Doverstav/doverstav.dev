import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Layout from "../../../components/Layout";
import { getProjectsData, ProjectData } from "../../../utils/projects";

interface ProjectsProps {
  allProjectsData: ProjectData[];
}

export default function Projects({ allProjectsData }: ProjectsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProjectsData.forEach((projectData) =>
      projectData.tags.forEach((tag) => tagSet.add(tag))
    );

    return Array.from(tagSet);
  }, [allProjectsData]);

  const filteredProjects = useMemo(
    () =>
      selectedTags.length === 0
        ? allProjectsData
        : allProjectsData.filter((projectData) =>
            projectData.tags.some((tag) => selectedTags.includes(tag))
          ),
    [selectedTags, allProjectsData]
  );

  const handleFilterButtonClick = (tagClicked: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagClicked)
        ? prev.filter((tag) => tag !== tagClicked)
        : [...prev, tagClicked]
    );
  };

  return (
    <Layout>
      <h1>Currently {allProjectsData.length} projects:</h1>
      <h2>Filter</h2>
      <div>
        {allTags.map((tag) => (
          <button key={tag} onClick={() => handleFilterButtonClick(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <hr />
      <div>
        {filteredProjects.map((projectFrontmatter) => (
          <>
            <Link href={`/projects/${projectFrontmatter.id}`}>
              {projectFrontmatter.title}
            </Link>
            <p>{projectFrontmatter.tags}</p>
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
