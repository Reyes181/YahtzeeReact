import React, { Component } from "react";
import "../css/Die.css";

class Die extends Component {
  static defaultProps = {
    nubmberWords: ['one', 'two', 'three', 'four', 'five', 'six'],
    val: Math.floor((Math.random() * 6) + 1)
  }

  handleToggle = (evt) => {
    this.props.handleClick(this.props.idx)
  }

  render() {
    const {nubmberWords, locked, val, rolling} = this.props;
    let classes = `Die fas fa-dice-${nubmberWords[val - 1]} fa-5x `
    if(locked) classes += 'Die-locked ';
    if(rolling) classes += 'Die-rolling'
    return (
      <i
        className={classes}
        onClick={this.handleToggle}
        disabled={this.props.rolls <= 0}
      >
      </i>
    );
  }
}

export default Die;
