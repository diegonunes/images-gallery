import {Spinner as Loader} from 'react-bootstrap';

const Spinner = () => (
    <div className="spinner-container">
      <Loader className="spinner-centered" animation="border"
              variant="primary"/>
    </div>
);

export default Spinner;
