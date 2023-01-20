import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/bookservice";


const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");

    if (title ==="" || author === "" || desc === ""){
        setMessage({error: true, msg: "ANSWER ALL FORMS"});
        return;

    }

    const newBook = {
      title,
      desc,
      author,
      status
    };

    try {
      
      if (id !== undefined && id !== ""){
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({error: false, msg: "Updated!"});
      } else{
        await BookDataService.addBooks(newBook);
        setMessage({error: false, msg: "New Book added!"});
      }
     
    } catch(err) {
      setMessage({error: true, msg:err.message});
    }

    setTitle("");
    setAuthor("");
    setDesc("");
  };

  const editHandler = async() => {
    setMessage("");
    try{
      const docSnap = await BookDataService.getBook(id);
      // console.log("The record is: ", docSnap.data)
    setTitle(docSnap.data().title);
    setDesc(docSnap.data().desc);
    setAuthor(docSnap.data().author);
    setStatus(docSnap.data().status);
      } catch (err){
        setMessage({ error: true, msg: err.message});
      }
  };

  const [editMode, setEdit] = useState (false);
  useEffect(() => {
    console.log("The id is: ", id);
    if (id !== undefined && id !== ""){
      editHandler();
    }
   },[id])
  
  return (
   
      <>
        {/* {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )} */}

        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookDesc">
            <InputGroup>
              <InputGroup.Text id="formBookDesc">Desc</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">Author</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              // disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              // disabled={!flag}
              onClick={(e) => {
                setStatus("Reserved");
                setFlag(false);
              }}
            >
              Reserved
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add Book
            </Button>
          </div>
        </Form>
    </>
  );
};

export default AddBook;