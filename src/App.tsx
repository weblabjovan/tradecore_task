import React from 'react';
import './style/index.scss';
import Wizard from './views/Wizard';
import Provider from './state/Provider';

function App() {

  return (
    <Provider>
      <Wizard />
    </Provider>
    
  );
}

export default App;
