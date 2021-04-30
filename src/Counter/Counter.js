import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Counter extends Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    minusCounter = () => {
        this.setState({
            counter: this.state.counter - 1
        })
    }

    goToHomePage = () => {
        this.props.history.push({
            pathname: '/'
        })
    }

    render() {
        return (
            <React.Fragment>
                <h2>Counter: {this.state.counter}</h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={this.minusCounter}>-</button>
                <hr />
                <button onClick={this.goToHomePage}>go To Home Page</button>
            </React.Fragment>
        )
    }
}

export default withRouter(Counter)