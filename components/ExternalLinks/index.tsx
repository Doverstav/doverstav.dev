import Link from "next/link";
import githubLogo from "../../public/assets/github-mark.png";
import Image from "next/image";
import styles from "./externalLinks.module.css";

export interface ExternalLinksProps {
  github?: string;
  website?: string;
}

export function ExternalLinks({ github, website }: ExternalLinksProps) {
  return (
    <div className={styles.externalLinkContainer}>
      {github && (
        <Link className={styles.externalLink} href={github}>
          <Image
            src={githubLogo}
            alt="Logo for Github"
            className={styles.externalLinkImage}
          />
          Github
        </Link>
      )}
      {website && (
        <Link className={styles.externalLink} href={website}>
          Website
        </Link>
      )}
    </div>
  );
}
