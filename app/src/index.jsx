import React from "react";
import ReactDOM from "react-dom";
import Signup from "./components/Signup";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './App.css';

function App() {
    return (
        <div className="App">
            <Signup/>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);