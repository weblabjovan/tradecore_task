import React from 'react';
import AppContext from '../state/context';
import Genre from '../views/Genre';
import Subgenre from '../views/Subgenre';
import Addsubgenre from '../views/Addsubgenre';
import Infoform from '../views/Infoform';
import Success from '../views/Success';

function Wizard() {
  const { page } = React.useContext( AppContext );

  return (
    <div className="wizard">
      {
        page
        ?
        <h1>Add Book - New book</h1>
        :
        null
      }
      
      {
        page === 'Genre'
        ?
        <Genre/>
        :
        page === 'Subgenre'
        ?
        <Subgenre/>
        :
        page === 'Addsubgenre'
        ?
        <Addsubgenre/>
        :
        page === 'Infoform'
        ?
        <Infoform/>
        :
        page === 'Success'
        ?
        <Success/>
        :
        null
      }
      
    </div>
  );
}

export default Wizard;
