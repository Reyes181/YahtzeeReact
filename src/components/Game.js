import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import MobileRules from "./MobleRules";
import "../css/Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 4;


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      over: false,
      pointCount: 0,
      scoreDone: false,
      record: JSON.parse(window.localStorage.getItem("record") || "[{}]"),
      open: false
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.keepCount = this.keepCount.bind(this);
  }

  componentDidMount(){
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({
      isRolling: true
    }, () => {setTimeout(this.roll, 1000)})
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      isRolling: false
    }));
  }

  toggleLocked = (idx) => {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft > 0 && !this.state.rolling){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }), () => {this.checkGame(this.state.scores)});
    this.animateRoll();
  }

  displayRollInfo = () => {
    const messages = [
      '0 Rolls Left',
      '1 Roll Left',
      '2 Rolls Left',
      '3 Rolls Left',
      'Starting Round'
    ]
    return messages[this.state.rollsLeft]
  }
  
  checkGame = (gameObject) => {
    if (gameObject.entries === !undefined) {
      console.log('No undefined')
    }
    else {
      this.setState({
        pointCount: this.state.pointCount + 1
      })
      console.log(this.state.pointCount)
    }
    if(this.state.pointCount === 12){
      this.setState({
        over: true
      })
    }
  }

  keepCount(newCount){
    this.setState(previousState => ({
      record: [...previousState.record, newCount]
    }), () => window.localStorage.setItem("record", JSON.stringify(this.state.record)));
  }

  disableButton = (game) => {
    let score = game
    this.setState({
      scoreDone: score
    })
  }

  resetGame = () => {
    this.setState({
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      pointCount: 0,
      scoreDone: false,
      over: !this.state.over
    })
    this.animateRoll()
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <p className="Game-name">Project done by E.R.</p>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              rolls={this.state.rollsLeft}
              rolling={this.state.isRolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x) || this.state.rollsLeft === 0}
                onClick={this.roll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <button className="Game-ruleButton" onClick={this.handleOpen}>
          Game Rules
        </button>
        <MobileRules open={this.state.open} onClose={this.handleClose}/>
        <ScoreTable 
          keepCount={this.keepCount} 
          doScore={this.doScore} 
          scores={this.state.scores} 
          over={this.state.over} 
          record={this.state.record}
          scoreDone={this.state.scoreDone}
          disableButton={this.disableButton}
          resetGame={this.resetGame}
        />
      </div>
    );
  }
}

export default Game;
