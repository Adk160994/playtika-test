import React from 'react';

const Alert = (props) => {
  let alert;
  if(!!props.currentText) {
    alert = props.winner ? "The Winner Is: " + props.winnerName.toUpperCase() : "Current player " + props.currentText.toUpperCase() + ".";
  } else {
    alert = 'Let the game begin !';
  }
  return (
    <header>{alert}</header>
  );
}

export default Alert;