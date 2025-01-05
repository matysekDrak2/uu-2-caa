import Button from 'react-bootstrap/Button';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useContext} from "react";
import {UniversalContext} from "../data/universalProvider";

function Header() {
    const { formsWorkoutSetter } = useContext(UniversalContext)
    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container className="position-relative">
                <Navbar.Brand href="#home">Workout manager</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Exercises</Nav.Link>
                    <Nav.Item>
                        <Button variant="primary" className={"end-0  position-fixed"} style={{marginRight: '20px'}}
                            onClick={()=>{formsWorkoutSetter((prev)=>{return {...prev, visible: true}} )}}>
                        Add new Workout</Button>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;