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

function stringToColor(string: string, saturation = 100, lightness = 75) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  return [
    `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`,
    `hsl(${hash % 360}, ${saturation}%, ${lightness * 0.75}%)`,
  ];
}
