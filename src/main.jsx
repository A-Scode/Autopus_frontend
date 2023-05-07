import { useEffect, useState } from 'react'
import './main.css'
import {Button, Card, Modal} from 'react-bootstrap'
import constant from './constants.json'

const Main = props =>{

    const [bookList , setBookList] = useState([]);
    const [showAddbook , setShowAddbook] = useState(true);


    useEffect(()=>{

    //fetching data
    let xhr = new XMLHttpRequest();
    xhr.open('GET' , `${constant.origin.url}books/list` );

    xhr.onload=()=>{
        if( xhr.status === 200 ){
            let res = JSON.parse(xhr.response);
            console.log(res);
            setBookList(res.data);
        }
    }

    xhr.send();

    


    } , [])

    return(
        <div className="container">
            <h1 align='center'>Library</h1>

            <div className="books_container">
                {bookList.map(item=>(
                    <Book key={item.book_id} data={item} />
                ))}
            </div>

            <Button variant="success" className = "add_button" onClick={()=>setShowAddbook(!showAddbook)}>Add Book</Button>

            <AddBookModel show = {showAddbook} />
        </div>
    )
}


const Book = props =>{
    return(
    <Card style={{ width: '18rem' ,height: 400 }}>
      <Card.Img variant="top" src={`${props.data.image_url}`} style={{height:200 , objectFit:"contain"}} />
      <Card.Subtitle className="mb-2 text-muted" style={{marginTop:10}}>by {props.data.author}</Card.Subtitle>
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.description}
        </Card.Text>
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
    )
}

const AddBookModel= props=>{
    return (
        <Modal show={props.show} >
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>null}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}


export default Main;