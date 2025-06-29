import {Container, Navbar} from 'react-bootstrap';

const navbarStyle = {
  backgroundColor: 'lightblue',
};

const Header = ({title}) => {
  return (
      <Navbar variant="light" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
        </Container>
      </Navbar>
  );
};

export default Header;