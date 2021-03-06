import { IGenre, IActionTypes, IClearState, IState, IInfoform } from '../interfaces';

export const binarySearch = (arr: Array<{id: number}>, id: number): any => { 
  let start=0;
  let end =arr.length-1; 

  while (start<=end){ 
      let mid=Math.floor((start + end)/2); 
 
      if (arr[mid].id === id){
        return arr[mid]; 
      }else if (arr[mid].id < id){
        start = mid + 1;
      }else{
        end = mid - 1;
      }       
  } 
 
  return null; 
}

export const getDescritionFlagDeep = (genres: Array<IGenre>, activeGenre: number, activeSubgenre: number): boolean => {
  const genreObj = binarySearch(genres, activeGenre);
  const subGenreObj = binarySearch(genreObj.subgenres, activeSubgenre);
  const res = subGenreObj ? subGenreObj.isDescriptionRequired : false;
  return res;
}

export const setDateString = (date: Date): string => {
  const split = date.toLocaleDateString().split('/');
  return `${split[2]}-${split[0].length < 2 ? '0'+split[0] : split[0]}-${split[1].length < 2 ? '0'+split[1] : split[1]}`;
}

export const changeState = <T extends IState> (state: T, type: string, props: any): T | null => {
  const newState = {...state};
  let next = true;
  let res: T | null = newState;

  //BEFORE CHANGE
  if (!isActionChangingState(state, type,  props)) { next = false; res = null; }
  
  //CHANGE
  if (type === "SET_PAGE" && next) { res = setPage(state, newState, props); }
  if (type === "SET_GENRE" && next) { res = setGenre(newState, props); }
  if (type === "SET_SUBGENRE" && next) { res = setSubGenre(state, newState, props); }
  if (type === "ADD_NEW_SUBGENRE" && next) { res = addSubGenre(newState); }
  if (type === "CHANGE_NEW_SUBGENRE" && next) { res = changeNewSubgenre(newState, props); }
  if (type === "CHANGE_NEW_SUBGENRE_DESREQ" && next) { res = changeNewSubgenreDesReq(state, newState); }
  if (type === "SET_INFOFORM_VALUE" && next) { res = setInforform(newState, props); }
  if (type === "SET_INFOFORM_ERRORS" && next) { res = setInfoformErrors(newState, props); }
  if (type === "START_FAKE_POST" && next) { res = fakePostStart(newState); }
  if (type === "RESET_APP" && next) { res = resetApp(newState); }

  //AFTER CHANGE
  if (next) { res = cleanState(type, newState); }

  // console.log(res);
  
  return res;
}

 //CHNAGER FUNCTIONS


const setPage = <T extends IState> (state: T, newState: any, props: any): T  => {
  const currentPage = state.pageStructure.indexOf(state.page);
  const { direction } = props;

  if ((currentPage > 0 && direction === 'back') || (currentPage < (state.pageStructure.length - 1) && direction === 'next')) {
    const newPage = direction === 'next' ? currentPage + 1 < state.pageStructure.length ? state.pageStructure[currentPage + 1] : state.pageStructure[0] : direction === 'back' ? currentPage - 1 < 0 ? state.pageStructure[0] : state.pageStructure[currentPage - 1] : state.pageStructure[0];
    const newStructure = [...state.pageStructure];
    
    if (state.pageStructure[currentPage] === 'Addsubgenre' && newPage === 'Subgenre' ) {
      newStructure.splice(2, 1);
    }
    newState.pageStructure = newStructure;
    newState.page = newPage;
  }

  return newState;
}

const setGenre = <T extends IState> (newState: T, props: any): T => {
  const { id } = props;
  newState.activeGenre = id;
  
  return newState;
}

const setSubGenre = <T extends IState> (state: T, newState: T, props: any): T => {
  const { id } = props;
  if (id === -1) {
    newState.pageStructure.splice(2, 0, 'Addsubgenre');
    newState.page = 'Addsubgenre';
    newState.activeSubgenre = 0;
  }else{
    if (id !== state.activeSubgenre) {
      newState.activeSubgenre = id;
    }
  }

  return newState;
}

const addSubGenre = <T extends IState> (newState: T): T => {
  const lastGenreIndex = newState.genres.length - 1;
  const lastSubgenreIndex = newState.genres[lastGenreIndex]['subgenres'].length - 1;
  const id = newState.genres[lastGenreIndex]['subgenres'][lastSubgenreIndex]['id'] + 1;
  const newSubGenObj = {genre: newState.activeGenre, id, name: newState.newSubgenre, isDescriptionRequired: newState.newSubgenreDesReq}
  newState.page = 'Infoform';
  newState.addedSubgenre = newSubGenObj;

  return newState;
}

const changeNewSubgenre = <T extends IState> (newState: T, props: any): T => {
  const { value } = props;
  newState.newSubgenre = value;

  return newState;
}

const changeNewSubgenreDesReq = <T extends IState> (state:T, newState: T): T => {
  newState.newSubgenreDesReq = !state.newSubgenreDesReq;

  return newState;
}

const setInforform = <T extends IState> (newState: T, props: any ): T => {
  const { target } = props;
  let key: keyof IInfoform;
  key = target.name;
  newState.infoForm[key] = target.value;

  return newState;
}

const setInfoformErrors = <T extends IState> (newState: T, props: any): T => {
  const { errors } = props;
  newState.infoFormErrors = errors;

  return newState;
}

const fakePostStart = <T extends IState> (newState: T): T => {
  newState.postStart = true;
  newState.loader = true;
  newState.infoFormErrors = [];

  return newState;
}

const resetApp = <T extends IState> (newState: T): T => {
  return stateClean(newState, []);
}

const isActionChangingState = <T extends IState> (state: T, type: any, props: any): boolean => {
  let res = true;
  let key: keyof IActionTypes;
  key = type;
  const typeChangeReference: IActionTypes = {
    "SET_PAGE" : ['page'],
    "SET_GENRE": ['activeGenre'],
    "SET_SUBGENRE" : ['activeSubgenre'],
    "CHANGE_NEW_SUBGENRE" : ['newSubgenre'],
    "SET_INFOFORM_VALUE" : ['infoForm'],
    "CHANGE_NEW_SUBGENRE_DESREQ": [],
    "ADD_NEW_SUBGENRE": [],
    "START_FAKE_POST": [],
    "SET_INFOFORM_ERRORS": ['infoFormErrors'],
    "RESET_APP": [],
  }

  for (let index = 0; index < typeChangeReference[key].length; index++) {
    let stateProp: keyof IState;
    stateProp = typeChangeReference[key][index] as keyof IState;
    if (typeof state[stateProp] !== 'object') {
      if (state[stateProp] === props[Object.keys(props)[0]]) {
        res =  false;
        break;
      }
    }else{
      if (objectsAreTheSame(state[stateProp], props[Object.keys(props)[0]])) {
        res =  false;
        break;
      }
    }
  }

  return res;
}

const objectsAreTheSame = (obj1: any, obj2: any): boolean => {
  if (Array.isArray(obj1) === Array.isArray(obj2)) {
    if (Array.isArray(obj1)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
    }else{
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
    }
  }else{
    return false;
  }

  for(var key in obj1){
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}



const cleanState = <T extends IState>  (type: string, newState: T): T => {
  let forbidden: Array<string> = [];
  if (type === "SET_GENRE") { 
    forbidden = ["page", "activeGenre", 'pageStructure'];
    return stateClean(newState, forbidden);
  }
  if (type === "SET_SUBGENRE") { 
    forbidden = ["page", "activeGenre", "activeSubgenre", 'pageStructure'];
    return stateClean(newState, forbidden); 
  }

  return forbidden.length ? stateClean(newState, forbidden) : newState;
}

const stateClean = <T extends IState> (newState: T, forbidden: Array<string>): T => {
  const initialState: IClearState = {
    page: 'Genre',
    activeGenre: 0,
    activeSubgenre: 0,
    newSubgenre: '',
    newSubgenreDesReq: false,
    addedSubgenre: null,
    pageStructure: ['Genre', 'Subgenre', 'Infoform', 'Success'],
    infoForm: {
      bookTitle: '',
      bookAuthor: '',
      bookISBN: '',
      bookPublisher: '',
      bookDate: '',
      bookPages: '',
      bookFormat: '',
      bookEdition: '',
      bookEditionLang: '',
      bookDescription: '',
    },
    infoFormErrors: [],
    loader: false,
    postStart: false,
    postError: false,
    postSuccess: false
  }

  let key: keyof IClearState;
  for(key in initialState){
    if(forbidden.indexOf(key) === -1){
      newState[key] = initialState[key];
    }
  }

  return newState;
}


export const changeStateAsync = async <T extends IState> (state: T, dispatch: any, type: string, props: any): Promise<T> => {
  const newState = {...state};
  let next = true;
  let res = newState;

  //BEFORE CHANGE

  //CHANGE
  if (type === "FAKE_POST" && next) { res = await testPost(state, newState, dispatch); }
  //AFTER CHANGE
  
  return res;
}

const testPost = async <T extends IState> (state: T, newState: any, dispatch: any): Promise<any> => {
  return setTimeout(() => {
    try {
      newState.postSuccess = true;
      newState.postStart = false;
      newState.loader = false;
      
      dispatch({type: "SET_CHANGE", value: newState })

    } catch (error) {
        newState.postError = error;
        newState.postStart = false;
        newState.loader = false

        dispatch({type: "SET_CHANGE", value: newState })
    }
  }, 2000);
}