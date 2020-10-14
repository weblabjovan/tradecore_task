import React from 'react';

function Navigation(props: {structure: Array<string>, current: string}) {
  const { structure, current } = props;
   
  return (
    <div className="navigation-wrapper">
      <div className="item-wrapper">
        <div className={`item ${current === "Genre" ? "active" : ''}`}> 1 </div>
        <h5>Genre</h5>
      </div>
      

      <div className="line-wrapper">
        <div className="line"></div>
      </div>

      <div className="item-wrapper">
        <div className={`item ${current === "Subgenre" ? "active" : ''}`}> 2 </div>
        <h5>Subgenre</h5>
      </div>

      <div className="line-wrapper">
        <div className="line"></div>
      </div>

      <div className="item-wrapper">
        <div className={`item ${structure.length < 5 ? current === "Infoform" ? "active" : '' : current === "Addsubgenre" ? "active" : ''}`}>{structure.length < 5 ? current === "Infoform" ? '3' : '...'  : '3'}</div>
        <h5>{structure.length < 5 ? current === "Infoform" ? 'Information' : ''  : 'Add Subgenre'}</h5>
      </div>

      {
        structure.length > 4
        ?
        (
          <React.Fragment>
            <div className="line-wrapper">
              <div className="line"></div>
            </div>

            <div className="item-wrapper">
              <div className={`item ${current === "Infoform" ? "active" : ''}`}> 4 </div>
              <h5>Information</h5>
            </div>
          </React.Fragment>
        )
        :
        null
      }
    </div>
  );
}

export default Navigation;