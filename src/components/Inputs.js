import React from 'react';

const Inputs = (props) => {
  let inputs = [];
  for (let i=0; i < 9; i++) {
    inputs.push(<li key={i} name='input' onClick={(e)=>props.onClick(e, i)} >{props.values[i]}</li>)
  }
  return (
    <article>
      <ul className="container">
        {inputs}
      </ul>
    </article>
  );
}

export default Inputs;