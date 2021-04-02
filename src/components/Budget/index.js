import React from "react";
import styles from "./index.module.css";
import Slider from "@material-ui/core/Slider";

function Budget({ budgetSetter }) {
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    budgetSetter(newValue[0], newValue[1]);
  };
  return (
    <>
      <h3 className={styles.title}>What is your budget for this project?</h3>

      {/* <Typography id="range-slider" gutterBottom>
  Temperature range
</Typography> */}
      <Slider
        initalvalue={10000}
        min={10000}
        max={100000}
        step={10000}
        style={{ width: "50vw", color: "var(--columba)" }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />

      <div className={styles.check}>
        <p>Not sure? </p>
        <input type="checkbox" />
      </div>
    </>
  );
}
export default Budget;

/* <div className={styles.rangeWrapper}>
          <input
            className={styles.range}
            type="range"
            min="1"
            max="100"
            value="20"
            onChange={(event) => {
              event.persist();
              budgetSetter(event);
              console.log(event.target.value);
            }}
          />
        </div> */
