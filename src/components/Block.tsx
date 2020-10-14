import React from 'react';
import Column from './Column';
import { IBlockProps } from '../interfaces';

function Block(props: IBlockProps) {
  const { widthSpan, name, id, active, clickable, funcType, setFunc } = props;

  return (
    <Column breakSpan={ widthSpan }>
      <div className={`simple-block ${active ? 'active' : ''}`} style={ clickable ? {"cursor":"pointer"} : {"cursor":"inherit"} } onClick={() => setFunc(funcType, {id})}>
        <p>{name}</p>
      </div>
    </Column>
  );
}

export default Block;