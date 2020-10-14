import React from 'react';

function Loader(props: {show: boolean, text: string }) {
  const { show, text } = props;

  return (
    <div className="loader" style={show ? {"visibility":"visible"} : {"visibility":"hidden"} }>
      <h3>{text}</h3>
    </div>
  );
}

export default Loader;