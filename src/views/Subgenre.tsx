import React from 'react';
import AppContext from '../state/context';
import Row from '../components/Row';
import Column from '../components/Column';
import MoveButton from '../components/MoveButton';
import Navigation from '../components/Navigation';
import Block from '../components/Block';
import { binarySearch } from '../lib/helpers';
import { ISubgenre } from '../interfaces';


function Subgenre() {
  const { changeState, pageStructure, page, activeGenre, genres, activeSubgenre } = React.useContext( AppContext );
  const genreObj = binarySearch(genres, activeGenre);
  const addSubgenreObj = {id: -1, name: "Add new", "isDescriptionRequired": true};
  const subgenres = genreObj ? [...genreObj['subgenres'], addSubgenreObj] : [addSubgenreObj];

  return (
    <div>
     <Row>
        <Column breakSpan="12">
          <Navigation structure={ pageStructure } current={ page } />
        </Column>
      </Row>

      <Row className="genre-list">
        {
          subgenres.map((item: ISubgenre, index: number) => {
            return(
              <Block 
                key={`subgenreKey_${item.id}`} 
                name={item.name} 
                widthSpan={3} 
                id={item.id} 
                funcType="SET_SUBGENRE"
                setFunc={ changeState } 
                clickable={ true }
                active={ activeSubgenre === item.id } 
              />
            )
          })
        }
      </Row>

      <Row>
        <Column breakSpan="12" align="center">
          <p className="instruction">{ activeSubgenre > 0 ? "Click NEXT to fill out the information form." : "Choose subgenre of the book or add new subgenre." }</p>
        </Column>
      </Row>

      <Row>
        <Column breakSpan="7"></Column>
        <Column breakSpan="5" align="right">
          <MoveButton show={ true } text="Back" direction="back"  change={ changeState } />
          <MoveButton show={ activeSubgenre > 0 } text="Next" direction="next" change={ changeState } className="next" />
        </Column>
      </Row>
    </div>
  );
}

export default Subgenre;