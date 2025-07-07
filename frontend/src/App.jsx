import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search.jsx';
import {useState} from 'react';
import ImageCard from './components/ImageCard.jsx';
import {Col, Container, Row} from 'react-bootstrap';
import Welcome from './components/Welcome.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
        `${API_URL}/new-image?query=${word}`).
        then((res) => res.json()).then((data) => {
      setImages([{...data, title: word}, ...images]);
    }).catch((err) => {
      console.log(err);
    });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
      <div>
        <Header title="Images Gallery"/>
        <Search word={word} setWord={setWord}
                handleSubmit={handleSearchSubmit}/>
        <Container className="mt-4">
          {images.length ? (<Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                    <Col key={i} className="pb-3">
                      <ImageCard image={image} deleteImage={handleDeleteImage}/>
                    </Col>
                ))}
              </Row>
          ) : (
              <Welcome/>
          )}
        </Container>
      </div>
  );
};

export default App;
