import React from 'react';

function Column(props: any) {
  const {breakSpan, align } = props;
  const span = breakSpan ? breakSpan : '12';
  const aligner = align ? align : 'left';
  
  return (
    <div className={`grid__item grid__item--xs-span-${span}`} style={{"textAlign": aligner }}>
      {props.children}
    </div>
  );
}

export default Column;