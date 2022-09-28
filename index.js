const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')

const app = express()

// initialise the database connection
const pgPromise = require('pg-promise')({})
const db = pgPromise({
 connectionString:'postgres://hoacyeok:vvxbC49XksekmPLjg9A549CpH-rvqGxR@raja.db.elephantsql.com/hoacyeok', 
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

const expenses = require('./expenses')(db)
const routes = require('./routes')(expenses)

//route
app.get("/", routes.home);
app.post("/expenses", routes.addExpenses);
app.get("/names", routes.uniqueNames);
app.get("/enteredExpenses/:name", routes.getExpenses);

const PORT = process.env.PORT || 4080

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})