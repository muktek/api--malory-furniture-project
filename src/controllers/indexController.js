const axios = require('axios');

function getIndex (req, res){
	res.json({
    "/api" : "hi"
  }) 
}
 
function makeProxyRequest(req, res) {
	axios.get(`${req.query.api}`).then((serverRes)=>{
		return res.json(serverRes.data).status(200)
	}).catch(()=>{
    return res.json('rats, proxy request failed')
  })
}


module.exports = {
	getIndex,
	makeProxyRequest
}