import React from "react";
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import gris from '../gris.png'
import zxcvbn from 'zxcvbn';

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            input: {},

            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        let testResult = zxcvbn(this.state.input.password);
        let score = testResult.score;
        let progress = testResult.score * 90;
        this.setState({
            input,
            testResult,
            score,
            progress
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            console.log(this.state);
            let input = {};
            input["username"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirmPassword"] = "";
            this.setState({input: input});
            alert('Form is submited');
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Enter username";
        }
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Enter valid email address";
        }
        if (typeof input["email"] !== "undefined") {
            const pattern = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Not a  valid email address";
            }
        }
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Enter password";
        }
        if (!input["confirmPassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Enter confirm password";
        }
        if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
            if (input["password"] !== input["confirmPassword"]) {
                isValid = false;
                errors["password"] = "Passwords don't match";
            }
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    createPassLabel = () => {
        switch (this.state.score) {
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fear';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    }

    funcProgressColor = () => {
        switch (this.state.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    }

    render() {
        return (
            <div className="outer">
                <div className="header">
                    <div className="logo">
                        <img src={gris} alt="-"/>
                    </div>
                </div>
                <div className="inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Create new account</h3>
                        <br/>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text"
                                   name="username"
                                   value={this.state.input.username}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   id="username"
                            />
                            <div className="text-danger">{this.state.errors.username}</div>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text"
                                   name="email"
                                   value={this.state.input.email}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   id="email"
                            />
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password"
                                   name="password"
                                   value={this.state.input.password}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   id="password"
                            />
                            <div className="progress" style={{height: '7px'}}>
                                <div className="progress-bar" style={{
                                    width: this.state.progress,
                                    background: this.funcProgressColor(),
                                    height: '7px'
                                }}/>
                            </div>
                            <p className="passwordStrength"
                               style={{color: this.funcProgressColor()}}>{this.createPassLabel()}</p>
                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm password:</label>
                            <input type="password"
                                   name="confirmPassword"
                                   value={this.state.input.confirmPassword}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   id="confirmPassword"
                            />
                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                        </div>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Help
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body> Password must be at least 8 characters long with at least 1
                                        upper case letter
                                        <br/>
                                        <br/>
                                        Email address will be used to manage your account</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <button type="submit" className="btn">REGISTER</button>
                        <p className="forgot-password text-right">
                            Already registered? <a href="http://dev.gris.cz" className="grisLink">Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;