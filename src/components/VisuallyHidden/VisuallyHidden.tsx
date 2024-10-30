import React from "react";
import styles from "./VisuallyHidden.module.css";
const VisuallyHidden: React.FC<{ children: string }> = ({
  children,
  ...delegated
}) => {
  return (
    <span className={styles.visuallyHidden} {...delegated}>
      {children}
    </span>
  );
};
export default VisuallyHidden;
