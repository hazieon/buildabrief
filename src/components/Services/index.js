import React from "react";
import styles from "./index.module.css";

function Services({ options, serviceSetter }) {
  return (
    <>
      <h3 className={styles.title}>What type of service is required?</h3>

      {options.map((item, index) => {
        return (
          <div className={styles.box}>
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
export default Services;

/* <select
        onChange={(event) => {
          console.log(event.target.value);
          event.persist();
          serviceSetter(event);
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
      </select> */
