const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, 'MOCK')
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
           next()
        }
        else{
            res.send("Please ENTER cORRECT pASSWORD")
        }  
    }
    else{
        res.send("Please login")
    }
}

module.exports = {auth}