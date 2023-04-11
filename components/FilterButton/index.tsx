import { stringToColor } from "../../utils/colors";
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
  const [activeMainColor, activeBorderColor] = stringToColor(text);
  const activeStyle = {
    backgroundColor: activeMainColor,
    border: `2px solid ${activeBorderColor}`,
  };

  return (
    <button
      className={styles.button}
      style={active ? activeStyle : {}}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
