const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const shortid = require('shortid');
const Schema = mongoose.Schema;


// ----------------------
// DATA TABLE
// ----------------------
const itemSchema = new Schema({
  // example of optional fields
  _id: {
    type: String,
    'default' : shortid.generate
  },
  item:       { type: String, required: true, trim: true },
  price:       { type: Number, required: true },
  imageLink:     { type: String, required: true },
  length:       { type: Number, required: true },
  width:        { type: Number, required: true },
  height:       { type: Number, required: true },
  condition: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [/^(average|good|excellent)$/, 'Only values are: average, good, excellent']
  },
  onSale: {
     type: Boolean, required: true
  }

})


module.exports = createModel('Product', itemSchema)
