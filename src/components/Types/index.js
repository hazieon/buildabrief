import React from "react";
import styles from "./index.module.css";

function Types({ options, typeSetter }) {
  return (
    <>
      <h3 className={styles.title}>What type of service is required?</h3>

      {options.map((item, index) => {
        return (
          <div className={styles.box}>
            <input
              type="radio"
              name="type"
              key={item}
              value={item}
              onChange={(event) => {
                event.persist();
                typeSetter(event);
                console.log(item);
              }}
            >
              {/* {item} */}
            </input>
            <label>{item}</label>
            <br />
          </div>
        );
      })}
    </>
  );
}
export default Types;
