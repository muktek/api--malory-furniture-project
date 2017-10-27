const mongoose = require('mongoose')
const chalk = require('chalk')

function establishDbConnection (dbUrl){
	return new Promise(function(resolve, reject){
		mongoose.connect(dbUrl , (err, db)=>{
		  if (err) { reject(err) }
			else { resolve(dbUrl)  }
		})
	})
}

function connectToDB(dbLocation, cb){
      establishDbConnection(dbLocation)
			.then( (x) => {
				console.log(chalk.green(`----  connected to ${x}`))
 				if (typeof cb === 'function') cb()
			})
			.catch( (x) => {console.log(chalk.red(`db connection error: `, x)) })
}

module.exports = connectToDB
