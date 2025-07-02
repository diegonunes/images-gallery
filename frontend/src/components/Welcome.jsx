import {Button} from 'react-bootstrap';

const Welcome = () => {
  return (
      <div className="jumbotron">
        <h1>Images Gallery</h1>
        <p>
          This is simple application that retrieves photos using Unsplash API.
          In order to start enter any search term in the input field.
        </p>
        <p>
          <Button varian="primary" href="https://unsplash.com" target="_blank">Learn
            more</Button>
        </p>
      </div>
  );
};
export default Welcome;
