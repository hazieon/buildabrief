import React, { useReducer, useState } from "react";
import styles from "./index.module.css";
import Services from "../Services";

//hard coded list of available services within Columba
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

//reducer function holding the cases for changing state in a controlled way
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
  const [progress, setProgress] = useState(25);

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

  function advanceProgressBar() {
    // if not complete, ADD 1/4 progress, called on NEXT button press
    if (progress < 100) {
      setProgress(progress + 25);
    }
  }

  function retractProgressBar() {
    // if not empty, SUBTRACT 1/4 progress, called on BACK button press
    if (progress > 25) {
      setProgress(progress - 25);
    }
  }

  function serviceSetter(e) {
    dispatch({ type: "setService", service: e.target.value });
  }
  //   function serviceTypeSetter(e) {
  //     dispatch({ type: "setService", serviceType: e.target.value });
  //   }
  //   function IndustrySetter(e) {
  //     dispatch({ type: "setIndustry", industry: e.target.value });
  //   }
  //   function budgetSetter(e) {
  //     dispatch({ type: "setBudget", budget: e.target.value });
  //   }

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: progress + "%" }}
        ></div>
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
        <button
          className={styles.backButton}
          onClick={() => {
            retractProgressBar();
          }}
        >
          Back
        </button>
      </div>
      <div className={styles.nextButtonContainer}>
        <button
          className={styles.nextButton}
          onClick={() => {
            advanceProgressBar();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Panel;
