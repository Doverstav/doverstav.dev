import styles from "./filterButton.module.css";

interface FilterButtonProps {
  text: string;
  clickHandler: () => void;
  active: boolean;
}

export default function FilterButton({
  text,
  clickHandler,
  active,
}: FilterButtonProps) {
  return (
    <button
      className={active ? styles.active : undefined}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
