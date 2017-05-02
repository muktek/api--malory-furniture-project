const Router = require('express').Router;
const axios = require('axios');
const {getIndex, makeProxyRequest} = require('../controllers/indexController');

const indexRouter = Router();


indexRouter.get('/proxy', makeProxyRequest )
indexRouter.get('/', getIndex)

module.exports = indexRouter