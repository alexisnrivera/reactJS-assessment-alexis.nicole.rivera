import React from 'react'
import { useState } from "react";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from './components/BookList';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, BrowserRouter, Routes} from 'react-router-dom';


const App = () => {

  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log(id);
    setBookId(id);
  };
  return (
    <>
    <nav className="header">
      <div className='header-bg'>

      
      <Container>
        <Navbar.Brand className='logo' href="#home">Library</Navbar.Brand>
      </Container>

      </div>
    </nav>
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
           <AddBook id={bookId} setBookId={setBookId} />
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
          <BooksList getBookId={getBookIdHandler} />
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default App