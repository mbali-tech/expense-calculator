const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')


const routes = require('./routes')()


const app = express()

// initialise the database connection
const pgPromise = require('pg-promise')({})
const db = pgPromise({
 connectionString:process.env.DATABASE_URL || 'postgres://postgres:2007121214@localhost:5432/expenses', 
  ssl: {
    rejectUnauthorized: false
 }
})

//set up middleware
app.engine('handlebars', exphbs.engine({layoutsDir: "views/layouts/"}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.get("/", routes.expenses);

const PORT = process.env.PORT || 4080

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})