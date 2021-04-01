import React, { useState } from "react";
import styles from "./index.module.css";

function Panel() {
  const [currentPanel, setCurrentPanel] = useState(0);

  const componentPages = [0, 1, 2];
  function incComponent() {
    //array with order of pages, move to NEXT index on button click
    if (currentPanel < componentPages.length) {
      setCurrentPanel(currentPanel + 1);
    } else {
      return currentPanel;
    }
  }
  function decComponent() {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else {
      return currentPanel;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton}>Back</button>
      </div>
      <div className={styles.nextButtonContainer}>
        <button className={styles.nextButton}>Next</button>
      </div>
    </div>
  );
}

export default Panel;
