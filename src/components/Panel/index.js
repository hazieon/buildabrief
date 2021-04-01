import React, { useReducer, useState } from "react";
import styles from "./index.module.css";
import Services from "../Services";

const serviceOptions = [
  "Web Design & Build",
  "Pay Per Click (PPC)",
  "Search Engine Optimisation (SEO)",
  "Paid Social",
  "Digital Marketing",
];
//array which holds the page numbers available to iterate through:
const componentPages = [0, 1, 2];

const initialState = {
  service: "",
  type: "",
  industry: "",
  budget: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setService":
      return {
        ...state,
        service: action.service,
      };
    case "setType":
      return {
        ...state,
        type: action.serviceType,
      };
    case "setIndustry":
      return {
        ...state,
        type: action.industry,
      };
    case "setBudget":
      return {
        ...state,
        type: action.budget,
      };

    default:
      throw new Error();
  }
}

function Panel() {
  // state to set and hold value of the current page
  const [currentPanel, setCurrentPanel] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

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

  function serviceSetter(e) {
    dispatch({ type: "setService", service: e.target.value });
  }

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
      {currentPanel === 0 && (
        <section className={styles.servicesSection}>
          <Services options={serviceOptions} serviceSetter={serviceSetter} />
        </section>
      )}
      <h4>So you're looking for:</h4>
      <h3 className={styles.selectionText}>
        {state.service ? state.service : ""}
      </h3>
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
