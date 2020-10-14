import React from 'react';
import AppContext from './context';
import reducer from './reducer';
import initialState from './initialState';
import { changeState, changeStateAsync } from '../lib/helpers';

export default function Provider(props: { children: object }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {
    page: state.page,
    activeGenre: state.activeGenre,
    activeSubgenre: state.activeSubgenre,
    addedSubgenre: state.addedSubgenre,
    newSubgenre: state.newSubgenre,
    newSubgenreDesReq: state.newSubgenreDesReq,
    pageStructure: state.pageStructure,
    genres: state.genres,
    infoForm: state.infoForm,
    infoFormErrors: state.infoFormErrors,
    loader: state.loader,
    postStart: state.postStart,
    postError: state.postError,
    postSuccess: state.postSuccess,
    changeState: (type: string, props: any): void => {
      const value = changeState(state, type, props);
      if(value){
        dispatch({type: "SET_CHANGE", value });
      }
    },
    changeStateAsync: async (type: string, props: any): Promise<any> => {
      await changeStateAsync(state, dispatch, type, props);
    }
  }

  return (
    <AppContext.Provider value ={ value }>
      {props.children}
    </AppContext.Provider>
  )
}