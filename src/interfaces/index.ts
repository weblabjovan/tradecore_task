export interface IMoveButtonProps{
  show: boolean;
  text: string;
  direction: string;
  changeType?: string;
  className?: string;
  change: (type: string, props: any)=> void;
}

export interface IBlockProps{
  widthSpan: number; 
  name: string; 
  id: number;
  active: boolean; 
  clickable: boolean; 
  funcType: string; 
  setFunc: (type: string, props: any) => void;
}

export interface IActionTypes{
  "SET_PAGE" : Array<string>,
  "SET_GENRE": Array<string>,
  "SET_SUBGENRE" : Array<string>,
  "CHANGE_NEW_SUBGENRE" : Array<string>,
  "SET_INFOFORM_VALUE" : Array<string>,
  "SET_INFOFORM_ERRORS": Array<string>,
  "CHANGE_NEW_SUBGENRE_DESREQ": Array<string>,
  "ADD_NEW_SUBGENRE": Array<string>,
  "START_FAKE_POST": Array<string>,
  "RESET_APP": Array<string>,
}

export interface IInfoform{
  bookTitle: string;
  bookAuthor: string;
  bookISBN: string;
  bookPublisher: string;
  bookDate: string;
  bookPages: string;
  bookFormat: string;
  bookEdition: string;
  bookEditionLang: string;
  bookDescription: string;
}

export interface ISubgenre{
  id: number;
  name: string;
  isDescriptionRequired: boolean;
}

export interface IGenre{
  id: number;
  name: string;
  subgenres: Array<ISubgenre>;
}

export interface IClearState{
  page: string;
  activeGenre: number;
  activeSubgenre: number;
  newSubgenre: string;
  newSubgenreDesReq: boolean;
  addedSubgenre: ISubgenre | null;
  pageStructure: Array<string>;
  infoForm: IInfoform;
  infoFormErrors: Array<string>;
  loader: boolean;
  postStart: boolean;
  postError: boolean | object;
  postSuccess: boolean;
}

export interface IState{
  page: string;
  activeGenre: number;
  activeSubgenre: number;
  newSubgenre: string;
  newSubgenreDesReq: boolean;
  addedSubgenre: ISubgenre | null;
  pageStructure: Array<string>;
  genres: Array<IGenre>;
  infoForm: IInfoform;
  infoFormErrors: Array<string>;
  loader: boolean;
  postStart: boolean;
  postError: boolean | object;
  postSuccess: boolean;
  changeState: (type: string, props: any) => void;
  changeStateAsync: (type: string, props: any) => Promise<any>;
}