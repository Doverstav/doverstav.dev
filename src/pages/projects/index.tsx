import Link from "next/link";
import { useMemo, useState } from "react";
import FilterButton from "../../../components/FilterButton";
import Layout from "../../../components/Layout";
import { getProjectsData, ProjectData } from "../../../utils/projects";
import { TagPill } from "../../../components/TagPill";
import styles from "./projects.module.css";
import Image from "next/image";
import githubLogo from "../../../public/assets/github-mark.png";
import { ExternalLinks } from "../../../components/ExternalLinks";

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
      <div className={styles.backLink}>
        <Link href={"/"}>{"<- Return to main"}</Link>
      </div>
      <h1>Currently {allProjectsData.length} projects:</h1>
      <h2>Filter</h2>
      <div>
        <div>
          {allTags.map((tag) => (
            <FilterButton
              key={tag}
              text={tag}
              clickHandler={() => handleFilterButtonClick(tag)}
              active={selectedTags.includes(tag)}
            />
          ))}
        </div>
        <div>
          <button onClick={() => setSelectedTags([])}>Clear filter</button>
        </div>
      </div>
      <hr />
      <div>
        {filteredProjects.map((projectFrontmatter) => (
          <div className={styles.projectContainer} key={projectFrontmatter.id}>
            <Link href={`/projects/${projectFrontmatter.id}`}>
              {projectFrontmatter.title}
            </Link>
            {projectFrontmatter.tags
              .sort((a, b) => a.localeCompare(b))
              .map((tag) => (
                <TagPill key={tag} tagText={tag} />
              ))}
            <p>{projectFrontmatter.excerpt}</p>
            <ExternalLinks
              github={projectFrontmatter.github}
              website={projectFrontmatter.website}
            />
          </div>
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
