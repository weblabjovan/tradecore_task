import { IState } from '../interfaces';

export default function reducer(state: IState, action: { type: string, value: any }) {
  if (action.type === "SET_CHANGE") {
    return action.value;
  }

  return state;
}