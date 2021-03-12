import React from 'react';
import zxcvbn from 'zxcvbn';

class PasswordStrength extends React.Component {

    constructor() {
        super();
        const testResult = zxcvbn(this.props.password);
        const num = testResult.score * 100 / 4;
    }

    createPassLabel = () => {
        switch (testResult.score) {
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
        switch (testResult.score) {
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
    /*todo objasnit */
    changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px'
    })

    render() {
        return (
            <>
                <div className="progress" style={{height: '7px'}}>
                    <div className="progress-bar" style={this.changePasswordColor}/>
                </div>
                <p style={{color: this.funcProgressColor}}>{this.createPassLabel}</p>
            </>
        )
    }
}

export default PasswordStrength