const chalk = require('chalk')

let dotEnvPath
switch(process.env.NODE_ENV){
	case 'development':
		dotEnvPath = `${__dirname}/variables.dev.env`
		break;

	case 'production':
		dotEnvPath = `${__dirname}/variables.prod.env`
		break;

	default:	
	  console.log(chalk.red('Node environment must be provided.'));
		process.exit();
}

require('dotenv').config({
	path: dotEnvPath
})

const	bodyParser = require('body-parser')
const express = require('express') //import express web server
const cors = require('cors')

const connectToDB = require('./src/db/db-connect.js') //connect to db

const indexRouter = require('./src/routes/indexRouter.js')
const apiRouter = require('./src/routes/apiRouter.js')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// =========
// RUN APP
// =========
const app = express()

//configure bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// set port if exists in environment for heroku or live site, else set to 3000 for dev
const PORT = process.env.PORT || 3000
app.set('port', PORT)
app.use(express.static(`${__dirname}/public`));

// ------------------------------
// Wire up the router
// ------------------------------

app.get('/', (req, res)=>{
  res.json({
		"docs" : "https://mallory-furniture-admin.now.sh/docs/",
		"api" : "https://mallory-furniture-admin.now.sh/api/v1/"
	})
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, {}, `.swagger-ui .topbar {background: #000;} .topbar a {visibility: hidden;}`, null, 'Mallory Furniture ApI'));
app.use('/api/v1', apiRouter)


//---------------------
//EXECUTION SCRIPTS
//---------------------
//Connect to DB
console.log(process.env)
connectToDB(process.env.DATABASE_URL)

//Tell Server to listen @ port-location
app.listen(PORT, function() {
	console.log(chalk.bold.bgGreen(` App listening on http://localhost:${PORT} `))
})
