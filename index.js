const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

//set up middleware
app.engine('handlebars', exphbs({layoutsDir: "views/layouts/"}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.get("/", route.home);

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})