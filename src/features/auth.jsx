const jwt = require('jsonwebtoken');
const SECRET_KEY='school';


// Function to generate JWT
exports.generateToken=(payload) =>{
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Function to verify JWT
exports.verifyToken=(token)=> {
    try {
        console.log(token)
        const decoded = jwt.verify(token, SECRET_KEY);
        if(decoded){
            return true;
        }
    } catch (error) {
        return false 
    };
}

exports.verifyStudent=(token)=> {
    try {
        console.log("verifystudent")
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded)
        if(decoded){
            return decoded;
        }
    } catch (error) {
        return false 
    };
}

