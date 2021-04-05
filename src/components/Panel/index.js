import React, { useReducer, useState } from "react";
import styles from "./index.module.css";
import Services from "../Services";
import Types from "../Types";
import Industry from "../Industry";
import Budget from "../Budget";
import { serviceOptions } from "../../serviceOptions";
import { types } from "../../serviceTypes";
import { industryOptions } from "../../industryOptions";

//QUESTIONS
// best practice, clean code,
// CSS - button positions
// slider, text centred and spaced nicely
// customise radio buttons, drop down
// consider UX/UX improvements

//array which holds the page numbers available to iterate through for this section:
const componentPages = [0, 1, 2, 3, 4];

//object which preserves the initial state for the section
const initialState = {
  service: "",
  type: "",
  industry: "[Please select from above list.]",
  budget: 0,
};

//reducer function holding the cases for changing state in a controlled way
//a set case for assigning value to each key in the state object
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
        industry: action.industry,
      };
    case "setBudget":
      return {
        ...state,
        budget: action.budget,
      };

    default:
      throw new Error();
  }
}

function Panel() {
  // state to set and hold value of the current page:
  const [currentPanel, setCurrentPanel] = useState(0);
  // state to set and hold the progress bar value:
  const [progress, setProgress] = useState(0);
  //the main state of the section - holds the users responses and dispatch is called to update state
  //useReducer hook used as it is controlled and useful for complex logic:
  const [state, dispatch] = useReducer(reducer, initialState);

  //functions to move to the NEXT and PREVIOUS pages, using the currentPanel state:
  function incComponent() {
    //array with order of pages, move to NEXT index on button click
    if (currentPanel < componentPages.length - 1) {
      setCurrentPanel(currentPanel + 1);
    } else {
      return currentPanel;
    }
  }
  function decComponent() {
    // move to PREVIOUS pages index on button click
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else {
      return currentPanel;
    }
  }

  // functions to ADD and SUBTRACT progress based on user's progression through pages
  function advanceProgressBar() {
    // if not complete, ADD 1/4 progress, called on NEXT button press
    if (progress < 100) {
      setProgress(progress + 25);
    }
  }

  function retractProgressBar() {
    // if not empty, SUBTRACT 1/4 progress, called on BACK button press
    if (progress > 0) {
      setProgress(progress - 25);
    }
  }

  // functions to set each field, passed down to respective components
  function serviceSetter(e) {
    dispatch({ type: "setService", service: e.target.value });
  }
  function serviceTypeSetter(e) {
    dispatch({ type: "setType", serviceType: e.target.value });
  }
  function industrySetter(e) {
    dispatch({ type: "setIndustry", industry: e.target.value });
  }
  function budgetSetter(valueMin, valueMax) {
    dispatch({ type: "setBudget", budget: `${valueMin} － ${valueMax}` });
  }

  return (
    <div className={styles.container}>
      <p className={styles.progressPercentage}>{progress + "%"}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: progress + "%" }}
        ></div>
      </div>

      {/*render each page based on page-tracking state currentPanel*/}
      {currentPanel === 0 && (
        <>
          <section className={styles.servicesSection}>
            <Services options={serviceOptions} serviceSetter={serviceSetter} />
          </section>
          <div className={styles.selectionBox}>
            <h4 className={styles.selectionLabel}>So you're looking for:</h4>
            <h3 className={styles.selectionText}>
              {state.service ? state.service : ""}
            </h3>
          </div>
        </>
      )}

      {currentPanel === 1 && (
        <section className={styles.servicesSection}>
          <Types options={types} typeSetter={serviceTypeSetter} />
          <div className={styles.selectionBox}>
            <h4 className={styles.selectionLabel}>
              Right, you need optimisation with/of:
            </h4>
            <h3 className={styles.selectionText}>
              {state.type ? state.type : ""}
            </h3>
          </div>
        </section>
      )}

      {currentPanel === 2 && (
        <section className={styles.industrySection}>
          <Industry options={industryOptions} industrySetter={industrySetter} />
          <div className={styles.selectionBox}>
            <h4 className={styles.selectionLabel}>You specialise in:</h4>
            <h3 className={styles.selectionText}>
              {state.industry ? state.industry : ""}
            </h3>
          </div>
        </section>
      )}

      {currentPanel === 3 && (
        <section className={styles.budgetSection}>
          <Budget budgetSetter={budgetSetter} />
          <div className={styles.selectionBox}>
            <h4 className={styles.selectionLabel}>Your budget estimate:</h4>
            <h3 className={styles.selectionText}>
              {state.budget ? "£" + state.budget : ""}
            </h3>
          </div>
        </section>
      )}

      {/*final page after user submits their responses. 
          This would also be its own component in a real application*/}
      {currentPanel === 4 && (
        <section className={styles.budgetSection}>
          <h3>'About You' complete!</h3>
          <h5>Confirm your choices & save.</h5>
          <div className={styles.BriefBox}>
            <label htmlFor="selectionText">Service: ✎</label>
            <p className={styles.selectionText}>{state.service}</p>
            <label htmlFor="selectionText">Service Type: ✎</label>
            <p className={styles.selectionText}>{state.type}</p>
            <label htmlFor="selectionText">Industry: ✎</label>
            <p className={styles.selectionText}>{state.industry}</p>
            <label htmlFor="selectionText">Budget: ✎</label>
            <p className={styles.selectionText}>{state.budget} </p>
          </div>
          <div className={styles.buttonBox}>
            <button
              className={styles.downloadButton}
              onClick={() => {
                alert("Downloading your brief PDF now.");
              }}
            >
              Download PDF ⇩
            </button>
            <button className={styles.downloadButton}>Next Section ➡</button>
          </div>
        </section>
      )}

      <button
        className={styles.helpButton}
        onClick={() => {
          alert("Contact Columba team for assistance ✉ ☎");
        }}
      >
        ?
      </button>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.backButton}
          onClick={() => {
            retractProgressBar();
            decComponent();
          }}
        >
          Back
        </button>
      </div>
      <div className={styles.nextButtonContainer}>
        <button
          hidden={currentPanel === 4 ? true : ""}
          className={styles.nextButton}
          onClick={() => {
            advanceProgressBar();
            incComponent();
          }}
        >
          {currentPanel < 3 ? "Next" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Panel;
