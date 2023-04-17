import * as React from 'react';
import { useSelector } from 'react-redux';

import { Candidates } from './components/Candidates/Candidates';
import { Header } from './components/Header/Header';
import { Register } from './components/Registration/Register';
import { SuccessMessage } from './components/SendMessage/RegisterMessage';

function App() {
   const successSend = useSelector((state) => state.successSend);
   return (
      <>
         <Header />
         <Candidates />
         {!successSend ? <Register /> : <SuccessMessage />}
      </>
   );
}

export default App;
