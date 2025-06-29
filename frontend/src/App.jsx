import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search.jsx';
import {useState} from 'react';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

const App = () => {
  const [word, setWord] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
        `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`).
        then((res) => res.json()).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
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
