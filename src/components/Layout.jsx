import { Outlet, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function Layout() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#">Soundscapes of Gaming</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/browse">Browse by Mood</Nav.Link>
              <Nav.Link as={NavLink} to="/favorites">Favorites</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
