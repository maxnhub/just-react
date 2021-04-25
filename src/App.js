import React, { Component } from 'react';
import classes from './App.module.scss';
import Game from './Game/Game';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Counter from './Counter/Counter';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            games: [
                {name: 'DaysGone', genre: 'Post-apocalypse survival'},
                {name: 'Control', genre: 'Action like Twen Peeks and X-files'},
                {name: 'Ghost of Tsushima', genre: 'Japanese hero history'}
            ],
            pageTitle: 'React components',
            clicksCounter: 0,
            showList: false
        }
    }



    handleClick = () => {
        let clicksCounter = this.state.clicksCounter

        let newClicksCounter = clicksCounter + 1

        this.setState({
            clicksCounter: newClicksCounter
        })
    }

    handleTitle = (newPageTitle) => {
        this.setState({
            pageTitle: newPageTitle
        })
    }

    toggleListHandler = () => {
        this.setState({
            showList: !this.state.showList
        })
    }

    onChangeName(name, index) {
        const game = this.state.games[index]
        game.name = name
        const games = [...this.state.games]
        games[index] = game
        this.setState({games})
    }

    deleteHandler = (index) => {
        const games = [...this.state.games]
        games.splice(index, 1)
        this.setState({games})
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {

        const divStyle = {
            'color': 'red'
        }

        const games = this.state.games

        return (
            <div className={classes['App']}>
                <h1 style={divStyle}>{this.state.pageTitle}</h1>
                <button onClick={this.handleTitle.bind(this, 'Changed!')}>change title</button>
                <button onClick={this.toggleListHandler}>toggle list</button>

                {this.state.showList ?
                    this.state.games.map((game, index)=> {
                    return (
                        <ErrorBoundary key={index}>
                            <Game
                                name={game.name}
                                genre={game.genre}
                                onChangeTitle={() => {this.handleTitle(game.name)}}
                                onChangeName={event =>{this.onChangeName(event.target.value, index)}}
                                onDelete={this.deleteHandler.bind(this, index)}
                            />
                        </ErrorBoundary>
                    )
                }) :
                    null
                }

                <button onClick={this.handleClick}>count clicks</button>
                <p>Clicks counter: {this.state.clicksCounter}</p>
                <Counter />
            </div>
        );
    }
}

export default App;
