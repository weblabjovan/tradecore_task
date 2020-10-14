import React from 'react';
import {IMoveButtonProps} from '../interfaces';

function MoveButton(props: IMoveButtonProps) {
  const { change, show, text, direction, changeType, className } = props;
  const type = changeType ? changeType : 'SET_PAGE';

  return (
    <div className={`button-wrapper ${className}`}>
      <button disabled={!show} onClick={() => change(type, { direction })}><span>{direction !=="next" ? '\u2039': null}</span>{text}</button>
    </div>
  );
}

export default MoveButton;