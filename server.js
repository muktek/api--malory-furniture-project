const chalk = require('chalk')
const PROJECT_NAME = require('./src-server/config/projectName.js')

if(typeof PROJECT_NAME !== 'string' ){ 
	require('./src-server/cli/setProjectName.js')
	throw new Error(`\n${chalk.bgRed.bold('There must be a project name exported from :')} ${chalk.grey.bold('./src-server/config/projectName.js')} \n ${chalk.bgWhite.black(' you must execute: ')} ${chalk.cyan.bold('npm run set-project-name')}` ) 
}

const	bodyParser = require('body-parser')
const express = require('express') //import express web server
const cors = require('cors')

const connectToDB = require('./src-server/db/db-connect.js') //connect to db

const indexRouter = require('./src-server/routes/indexRouter.js')
const apiRouter = require('./src-server/routes/apiRouter.js')


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

// ------------------------------
// Wire up the router
// ------------------------------
app.use('/', indexRouter)
app.use('/api', apiRouter)


//---------------------
//EXECUTION SCRIPTS
//---------------------
//Connect to DB
connectToDB(PROJECT_NAME)

//Tell Server to listen @ port-location
app.listen(PORT, function() {
	console.log(chalk.bold.bgGreen(` App listening on http://localhost:${PORT} `))
})
