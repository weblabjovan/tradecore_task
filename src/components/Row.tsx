import React from 'react';

function Row(props: any) {
  
  return (
    <div className={`grid ${props.className ? props.className : ''}`} >
      {props.children}
    </div>
  );
}

export default Row;