import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const Search = ({handleSubmit, word, setWord}) => {
  return (
      <Container className={'mt-4'}>
        <Row className={'justify-content-center'}>
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={9}>
                  <Form.Control
                      type="text"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      placeholder="Search for new image..."
                  />
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};
export default Search;
