require(`dotenv`).config();
const express = require(`express`)
const app = express()
const Joi = require(`joi`);
const mysql = require(`mysql2`); 
const bodyParser = require(`body-parser`);
//const Connection = require("mysql2/typings/mysql/lib/Connection");
const port = 7000

app.listen(port, () => {

  console.log(`The server works for login-system: ${port}`)
  
})


app.use(bodyParser.json())

const connection = mysql.createConnection({
 host : process.env.DATABASE_HOST,
 user: process.env.DATABASE_USER,
 port : process.env.DATABASE_PORT,
 password: process.env.DATABASE_PASSWORD,
 database : process.env.DATABASE_NAME
});

connection.connect()

app.post(`/create`, (req,res) => {
 const firstname = req.body.firstname
 const lastname = req.body.lastname
 const phone = req.body.phone
 const email = req.body.email
 const age = req.body.age
 
 const schema = Joi.object({
  firstname: Joi.string().min(4).max(30),
  surnmame:  Joi.string().min(4).max(30).required(),
  phone: Joi.string().min(11).max(14).requires(),
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow: [`com`,  `net`] } }),
  age: Joi.string().min(1).max(3)
})
const { error, value } = schema.validate(req.body);

  if(error != "undefined"){

    res.status(400).send({
        message: 'validation error'
    })
  }

if()
})



//  if(!firstname||!lastname||!phone||!email||!age){
//   res.status(400).send({
//   message : `please fill the fields`
//   })   
// } else{
//  res.status(201).send({
//    message: `User information accepted, Welcome User ${data.lastname}, ${data.firstname}`
// })
// }
//