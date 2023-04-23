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
import ReactMarkdown from "react-markdown";
import sizeOf from "image-size";
import { join } from "path";
import Image from "next/image";
import { ExternalLinks } from "../../../components/ExternalLinks";

interface ProjectPageProps {
  projectData: ProjectDataWithContent;
  imageSizes: Record<string, { width: number; height: number }>;
}

export default function ProjectPage({
  projectData,
  imageSizes,
}: ProjectPageProps) {
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
        <div className={styles.externalLinksWrapper}>
          <ExternalLinks
            github={projectData.github}
            website={projectData.website}
          />
        </div>
        <ReactMarkdown
          components={{
            link: ({ href, children }) => (
              <Link href={href ?? ""}>{children}</Link>
            ),
            img: (props) => {
              if (props.src && imageSizes[props.src]) {
                const { src, alt } = props;
                const { width, height } = imageSizes[props.src];
                return (
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    width={width}
                    height={height}
                  />
                );
              } else {
                return <img {...props} />;
              }
            },
          }}
        >
          {projectData.content}
        </ReactMarkdown>
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

  const imageSizes: ProjectPageProps["imageSizes"] = {};

  // A regular expression to iterate on all images in the post
  const iterator = projectData.content.matchAll(/\!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    try {
      // Images are stored in `public`
      const { width, height } = sizeOf(join("public", src));
      imageSizes[src] = { width: width ?? 500, height: height ?? 500 };
    } catch (err) {
      console.error(`Can’t get dimensions for ${src}:`, err);
    }
  }

  return {
    props: {
      projectData,
      imageSizes,
    },
  };
}
