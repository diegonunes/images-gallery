import {Container, Navbar} from 'react-bootstrap';
import logo from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({title}) => {
  return (
      <Navbar variant="light" style={navbarStyle}>
        <Container>
          <img src={logo} alt="Logo"
               style={{maxWidth: '12rem', maxHeight: '2rem'}}/>
        </Container>
      </Navbar>
  );
};

export default Header;