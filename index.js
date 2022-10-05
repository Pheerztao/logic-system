const express = require(`express`)
const app = express()
const mysql = require(`mysql2`); 
const bodyParser = require(`body-parser`)
const port = 7000

app.listen(port, () => {

  console.log(`The server works for login-system: ${port}`)
  
})


app.use(bodyParser.json())