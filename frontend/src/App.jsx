import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search.jsx';
import {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard.jsx';
import {Col, Container, Row} from 'react-bootstrap';
import Welcome from './components/Welcome.jsx';
import axios from 'axios';
import Spinner from './components/Spinner.jsx';
import {ToastContainer, toast} from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedImages = async () => {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
        toast.success('Saved images downloaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title: word}, ...images]);
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(`Image ${images.find((i) => i.id === id).
            title.
            toUpperCase()} was deleted`);
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
      <div>
        <Header title="Images Gallery"/>
        {loading ? (
            <Spinner/>
        ) : (
            <>
              <Search word={word} setWord={setWord}
                      handleSubmit={handleSearchSubmit}/>
              <Container className="mt-4">
                {images.length ? (<Row xs={1} md={2} lg={3}>
                      {images.map((image, i) => (
                          <Col key={i} className="pb-3">
                            <ImageCard image={image}
                                       deleteImage={handleDeleteImage}
                                       saveImage={handleSaveImage}/>
                          </Col>
                      ))}
                    </Row>
                ) : (
                    <Welcome/>
                )}
              </Container>
            </>
        )}
        <ToastContainer position="bottom-right"/>
      </div>
  );
};

export default App;
