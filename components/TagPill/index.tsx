import { stringToColor } from "../../utils/colors";
import styles from "./tagPill.module.css";

export interface TagPillProps {
  tagText: string;
}

export function TagPill({ tagText }: TagPillProps) {
  const [pillColor, borderColor] = stringToColor(tagText);

  return (
    <span
      className={styles.container}
      style={{ backgroundColor: pillColor, border: `2px solid ${borderColor}` }}
    >
      {tagText}
    </span>
  );
}
