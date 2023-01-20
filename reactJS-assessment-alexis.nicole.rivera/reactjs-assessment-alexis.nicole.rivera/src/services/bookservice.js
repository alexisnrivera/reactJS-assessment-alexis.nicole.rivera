import { db } from "../firebase";
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


const bookCollection = collection(db,"books")
class BookDataService{

addBooks = (newBook) => {
    return addDoc(bookCollection, newBook);
};

updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
};

deleteBook = (id) => {
    const bookDoc = doc (db, "books", id);
    return deleteDoc(bookDoc);
};

getAllBooks = () => {
    return getDocs (bookCollection);
} 

getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDocs(bookDoc);
};

};


export default new BookDataService();