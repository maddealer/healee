import "./App.css";
import Home from "./components/Home";
import logo from "./img/healeeLogo.png";

function App() {
  return (
    <div className="App">
      <div className="head">
        <img src={logo} alt="Logo" />
        <h1> Healee Task</h1>
      </div>
      <h3>Solution by Hristomir Hristov</h3>
      <Home />
    </div>
  );
}

export default App;
