import React from "react";
import styles from "./index.module.css";

function Industry({ options, industrySetter }) {
  return (
    <>
      <h3 className={styles.title}>What type of service is required?</h3>

      <select
        onChange={(event) => {
          event.persist();
          industrySetter(event);
          console.log(event.target.value);
        }}
      >
        <option value="" selected disabled>
          Select one that applies:
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
}
export default Industry;
