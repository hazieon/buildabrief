import "./App.css";
import Panel from "./components/Panel";
import logo from "./logo.png";

function App() {
  return (
    <div>
      <nav>
        <img src={logo} alt="columba logo" height="23px" />
      </nav>
      <h2> Build a Brief</h2>
      <Panel />
    </div>
  );
}

export default App;
