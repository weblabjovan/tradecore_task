import React from 'react';
import AppContext from '../state/context';
import Row from '../components/Row';
import Column from '../components/Column';
import MoveButton from '../components/MoveButton';
import Navigation from '../components/Navigation';
import Block from '../components/Block';
import { IGenre } from '../interfaces';

function Genre() {
  const { changeState, pageStructure, page, genres, activeGenre } = React.useContext( AppContext );
  
  return (
    <div>
      <Row>
        <Column breakSpan="12">
          <Navigation structure={ pageStructure } current={ page } />
        </Column>
      </Row>

      <Row className="genre-list">
        {
          genres.map((item: IGenre, index: number) => {
            return(
              <Block 
                key={`genreKey_${item.id}`} 
                name={item.name} 
                widthSpan={3} 
                id={item.id} 
                funcType="SET_GENRE"
                setFunc={ changeState } 
                clickable={ true }
                active={ activeGenre === item.id } 
              />
            )
          })
        }
      </Row>

      <Row>
        <Column breakSpan="12" align="center">
          <p className="instruction">{ activeGenre > 0 ? "Click NEXT to choose subgenre." : "Choose genre of the book." }</p>
        </Column>
      </Row>

      <Row>
        <Column breakSpan="7"></Column>
        <Column breakSpan="5" align="right">
          <MoveButton show={ false } text="Back" direction="back" change={ changeState } />
          <MoveButton show={ activeGenre > 0 } text="Next" direction="next" change={ changeState } className="next" />
        </Column>
      </Row>
    </div>
  );
}

export default Genre;