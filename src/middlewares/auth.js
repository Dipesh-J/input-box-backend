const jwt = require('jsonwebtoken');



module.exports = {
    authentication : async (req,res) => {
        try {
            if(!req.headers["x-api-key"])  res.status(400).send({status:false, message:"token must be present inside the header"})

            jwt.verify(req.headers["x-api-key"],"secret",(err,decodedToken)=>{
                if(err){
                    return res.status(401).send({status:false, message:err.message})
                }
                else{
                    req.identity=decodedToken.id
                    next()
                }
            });
        } catch (error) {
            res.statuus(500).json({ status: false, message: error.message})
        }
    },
    authorisation : async (req,res) => {
        try {
            // Nothing to do rightnow
        } catch (error) {
            res.status(500).json({ status: false, message: error.message})
        }
    }
};