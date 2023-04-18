const usersStartingLimit = 6;
const increment = 3;

const initialState = {
   usersArray: [],
   status: null,
   error: null,
   usersLimit: usersStartingLimit,
   fetchData: null,
   postData: {
      tokenData: null,
      responseData: null,
   },
   fetchPosition: null,
   successSend: false,
};

export { increment, initialState, usersStartingLimit };

