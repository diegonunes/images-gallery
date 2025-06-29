import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search.jsx';
import {useState} from 'react';

const App = () => {
  const [word, setWord] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word);
  };

  return (
      <>
        <Header title="Image Gallery"/>
        <Search word={word} setWord={setWord}
                handleSubmit={handleSearchSubmit}/>
      </>
  );
};

export default App;
