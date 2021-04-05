import React from "react";
import styles from "./index.module.css";

function Services({ options, serviceSetter }) {
  return (
    <>
      <h4 className={styles.title}>Which service do you need support with?</h4>

      {options.map((item, index) => {
        return (
          <div className={styles.box} key={item}>
            <input
              type="radio"
              name="service"
              key={item}
              value={item}
              onChange={(event) => {
                event.persist();
                serviceSetter(event);
                console.log(item);
              }}
            ></input>
            <label>{item}</label>
            <br />
          </div>
        );
      })}
    </>
  );
}
export default Services;
