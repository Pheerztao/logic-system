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
  phone: Joi.string().min(11).max(14).required(),
  email: Joi.string().email({minDomainSegments: 2, tlds:{allow: [`com`,  `net`] } }),
  age: Joi.string().max(3)
})
const { error, value } = schema.validate(req.body);

  if(error != undefined){

    res.status(400).send({
        message: 'validation error'
    })
  }
 res.status(201).send({
        message: 'successful',
        data: req.body
    })

 try {
    connection.query(
  `select * from customers where email='${email}' or phone='${phone}'`,
   (err, results, fields) => {
    if (err) {
       console.log("1: error: ", err)
       throw new Error('Please check back, this is on us.')
 
   }
      
   if (results.length > 0) {
    throw new Error ('The email/Phone exists.', 400)
    }


   //create the customer 
   connection.query(
   `insert into customers(customer_id,firstname, othernames, phone, email)
  values('${uuidv5()}','${firstname}','${othername}','${phone}', '${email}',${age} )`,
        (err, results, fields) => {
         if (err) {
            console.log("2: error: ", err)
      throw new Error("This is on us, pleae try later")
   }

res.status(201).json({
        status:true,
  message: "Account succesfully created",
        data: req.body
    })
     }
);
  })
 }
 catch (e) {

  res.status(400).json({
      message: e.message
  })

}
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