import * as React from 'react';
import { useSelector } from 'react-redux';

import './Styles.module.scss';
import { About } from './components/About';
import { Header } from './components/Header';
import { Register } from './components/Register';
import { RegisterMessage } from './components/RegisterMessage';

function App() {
  const messageSend = useSelector((state) => state.successSend);
  return (
    <>
      <Header />
      <About />
      {!messageSend ? <Register /> : <RegisterMessage />}
    </>
  );
}

export default App;
