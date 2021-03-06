import React from "react";
import styles from "./index.module.css";

function Types({ options, typeSetter }) {
  return (
    <>
      <h4 className={styles.title}>What type of service is required?</h4>

      {options.map((item, index) => {
        return (
          <div className={styles.box} key={item}>
            <label>
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
              ></input>
              {item}
            </label>
            <br />
          </div>
        );
      })}
    </>
  );
}
export default Types;
