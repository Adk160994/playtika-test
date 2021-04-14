import React from 'react';

const History = (props) => {
  const history = props.history.map((h, i) => {
    const button = i > 0 ? <button key={i} className={'button-history'} onClick={() => props.onClick(i)}>Go back to move no. {i}</button> : '';
    return button
  });
  return <div>{history}</div>
}

export default History;