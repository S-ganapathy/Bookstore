const jwt = require("jsonwebtoken");


const key="idiot";

const auth = async (request, response, next) => {
    let token = request.headers.authorization;
    // console.log(token);
    if (!token) return (response.send("no token found"));
    try {
        const verifi = jwt.verify(token, key)
        // console.log(verifi);
        // request.user = verifi;
        next();
    } catch (error) {
        console.log(error)
    }
}


module.exports=auth;
