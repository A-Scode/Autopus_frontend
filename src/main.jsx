import { useEffect, useState } from 'react'
import './main.css'
import {Button, Card, Form, Modal} from 'react-bootstrap'
import constant from './constants.json'

const Main = props =>{

    const [bookList , setBookList] = useState([]);
    const [showAddbook , setShowAddbook] = useState(false);

    const fetchBooks=()=>{
        //fetching data
    let xhr = new XMLHttpRequest();
    xhr.open('GET' , `${constant.origin.url}books/list/` );

    xhr.onload=()=>{
        if( xhr.status === 200 ){
            let res = JSON.parse(xhr.response);
            console.log(res);
            setBookList(res.data);
        }
    }

    xhr.send();
    }


    useEffect(()=>{

    fetchBooks();

    } , [])

    return(
        <div className="fullcontainer">
            <h1 align='center' style={{margin:"20px 20px"}} ><i class="bi bi-book"></i> &nbsp; Library</h1>

            <div className="books_container">
                {bookList.map(item=>(
                    <Book key={item.book_id} data={item} />
                ))}
            </div>

            <Button variant="success" className = "add_button" onClick={()=>setShowAddbook(true )}><i class="bi bi-journal-plus"></i> &nbsp; Add Book</Button>

            <AddBookModel show = {showAddbook} hideModal={()=>setShowAddbook(false)} />
        </div>
    )
}


const Book = props =>{

    const [showEdit , setShowEdit] = useState(false);

    const date = new Date(props.data.last_edit)

    const delteBook=()=>{
        //fetching data
    let xhr = new XMLHttpRequest();
    xhr.open('POST' , `${constant.origin.url}books/delete/` );

    xhr.onload=()=>{
        if( xhr.status === 200 ){
            let res = JSON.parse(xhr.response);
            console.log(res);
            window.location.reload();
        }
    }
    xhr.setRequestHeader('Content-type', 'application/json');
    
    xhr.send(JSON.stringify({book_id : props.data.book_id}));
}

return(
    <Card style={{ width: '18rem' ,height: 400 }}>
      <Card.Img variant="top" src={`${props.data.image_url}`} style={{height:200 , objectFit:"contain"}} />
      <Card.Subtitle className="mb-2 text-muted" style={{marginTop:10}}>by {props.data.author}</Card.Subtitle>
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text style={{textOverflow:'ellipsis' , whiteSpace:'nowrap' , overflow:'hidden'}}>
          {props.data.description}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted" style={{textAlign:'left'}} >{date.toLocaleDateString("en-US")}</Card.Subtitle>
        <div className="wrap" style={{display:"flex" , flexDirection:"row" , flexWrap:"nowrap" , gap:20 , justifyContent:"center"}}>
        <Button variant="primary" onClick={()=>setShowEdit(true)}><i class="bi bi-pencil"></i> &nbsp; Edit</Button>
        <Button variant="danger" onClick={delteBook}><i class="bi bi-trash3"></i> &nbsp; Delete</Button>
        <EditBookModel show={showEdit} hideModal={()=>setShowEdit(false)} data={ props.data} />
        </div>
      </Card.Body>
    </Card>
    )
}

const AddBookModel= props=>{

    const [data , setdata] = useState({
        title:"" , author:"", description:"" , image_url:""
    })

    const submitForm=e=>{
        e.preventDefault();
        e.stopPropagation();
        
        //Creating record
        let xhr = new XMLHttpRequest();
        xhr.open('POST' , `${constant.origin.url}books/add/` );

        xhr.onload=()=>{
            if( xhr.status === 200 ){

                props.hideModal();
                window.location.reload();
            }
        }
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(JSON.stringify(data));

    }


    return (
        <Modal show={props.show} >
        <Modal.Header closeButton onClick={props.hideModal}>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Form name="form" onSubmit={submitForm}>
        <Modal.Body >
            <div className="inp_grp">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                type="text"
                id="title"
                value={data.title}
                onChange={e=>setdata({...data , title:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="author">Author</Form.Label>
            <Form.Control
                type="text"
                id="author"
                value={data.author}
                onChange={e=>setdata({...data , author:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
                type="text"
                id="description"
                value={data.description}
                onChange={e=>setdata({...data , description:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="image_url">Image URL</Form.Label>
            <Form.Control
                type="text"
                id="image_url"
                value={data.image_url}
                onChange={e=>setdata({...data , image_url:e.target.value})}
                name="form"
                required
                placeholder='https://domain.com/img.jpg'
            />
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideModal}>
            Close
          </Button>
          <Button variant="primary" type='submit' >
            Submit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}
const EditBookModel= props=>{

    const [data , setdata] = useState({
        book_id:props.data.book_id,
        title:props.data.title ,
        author:props.data.author,
        description:props.data.description ,
        image_url:props.data.image_url
    })

    const submitForm=e=>{
        e.preventDefault();
        e.stopPropagation();
        
        //Creating record
        let xhr = new XMLHttpRequest();
        xhr.open('POST' , `${constant.origin.url}books/edit/` );

        xhr.onload=()=>{
            if( xhr.status === 200 ){

                props.hideModal();
                window.location.reload();
            }
        }
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(JSON.stringify(data));

    }


    return (
        <Modal show={props.show} >
        <Modal.Header closeButton onClick={props.hideModal}>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Form name="form" onSubmit={submitForm}>
        <Modal.Body >
            <div className="inp_grp">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                type="text"
                id="title"
                value={data.title}
                onChange={e=>setdata({...data , title:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="author">Author</Form.Label>
            <Form.Control
                type="text"
                id="author"
                value={data.author}
                onChange={e=>setdata({...data , author:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
                type="text"
                id="description"
                value={data.description}
                onChange={e=>setdata({...data , description:e.target.value})}
                name="form"
                required
            />
            </div>
            <div className="inp_grp">
            <Form.Label htmlFor="image_url">Image URL</Form.Label>
            <Form.Control
                type="text"
                id="image_url"
                value={data.image_url}
                onChange={e=>setdata({...data , image_url:e.target.value})}
                name="form"
                required
                placeholder='https://domain.com/img.jpg'
            />
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideModal}>
            Close
          </Button>
          <Button variant="primary" type='submit' >
            Submit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}



export default Main;