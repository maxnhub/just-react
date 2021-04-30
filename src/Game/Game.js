import React, {Component} from 'react';
import './Game.scss';
import PropTypes from 'prop-types'

class Game extends Component {
    render() {
        let inputClasses = ['input'];

        if(this.props.name !== '') {
            inputClasses.push('green');
        } else {
            inputClasses.push('red');
        }

        if(this.props.name.length > 4) {
            inputClasses.push('bold');
        }

        console.log(this.props)

        // if(Math.random() > 0.7) {
        //     throw new Error('Random fail!');
        // }
        return (
            <div className={'Game'}>
                <h3>Game: {this.props.name}</h3>
                <p>Genre: {this.props.genre}</p>
                <input className={inputClasses.join(' ')} type="text" onChange={this.props.onChangeName} value={this.props.name}/>
                <button onClick={this.props.onChangeTitle}>ChangeTitle</button>
                <button onClick={this.props.onDelete}>Delete</button>
            </div>
        )
    }
}

Game.propTypes = {
    name: PropTypes.string,
    genre: PropTypes.string,
    onChangeName: PropTypes.func,
    onDelete: PropTypes.func
}

export default Game