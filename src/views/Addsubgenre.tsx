import React from 'react';
import AppContext from '../state/context';
import Row from '../components/Row';
import Column from '../components/Column';
import MoveButton from '../components/MoveButton';
import Navigation from '../components/Navigation';


function Addsubgenre() {
  const { changeState, pageStructure, page, newSubgenre, newSubgenreDesReq } = React.useContext( AppContext );

  return (
    <div>
      <Row>
        <Column breakSpan="12">
          <Navigation structure={ pageStructure } current={ page } />
        </Column>
      </Row>

      <Row className="addsubgenre">
        <Column breakSpan="12">
          <input type="text" name="newSubgenreName" className="simple-textinput" value={newSubgenre} onChange={ (event) => changeState('CHANGE_NEW_SUBGENRE', {value: event.target.value}) }/>
        </Column>
        <Column breakSpan="12">
          <input type="checkbox" name="isDescriptionRequired" checked={ newSubgenreDesReq } onChange={ () => changeState('CHANGE_NEW_SUBGENRE_DESREQ', {}) } />
          <label htmlFor="isDescriptionRequired">Description is required for this subgenre</label>
        </Column>
      </Row>

      <Row>
        <Column breakSpan="12" align="center">
          <p className="instruction">{ newSubgenre.length ? "Click NEXT to fill out the information form." : "Inserte name of the new subgenre and mark if you need a description for it." }</p>
        </Column>
      </Row>

      <Row>
        <Column breakSpan="7"></Column>
        <Column breakSpan="5" align="right">
          <MoveButton show={ true } text="Back" direction="back" change={ changeState } />
          <MoveButton show={ newSubgenre.length > 0 } text="Next" direction="next" changeType="ADD_NEW_SUBGENRE" change={ changeState } className="next" />
        </Column>
      </Row>
    </div>
  );
}

export default Addsubgenre;