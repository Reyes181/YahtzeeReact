import React, { Component } from 'react';
import RuleRow from './RuleRow';
import '../css/ScoreTable.css';
import _ from 'lodash';
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from '../utils/Rules';


class ScoreTable extends Component {
  
  getTotalScore(){
    const {scores} = this.props;
    let totalScore = 0;
    for(let key in scores){
      if(scores[key]) totalScore += scores[key]
    }
    return totalScore;
  }

  setScore = () => {
    const record = {score: this.getTotalScore(), name: document.getElementById("name").value}
    this.props.keepCount(record)
    this.props.disableButton(true)
  };

  getRecords = () => {
    // const record = Array.from(this.props.record);
    const record = _.sortBy(Array.from(this.props.record), 'score').reverse()
    console.log(record)
    if(record != null){
      return(
        record.map((r, i) => (
          <tr key={i} className="ScoreTable-tableRow">
            <td className={i === 1  ? 'topScore' : 'restScore'}>
              {r.name}
            </td>
            <td className={i === 1 ? 'ScoreTable-tdScore' : ''}>
              {r.score} 
            </td>
          </tr>
        ))
      )
    } else {
      return(
        <tr>
          <td>No Score</td>
        </tr>
      )
    }
    
  }

  render() {
    const { scores, doScore, over, scoreDone, resetGame} = this.props;
    const submitHandled = scoreDone === true;
    
    return (
      <div className="ScoreTable">
        {
          over ?
            <div className="ScoreTable-final">
              <h2>Final Score <span id="score">{this.getTotalScore()}</span></h2>
              <input type="text" id="name"/>
              <div className="ScoreTable-buttons">
                <button onClick={this.setScore} disabled={submitHandled}>Set Score</button>
                <button onClick={resetGame}>Play Again</button>
              </div>
              <div className="ScoreTable-table">
                <table>
                  <tbody>
                    <tr className="ScoreTable-tableHeader">
                      <th>Name</th>
                      <th>Score</th>
                    </tr>
                    {this.getRecords()}
                  </tbody>
                </table>
              </div>
            </div>
          :
            <div>
              <section className="ScoreTable-section">
                <h2>Upper</h2>
                <table cellSpacing="0">
                  <tbody>
                    <RuleRow name="Ones" score={scores.ones} description={ones.description} doScore={evt => doScore("ones", ones.evalRoll)} />
                    <RuleRow name="Twos" score={scores.twos} description={twos.description} doScore={evt => doScore("twos", twos.evalRoll)} />
                    <RuleRow name="Threes" score={scores.threes} description={threes.description} doScore={evt => doScore("threes", threes.evalRoll)} />
                    <RuleRow name="Fours" score={scores.fours} description={fours.description} doScore={evt => doScore("fours", fours.evalRoll)} />
                    <RuleRow name="Fives" score={scores.fives} description={fives.description} doScore={evt => doScore("fives", fives.evalRoll)} />
                    <RuleRow name="Sixes" score={scores.sixes} description={sixes.description} doScore={evt => doScore("sixes", sixes.evalRoll)} />
                  </tbody>
                </table>
              </section>
              <section className="ScoreTable-section ScoreTable-section-lower">
                <h2>Lower</h2>
                <table cellSpacing="0">
                  <tbody>
                    <RuleRow name="Three of Kind" score={scores.threeOfKind} description={threeOfKind.description} doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} />
                    <RuleRow name="Four of Kind" score={scores.fourOfKind} description={fourOfKind.description} doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} />
                    <RuleRow name="Full House" score={scores.fullHouse} description={fullHouse.description} doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} />
                    <RuleRow name="Small Straight" score={scores.smallStraight} description={smallStraight.description} doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} />
                    <RuleRow name="Large Straight" score={scores.largeStraight} description={largeStraight.description} doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} />
                    <RuleRow name="Yahtzee" score={scores.yahtzee} description={yahtzee.description} doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} />
                    <RuleRow name="Chance" score={scores.chance} description={chance.description} doScore={evt => doScore("chance", chance.evalRoll)} />
                  </tbody>
                </table>
              </section>
              <h2>Total Score {this.getTotalScore()}</h2>
            </div>
        }
        
      </div>
    )
  }
}

export default ScoreTable;