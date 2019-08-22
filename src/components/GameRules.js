import React, { Component } from 'react';
import '../css/Gamerules.css';

class GameRules extends Component {
  render() {
    return <div className="Gamerules">
      <h1>Game Rules</h1>
      <div className="rules">
        The object of Yahtzee is to obtain the highest score from throwing 5 dice. 
        The game consists of 13 rounds. In each round, you roll the dice and then score the roll in one of 13 categories. 
        You must score once in each category.
        <span>The Yahtzee Rules Page - http://www.yahtzee.org.uk</span>
      </div>
      <div className="list">
          <ul>
              <li>
                  <p className="title">Ones</p> 
                  <p className="desc">1 point for every Die with a 1</p>
              </li>
              <li>
                  <p className="title">Twos</p>
                  <p className="desc">2 point for every Die with a 2</p> 
              </li>
              <li>
                  <p className="title">Threes</p>
                  <p className="desc">3 point for every Die with a 3</p>
              </li>
              <li>
                  <p className="title">Fours</p>
                  <p className="desc">4 point for every Die with a 4</p>
              </li>
              <li>
                  <p className="title">Fives</p>
                  <p className="desc">5 point for every Die with a 5</p>
              </li>
              <li>
                  <p className="title">Six</p>
                  <p className="desc">6 point for every Die with a 6</p>
              </li>
              <li>
                  <p className="title">Three of Kind</p>
                  <p className="desc">Sum of all dice if 3 are the same</p>
              </li>
              <li>
                  <p className="title">Four of Kind</p>
                  <p className="desc">Sum of all dice if 4 are the same</p>
              </li>
              <li>
                  <p className="title">Full House</p>
                  <p className="desc">3 dice are the same and the remaining 2 are the same too</p>
              </li>
              <li>
                  <p className="title">Small Straight</p>
                  <p className="desc">
                      Must be 4 different dice
                      <span>example: 2345, 1234, or 3456</span>
                  </p> 
              </li>
              <li>
                  <p className="title">Large Straight</p>
                  <p className="desc">
                    Must be 5 different dice and only one can be a 1 or a 6
                    <span>example: 1-5 or 2-6</span>
                  </p>
              </li>
              <li>
                  <p className="title">Yahtzee</p>
                  <p className="desc">
                    All 6 dice are the same
                  </p>
              </li>
              <li>
                  <p className="title">Chance</p>
                  <p className="desc">Sum of all dice</p>
              </li>
          </ul>
      </div>
    </div>
  }
}

export default GameRules;