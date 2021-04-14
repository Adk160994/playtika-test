import React, { Component } from 'react';
import './App.css';

import Inputs from './components/Inputs';
import Alert from './components/Alert';
import History from './components/History';
import {
  setWinner,
  setWinnerName,
  resetState,
  updateStateValues,
  setNewHistory, defaultState} from './state-functions';
import Form from "./components/Form";

class App extends Component {

  constructor() {
    super();

    console.log(localStorage.getItem('isGameOn'));

    this.state = defaultState();

    this.winningPatterns = [
      '036',
      '147',
      '258',
      '012',
      '345',
      '678',
      '048',
      '246'
    ];
  }

  render() {
    if (localStorage.getItem('isGameOn') === 'false' || localStorage.getItem('isGameOn') === null )
    {
      return(
          <section className="App">
            <header>{'Start New Game'}</header>
            <Form></Form>
          </section>
      );
    }  else {
      let componentAside;
      console.log(this.state.winner);
      if(this.state.gameover) {
        if(this.state.winner) {
          componentAside = (<button onClick={this.reset.bind(this)} className={this.state.winner || this.state.gameover ? 'reset-button' : 'hide'}>Replay!</button>);
        } else {
          componentAside = (<button onClick={this.reset.bind(this)} className={this.state.winner || this.state.gameover ? 'reset-button' : 'hide'}>Game Over!</button>);
        }
      } else {
        componentAside = (<History history={this.state.history} onClick={(i) => this.goBack(i)}></History>);
      }
      return (
          <section className="App">
            <Alert winner={this.state.winner} winnerName = {this.state.winnerName} currentText={this.state.playerName}></Alert>

            <div>
              <span>
                <button onClick={this.reset.bind(this)} className={'left-button'}>Restart Game</button>
                <button onClick={this.newGame.bind(this)} className={'right-button'}>New Game</button>
              </span>
            </div>

            <Inputs onClick={(e, i) => this.handleInput(e, i)} currentText={this.state.currentText} values={this.state.values}></Inputs>
            <aside>{componentAside}</aside>
           </section>
      );
    }
  }

  newGame() {
    this.reset();
    setTimeout(function() {
      sessionStorage.clear();
      localStorage.setItem('isGameOn', false);
      window.location.reload();
    }.bind(this), 100);

  }

  reset() {
    console.log('default state; ',defaultState())
    console.log('before',this.state.values);
    this.resetClasses();
    this.setState(resetState(defaultState()));

    setTimeout(function() {console.log('after',this.state.values);}.bind(this), 100);
  }

  resetClasses() {
    if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
    document.querySelectorAll('.winner').forEach((winner) => {
      winner.classList.remove('winner');
    });
  }

  getPlayerName(symblol: string) {
    if (symblol === 'X') {
      return sessionStorage.getItem(`player1`)
    } else {
      return  sessionStorage.getItem('player2');
    }
  }

  handleInput(e, i) {
    if (e.target.innerText || this.state.winner)  return;

    const newValues = this.getNewValues(i);
    
    const newText = this.getNewText(i);

    const newPlayer = this.getPlayerName(newText);

    const newHistory = setNewHistory(this.state.history, newValues);
    //console.log(newHistory)

    this.handleClass(e.target);

    this.setState(updateStateValues(this.state, {
      values: newValues,
      currentText: newText,
      history: newHistory,
      playerName: newPlayer
    }));

    this.checkWinner(newValues);
  }

  checkWinner(newValues) {
    let curXs = [];
    let curOs = [];
    let winningPattern = '';
    newValues.forEach((e, i) => {
      if (e === 'X') curXs.push(i);
      else if(e === 'O') curOs.push(i);
    });

    const curXstr = curXs.sort().join('');
    const curOstr = curOs.sort().join('');

    for (const str of this.winningPatterns) {
      if (curXstr.indexOf(str) > -1) {
        this.setState(setWinner('X'));
        this.setState(setWinnerName(sessionStorage.getItem('player1')));
        winningPattern = str;
        break;
      } else if (curOstr.indexOf(str) > -1) {
        this.setState(setWinner('O'));
        this.setState(setWinnerName(sessionStorage.getItem('player2')));
        winningPattern = str;
        break;
      }
    }

    if (winningPattern) {
      const indices = new Set( winningPattern.split('') );
      document.querySelectorAll('.container li').forEach((li, i) => {
        if (indices.has(i.toString())) {
          li.classList.add('winner');
        }
      });
    }

    if (newValues.indexOf('') === -1) {
      this.setState(updateStateValues({gameover: true}))
    }
  }

  getNewValues(index) {
    const newValues = Array.from(this.state.values);
    newValues[index] = this.state.currentText;
    return newValues;
  }

  getNewText(index) { 
    return this.state.currentText === 'X' ? 'O' : 'X';
  }

  handleClass(target) {
    if (target.parentNode.querySelector('.active')) {
      target.parentNode.querySelector('.active').classList.remove('active');
    }
    target.className = 'active'; 
  }

  goBack(i) {
    this.setState(updateStateValues({
      values: this.state.history[i-1],
      history: this.state.history.slice(0, i)
    }));
    this.resetClasses();
  }
}

export default App;
