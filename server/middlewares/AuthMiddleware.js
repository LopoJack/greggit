const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error: "User not logged in..."});
    }

    try{
        const validToken = verify(accessToken, "X7B78W94jySYsPg6");  //verify the accessToken with the importantsecret encoding key
        req.user = validToken;

        if(validToken) {
            return next();      //if token is valid, return to and continue with the request
        }
    }catch(err){
        return res.json({error: err});      //if token is not valid, return json object with the error err
    }
};

module.exports = {validateToken};