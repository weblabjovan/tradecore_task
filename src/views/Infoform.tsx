import React from 'react';
import AppContext from '../state/context';
import Row from '../components/Row';
import Column from '../components/Column';
import MoveButton from '../components/MoveButton';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import { IInfoform } from '../interfaces';
import { getDescritionFlagDeep, setDateString } from '../lib/helpers';


function Infoform() {
  const { changeState, changeStateAsync, infoForm, pageStructure, page, infoFormErrors, addedSubgenre, genres, activeGenre, activeSubgenre, loader, postStart, postSuccess } = React.useContext( AppContext );
  const prevPostStart = usePrevious(postStart);
  const prevPostSuccess = usePrevious(postSuccess);
  const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());

  const getEmptyFormProps = () => {
    let res: any = [];
    let key: keyof IInfoform;
    for(key in infoForm){ if(infoForm[key] === '' || infoForm[key] === undefined){ res.push(key); } }

    return res;
  }

  const fakeMove = (type: string, props: any) => {
    const descriptionRequired = addedSubgenre ? addedSubgenre.isDescriptionRequired : getDescritionFlagDeep(genres, activeGenre, activeSubgenre);
    validateForm(descriptionRequired);
  }

  const validateForm = (descriptionRequired: boolean) => {
    const emptyProps = getEmptyFormProps();
    if (descriptionRequired) {
      if (emptyProps.length) {
        changeState('SET_INFOFORM_ERRORS', {errors: emptyProps});
      }else{
        changeState('START_FAKE_POST', {});
      }
    }else{
      const index = emptyProps.indexOf('bookDescription');
      if ( index > -1) { emptyProps.splice(index, 1); }
      if (emptyProps.length) {
        changeState('SET_INFOFORM_ERRORS', {errors: emptyProps});
      }else{
        changeState('START_FAKE_POST', {});
      }
    }
  }


  function usePrevious(value: any) {
    const ref = React.useRef();
    React.useEffect(() => { ref.current = value; });
    return ref.current;
  }

  React.useEffect(() => {
    if (!prevPostStart && postStart) { changeStateAsync("FAKE_POST", {}); }
  });

  React.useEffect(() => {
    if (!prevPostSuccess && postSuccess) { console.log({...infoForm, genre: activeGenre, subgenre: activeSubgenre }); changeState("SET_PAGE", {direction: "next"}); }
  });

  return (
    <div>
      <Loader show={ loader } text="Adding book to our database..."/>
      <Row>
        <Column breakSpan="12">
          <Navigation structure={ pageStructure } current={ page } />
        </Column>
      </Row>

      <form>
        <Row className="infoForm">
          <Column breakSpan="12">
            <label htmlFor="bookTitle">Book title</label>
            <input 
              type="text" 
              name="bookTitle" 
              className="simple-textinput" 
              value={ infoForm.bookTitle } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookTitle') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            />
          </Column>

          <Column breakSpan="12">
            <label htmlFor="bookAuthor">Author</label>
            <select 
              name="bookAuthor" 
              id="bookAuthor" 
              className="simple-textinput" 
              value={ infoForm.bookAuthor } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})}  
              style={ infoFormErrors.indexOf('bookAuthor') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            >
              <option value=""></option>
              <option value="Leo Tolstoy">Leo Tolstoy</option>
              <option value="Charles Dickens">Charles Dickens</option>
              <option value="James Joyce">James Joyce</option>
              <option value="Virginia Wolf">Virginia Wolf</option>
              <option value="Mark Twain">Mark Twain</option>
            </select>
          </Column>

          <Column breakSpan="12">
            <label htmlFor="bookISBN">ISBN</label>
            <input 
              type="text" 
              name="bookISBN" 
              className="simple-textinput" 
              value={ infoForm.bookISBN } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookISBN') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}} 
            />
          </Column>

          <Column breakSpan="12">
            <label htmlFor="bookPublisher">Publisher</label>
            <select 
              name="bookPublisher" 
              id="bookPublisher" 
              className="simple-textinput" 
              value={ infoForm.bookPublisher } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookPublisher') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            >
              <option value=""></option>
              <option value="Macmillan Publishers">Macmillan Publishers</option>
              <option value="Simon and Schuster">Simon and Schuster</option>
              <option value="HarperCollins">HarperCollins</option>
              <option value="Hachette Livre">Hachette Livre</option>
              <option value="McGraw-Hill">McGraw-Hill</option>
            </select>
          </Column>

          <Column breakSpan="4">
            <label htmlFor="bookDate">Date published</label>
            <input 
              type="date" 
              name="bookDate" 
              max={setDateString(yesterday)}
              className="simple-textinput" 
              value={ infoForm.bookDate } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookDate') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            />
          </Column>
          <Column breakSpan="8"></Column>

          <Column breakSpan="3">
            <label htmlFor="bookPages">Number of pages</label>
            <input 
              type="number" 
              min="1"
              name="bookPages" 
              className="simple-textinput" 
              value={ infoForm.bookPages } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})}  
              style={ infoFormErrors.indexOf('bookPages') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            />
          </Column>
          <Column breakSpan="9"></Column>

          <Column breakSpan="4">
            <label htmlFor="bookFormat">Format</label>
            <select 
              name="bookFormat" 
              id="bookFormat" 
              className="simple-textinput" 
              value={ infoForm.bookFormat } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookFormat') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            >
              <option value=""></option>
              <option value="Hardcover">Hardcover</option>
              <option value="Paperback">Paperback</option>
              <option value="Audiobook">Audiobook</option>
            </select>
          </Column>
          <Column breakSpan="8"></Column>

          <Column breakSpan="4">
            <label htmlFor="bookEdition">Book edition</label>
            <input 
              type="text" 
              name="bookEdition" 
              className="simple-textinput" 
              value={ infoForm.bookEdition } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookEdition') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            />
          </Column>

          <Column breakSpan="4">
            <label htmlFor="bookEditionLang">Edition language</label>
            <select 
              name="bookEditionLang" 
              id="bookEditionLang" 
              className="simple-textinput" 
              value={ infoForm.bookEditionLang } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookEditionLang') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            >
              <option value=""></option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </Column>
          <Column breakSpan="4"></Column>

          <Column breakSpan="12">
            <label htmlFor="bookDescription">Description</label>
            <textarea 
              name="bookDescription" 
              className="simple-textbox" 
              value={ infoForm.bookDescription } 
              onChange={ (event) => changeState("SET_INFOFORM_VALUE", {target: event.target})} 
              style={ infoFormErrors.indexOf('bookDescription') !== -1 ? {"borderColor": "red"} : {"borderColor": "#515663"}}
            ></textarea>
          </Column>
        </Row>
      </form>

      <Row>
        <Column breakSpan="12" align="center">
          {
            infoFormErrors.length
            ?
            (<p className="instruction" style={{"color":"red"}}>You need to provide more book information. Please, fill out the inputs marked in red.</p>)
            :
            (<p className="instruction">Fill out the form and click ADD to add a new book.</p>)
          }
          
        </Column>
      </Row>

      <Row>
        <Column breakSpan="7"></Column>
        <Column breakSpan="5" align="right">
          <MoveButton show={ true } text="Back" direction="back" change={ changeState } />
          <MoveButton show={ true } text="Add" direction="next" change={ fakeMove } className="next" />
        </Column>
      </Row>
    </div>
  );
}

export default Infoform;