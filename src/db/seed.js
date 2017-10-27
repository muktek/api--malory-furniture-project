const mongoose = require('mongoose');
const chalk = require('chalk');
const connectToDB = require('./db-connect.js')
const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const ProductModel = require('./models/productModel');


let dotEnvPath
switch(process.env.NODE_ENV){
	case 'development':
		dotEnvPath = `${__dirname}/../../variables.dev.env`
		break;

	case 'production':
		dotEnvPath = `${__dirname}/../../variables.prod.env`
		break;

	default:
	  console.log(chalk.red('Node environment must be provided.'));
		process.exit();
}

require('dotenv').config({
	path: dotEnvPath
})



let data = fs.readFileSync(`${__dirname}/seed-data/mf_inventory.csv`, 'utf-8')

let csvData = parse(data, {columns: true})


let dataSet = csvData.map((item)=>{
	 let dbItem = {}
   dbItem.price = parseInt(item.price)
	 dbItem.width = parseInt(item.dimension_w)
	 dbItem.length = parseInt(item.dimension_l)
	 dbItem.height = parseInt(item.dimension_h)
	 dbItem.item = item.item
	 dbItem.condition = item.condition
	 dbItem.description = item.description
	 dbItem.imageLink = `https://mallory-furniture-static.now.sh/product-images/${item.img_name}.jpg`
	 dbItem.onSale = item.on_sale === 'TRUE' ? true : false

	return dbItem
})

//
// if(typeof PROJECT_NAME !== 'string' ){
// 	require('./src-server/cli/setProjectName.js')
// 	throw new Error(`\n${chalk.bgRed.bold('There must be a project name exported from :')} ${chalk.grey.bold('./src-server/config/projectName.js')} \n ${chalk.bgWhite.black(' you must execute: ')} ${chalk.cyan.bold('npm run set-project-name')}` )
// }
//
// let dataSet = [
// 	// {item: "IKEA Sofa", imgLink: 'http://www.ikea.com/us/en/images/products/ektorp-sofa-beige__0386819_PE559167_S4.JPG', price: 45, description: `IKEA Sofa. Good condition. Color: Green. Size: Length 86", Width 38", Height 18" (floor to seat cushion).\nFirst $45.00 takes it!`},
// 	// {item: "freezer", imgLink: 'http://c.shld.net/rpx/i/s/pi/mp/4540/prod_8983379720?src=http%3A%2F%2Fd3d71ba2asa5oz.cloudfront.net%2F60000063%2Fimages%2Fcrf150ss-1_vl1.jpg&d=225b46d8d9dc44092f10507e24db21d5601fc466&hei=245&wid=245&op_sharpen=1&qlt=85', price: 59, description: `Ice cold. Works just fine. Just got a bigger one and no longer need`},
// 	// {item: `15" Saddle trail ride special `, imgLink: 'https://www.outfitterssupply.com/images/CY1661_irontunnel.jpg', price: 400, description: `Was my ex wife's. She loved to ride horses. I need this gone. Pure craftman leather construction, built to last for ages.`}
// 	// {item: `DOG KENNEL`, imgLink: 'https://ak1.ostkcdn.com/images/products/8188057/Midwest-iCrate-Wire-Pet-Crate-91d2975c-fc21-437d-9663-4d7edcfb1e48_600.jpg', price: 22, description: `Dog Kennel, excellent condition. Sturdy. Lightweight to carry. Kennel Cab brand. Measures 48 inches long x 30 inches high x 25 inches wide. $22 cash only.`}
//
// ]

let savedRecordCount = 0
console.log('connecting to db.....', process.env.DATABASE_URL)
connectToDB( process.env.DATABASE_URL, (err, result)=>{
    ProductModel.remove({}, () => {
    dataSet.forEach((dataRecord) => {
  		//   SEED ACTION ON EACH RECORD HERE
  		// 	dataRecord.sold = false

      let record = new ProductModel(dataRecord)
  		record.save((err, savedRecord) => {
  			if (err) console.log(err)
  			console.log('saved: ' + savedRecord._id )
        if(++savedRecordCount === dataSet.length) process.exit()
  		 })
  	})
  })
})
