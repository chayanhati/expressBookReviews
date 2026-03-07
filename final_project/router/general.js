const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


// Task 6 - Register user
public_users.post("/register",(req,res)=>{

  const username = req.body.username;
  const password = req.body.password;

  if(username && password){

    if(!isValid(username)){

      users.push({username,password});

      return res.status(200).json({
        message:"User successfully registered"
      });

    } else {
      return res.status(404).json({message:"User already exists"});
    }

  }

  return res.status(404).json({message:"Unable to register user"});

});


// Task 1 - Get all books
public_users.get('/',(req,res)=>{
  return res.send(JSON.stringify(books,null,4));
});


// Task 2 - Get by ISBN
public_users.get('/isbn/:isbn',(req,res)=>{

  const isbn = req.params.isbn;

  return res.send(JSON.stringify(books[isbn],null,4));

});


// Task 3 - Get by Author
public_users.get('/author/:author',(req,res)=>{

  const author = req.params.author;

  let filtered_books = Object.values(books)
  .filter(book => book.author === author);

  return res.json(filtered_books);

});


// Task 4 - Get by Title
public_users.get('/title/:title',(req,res)=>{

  const title = req.params.title;

  let filtered_books = Object.values(books)
  .filter(book => book.title === title);

  return res.json(filtered_books);

});


// Task 5 - Get reviews
public_users.get('/review/:isbn',(req,res)=>{

  const isbn = req.params.isbn;

  return res.json(books[isbn].reviews);

});


// Task 10 - Async get all books
public_users.get('/asyncbooks',async(req,res)=>{

  const response = await axios.get("http://localhost:5001/");
  return res.json(response.data);

});


// Task 11 - Async ISBN
public_users.get('/asyncisbn/:isbn',async(req,res)=>{

  const isbn=req.params.isbn;

  const response = await axios.get(`http://localhost:5001/isbn/${isbn}`);
  return res.json(response.data);

});


// Task 12 - Async author
public_users.get('/asyncauthor/:author',async(req,res)=>{

  const author=req.params.author;

  const response = await axios.get(`http://localhost:5001/author/${author}`);
  return res.json(response.data);

});


// Task 13 - Async title
public_users.get('/asynctitle/:title',async(req,res)=>{

  const title=req.params.title;

  const response = await axios.get(`http://localhost:5001/title/${title}`);
  return res.json(response.data);

});


module.exports.general = public_users;