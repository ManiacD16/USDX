// reducer.ts
interface Action {
  type: string;
  payload: any;
}

// Initial state includes status, requestID, and polling state
export const initialState = {
  withdrawalStatus: null, // 'pending', 'completed', 'failed', 'in-progress'
  requestID: null,
  polling: false, // Whether we're polling for withdrawal status
  error: null, // Store any error messages
};

// Reducer to handle withdrawal process state
export const reducer = (state: any, action: Action) => {
  console.log(`reducer ka state: `, state); // Debugging: log the current state

  switch (action.type) {
    case "INITIATE_WITHDRAWAL":
      return {
        ...state,
        withdrawalStatus: "pending",
        requestID: action.payload.requestID,
        polling: true,
        error: null,
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        withdrawalStatus: action.payload.status,
        error: null,
      };

    case "STOP_POLLING":
      return {
        ...state,
        polling: false,
      };

    case "ERROR":
      return {
        ...state,
        withdrawalStatus: "failed",
        error: action.payload,
      };

    default:
      return state;
  }
};
