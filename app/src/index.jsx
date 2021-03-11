import React from "react";
import ReactDOM from "react-dom";
import Signup from "./components/Signup";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import './App.css';

function App() {
    return (
        <React.StrictMode>
            <div className="App">
                <Signup/>
            </div>
        </React.StrictMode>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);