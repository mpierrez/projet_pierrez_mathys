const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require("../config.js");

module.exports = {
     checkJwt : (req, res, next) => {
    // Get the JWT from the request header.
    const token = req.headers['authorization'];
    let jwtPayload;

    if(!token) {
        res.status(401).type('json').send(JSON.stringify({ message: 'Missing token' }));
        return;
    }
  
    // Validate the token and retrieve its data.
    try {
        // Verify the payload fields
        let jwtBearer = token.split(' ')[1];
        console.log ("Authorization: " + jwtBearer);
        jwtPayload = jwt.verify(jwtBearer, ACCESS_TOKEN_SECRET ,
        {
          complete: true,
          algorithms: ['HS256'],
          clockTolerance: 0,
          ignoreExpiration: false,
          ignoreNotBefore: false
      }
        );
        // Add the payload to the request so controllers may access it.
        req.payload = jwtPayload;
        req.user = jwtPayload.payload;
    } catch (error) {
       console.log (error);
        res.status(401).type('json').send(JSON.stringify({ message: 'Invalid token' }));
        return;
    }
  
    // Pass programmatic flow to the next middleware/controller.
    next();
  }
}