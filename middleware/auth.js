const jwt = require('jsonwebtoken');




//set Authentication Middleware
const authenticationMiddleware = async (req,res,next) => {
  //check  header

const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
throw  new  error("Authentication Invalid")
  }

  const  token = authHeader.split(' ')[1];
  try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to  route
    req.user = { userId: payload.userId, name: payload.name }
next()
  } catch (err) {
    throw new error('Authentication Invalid')
  }
}

module.exports =  authenticationMiddleware
