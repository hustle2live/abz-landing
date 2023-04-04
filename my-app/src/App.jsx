import './Styles.module.scss';
import { About } from './components/About';
import { Header } from './components/Header';
import { Register } from './components/Register';

function App() {
  return (
    <>
      <Header />
      <About />
      <Register />
    </>
  );
}

export default App;
