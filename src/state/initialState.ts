import { IState } from '../interfaces';

const initialState: IState = {
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
  postSuccess: false,
  genres: [
    {
      "id": 1,
      "name": "Genre 1",
      "subgenres": [
        { "id": 10, "name": "Subgenre 1", "isDescriptionRequired": true },
        { "id": 11, "name": "Subgenre 2", "isDescriptionRequired": false },
        { "id": 12, "name": "Subgenre 3", "isDescriptionRequired": true },
        { "id": 13, "name": "Subgenre 4", "isDescriptionRequired": true },
        { "id": 14, "name": "Subgenre 5", "isDescriptionRequired": true }
      ]
    },
    {
      "id": 2,
      "name": "Genre 2",
      "subgenres": [
        { "id": 15, "name": "Subgenre 1", "isDescriptionRequired": true },
        { "id": 16, "name": "Subgenre 2", "isDescriptionRequired": false },
        { "id": 17, "name": "Subgenre 3", "isDescriptionRequired": true }
      ]
    },
    {
      "id": 3,
      "name": "Genre 3",
      "subgenres": [
        { "id": 18, "name": "Subgenre 1", "isDescriptionRequired": true },
        { "id": 19, "name": "Subgenre 2", "isDescriptionRequired": true },
        { "id": 20, "name": "Subgenre 3", "isDescriptionRequired": true }
      ]
    },
    {
      "id": 4,
      "name": "Genre 4",
      "subgenres": [
        { "id": 21, "name": "Subgenre 1", "isDescriptionRequired": false },
        { "id": 22, "name": "Subgenre 2", "isDescriptionRequired": false },
        { "id": 23, "name": "Subgenre 3", "isDescriptionRequired": false }
      ]
    },
    {
      "id": 5,
      "name": "Genre 5",
      "subgenres": [
        { "id": 24, "name": "Subgenre 1", "isDescriptionRequired": true },
      ]
    },
  ],
  changeState: (type: string, props: any) => {},
  changeStateAsync: async (type: string, props: any) => {},
}

export default initialState;