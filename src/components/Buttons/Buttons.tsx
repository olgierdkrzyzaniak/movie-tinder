import React from "react";
import { X, Heart } from "react-feather";
import styles from "./Buttons.module.css";
import VisuallyHidden from "../VisuallyHidden";

interface ButtonProps {
  type: "accept" | "reject";
  onClick: () => void;
}

interface ButtonsProps {
  onActionClick: (action: "yes" | "no") => void;
}

const Button: React.FC<ButtonProps> = ({ type, onClick }) => {
  return (
    <button
      className={type === "accept" ? styles.acceptButton : styles.rejectButton}
      onClick={onClick}
    >
      {type === "accept" ? (
        <Heart style={{ marginBottom: -8 }} />
      ) : (
        <X style={{ marginBottom: -7 }} />
      )}
      <VisuallyHidden>{type}</VisuallyHidden>
    </button>
  );
};

const Buttons: React.FC<ButtonsProps> = ({ onActionClick }) => {
  return (
    <div className={styles.buttons}>
      <Button type="reject" onClick={() => onActionClick("no")} />
      <Button type="accept" onClick={() => onActionClick("yes")} />
    </div>
  );
};

export default Buttons;
