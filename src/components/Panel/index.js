import React, { useReducer, useState } from "react";
import styles from "./index.module.css";
import Services from "../Services";
import Types from "../Types";
import Industry from "../Industry";

// best practice, clean code,
// CSS - button positions

//hard coded list of available services within Columba
const serviceOptions = [
  "Web Design & Build",
  "Pay Per Click (PPC)",
  "Search Engine Optimisation (SEO)",
  "Paid Social",
  "Digital Marketing",
];

const types = [
  "Brochure",
  "Business (non-eCommerce)",
  "eCommerce",
  "Media / Magazine / Blog",
  "Portfolio",
  "Driving traffic to website",
  "Increasing brand awareness",
  "Increasing likes on social media",
  "Other (Please Specify)",
];

const industryOptions = [
  "Automotive",
  "Aviation & Aerospace",
  "Banking & Finance",
  "Consumer Electronics",
  "e-commerce",
  "Education",
  "Energy & Oil",
  "Food & Beverage",
  "Government & Administration",
  "Hospitality & Events",
  "Hospitals & Healthcare",
  "Legal Services",
  "Logistics & Supply Chain",
  "Management & Consulting",
  "Marketing & Advertising",
  "Media",
  "Music",
  "Non-Profit",
  "Pharmaceuticals & Biotech",
  "Property",
  "Retail",
  "Sports",
  "Technology",
  "Transportation",
  "Travel & Leisure",
  "Other (Please Specify) ",
];

//array which holds the page numbers available to iterate through:
const componentPages = [0, 1, 2, 3];

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

  console.log(state);
  function incComponent() {
    //array with order of pages, move to NEXT index on button click
    if (currentPanel < componentPages.length) {
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
  function serviceTypeSetter(e) {
    dispatch({ type: "setType", serviceType: e.target.value });
  }
  function industrySetter(e) {
    dispatch({ type: "setIndustry", industry: e.target.value });
  }
  //   function budgetSetter(e) {
  //     dispatch({ type: "setBudget", budget: e.target.value });
  //   }

  return (
    <div className={styles.container}>
      <p className={styles.progressPercentage}>{progress + "%"}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: progress + "%" }}
        ></div>
      </div>
      {currentPanel === 0 && (
        <>
          <section className={styles.servicesSection}>
            <Services options={serviceOptions} serviceSetter={serviceSetter} />
          </section>
          <h4>So you're looking for:</h4>
          <h3 className={styles.selectionText}>
            {state.service ? state.service : ""}
          </h3>
        </>
      )}

      {currentPanel === 1 && (
        <section className={styles.servicesSection}>
          <Types options={types} typeSetter={serviceTypeSetter} />
          <h4>Right, you need optimisation with/of:</h4>
          <h3 className={styles.selectionText}>
            {state.type ? state.type : ""}
          </h3>
        </section>
      )}

      {currentPanel === 2 && (
        <section className={styles.industrySection}>
          <Industry options={industryOptions} industrySetter={industrySetter} />
          <h4>What industry does your company work in?</h4>
          <h3 className={styles.selectionText}>
            {state.industry ? state.industry : ""}
          </h3>
        </section>
      )}

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
          className={styles.nextButton}
          onClick={() => {
            advanceProgressBar();
            incComponent();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Panel;
