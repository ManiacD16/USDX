interface Action {
  type: string;
  payload: any;
}

export const initialState = null;

export const reducer = (state: string, action: Action) => {
  console.log(`reducer ka state ` + state);
  if (action.type === "USER") {
    console.log(`action payload` + action.payload);
    return action.payload;
  }
  return state;
}