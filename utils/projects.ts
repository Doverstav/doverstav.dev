import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "projects");

export interface ProjectFrontmatterData {
  title: string;
  excerpt: string;
  tags: string[];
  github?: string;
  website?: string;
}

export interface ProjectData extends ProjectFrontmatterData {
  id: string;
}

export interface ProjectDataWithContent extends ProjectData {
  content: string;
}

export function getProjectsData() {
  const filenames = fs.readdirSync(projectsDirectory);

  return filenames.map((filename) => {
    const id = filename.replace(/\.md$/, "");

    const fullPath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const frontMatter = matter(fileContents);

    return { id, ...frontMatter.data } as ProjectData;
  });
}

export function getAllProjectsIds() {
  const filenames = fs.readdirSync(projectsDirectory);

  return filenames.map((filename) => ({
    params: { id: filename.replace(/\.md$/, "") },
  }));
}

export async function getProjectData(id: string) {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const frontMatter = matter(fileContents);

  return {
    id,
    content: frontMatter.content,
    ...frontMatter.data,
  } as ProjectDataWithContent;
}
