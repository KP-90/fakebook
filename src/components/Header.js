// Header will hold the logo(link to home) along with link to current user and log out button
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToken, changeUser } from "./userSlice";
import '../styles/header.css'

const Header = ({setToken}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userInfo.user)

    // Log out function
    const HandleLogout = () => {
        localStorage.removeItem('token')
        dispatch(changeToken({'token': null}))
        dispatch(changeUser(""))
        setToken({'token': null})
    }

    return(
        <Navbar bg='light' expand="lg">
            <Container>
                <Navbar.Brand><Link to="/" className="title"><h1>Fakebook</h1></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto justify-content-end'>
                        <Nav.Link></Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Item className="navitem"><Link to="/user/me"><h2>{user.username}</h2></Link></Nav.Item>
                        <Nav.Item ><Button className="btn" variant="primary" type="button" onClick={HandleLogout}>Logout</Button></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            
        </Navbar>
    )
}

export default Header