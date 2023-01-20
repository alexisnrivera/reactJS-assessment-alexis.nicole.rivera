import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/bookservice";
import "../index.css";



const BooksList = ({getBookId}) => {

  const [books, setBooks] = useState([]);

  useEffect (()=> {
    getBooks();
  }, []);
  

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    setBooks(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  }
  return (
    <>
                         
      

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre> */}
     

      <Table striped bordered hover size="sm">
        {/* <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Desc</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead> */}
        <tbody>
       
        {books.map((doc, index)=>{
            return(
            
                  <>
                   <div className="display-container">
                          <div className="book-img">
                            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516">
                             </img>

                             <ul className="data">
                        <li>{index +1}</li>
                         <li>{doc.title}</li>
                        <li>{doc.author}</li>
                         <li>{doc.desc}</li>
                         <li>{doc.status}</li>
                            </ul>
                           </div>
                     
                      <div className="btn-container">
                          <Button
                      variant="secondary"
                      className="edit"
                      onClick={(e) => getBookId(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                      </div>
                  </div>
                </>

                        
               
             
            
        
            )
          })}
             
          
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;