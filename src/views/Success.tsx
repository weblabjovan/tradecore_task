import React from 'react';
import AppContext from '../state/context';
import Row from '../components/Row';
import Column from '../components/Column';

function Success() {
  const { changeState } = React.useContext( AppContext );

  return (
    <div className="success-view">
      <Row>
        <Column breakSpan="4"></Column>
        <Column breakSpan="4">
          <div className="circle">
            <h4>{'\u2713'}</h4>
          </div>
          <p>Book added successfully</p>
          <button onClick={() => changeState("RESET_APP", {})}>Add another book</button>
        </Column>
        <Column breakSpan="4"></Column>
      </Row>
    </div>
  );
}

export default Success;