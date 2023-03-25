import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

const projectsDirectory = path.join(process.cwd(), "projects");

export interface ProjectFrontmatterData {
  title: string;
  tags: string[];
}

export interface ProjectData extends ProjectFrontmatterData {
  id: string;
}

export interface ProjectDataWithContent extends ProjectData {
  contentHtml: string;
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

  const processedContent = await remark()
    .use(remarkHtml)
    .process(frontMatter.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...frontMatter.data,
  } as ProjectDataWithContent;
}
