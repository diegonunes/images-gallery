import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search.jsx';
import {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard.jsx';
import {Col, Container, Row} from 'react-bootstrap';
import Welcome from './components/Welcome.jsx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getSavedImages = async () => {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title: word}, ...images]);
    } catch (error) {
      console.log(error);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
            images.map((image) =>
                image.id === id ? {...image, saved: true} : image,
            ),
        );
      }
    } catch (error) {
      console.log(error);
    }
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
                      <ImageCard image={image} deleteImage={handleDeleteImage}
                                 saveImage={handleSaveImage}/>
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
