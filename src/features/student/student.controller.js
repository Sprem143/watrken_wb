const Student = require('./student.model');
const { generateToken } = require('../auth.jsx');
const { verifyStudent } = require('../auth.jsx');
exports.signin = async (req, res) => {
        const { email, password } = req.body;
        try {
            let student = await Student.findOne({ email });
            if (student) {
                if (password == student.password) {
                    const token = generateToken({ student })
    
                    res.status(200).json({ token: token, student:student });
                } else {
                    res.status(404).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

// ------log out function---------
exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Logged out successfully');
            }
        });
    } catch (err) {
        res.status(201).json({ message: "Error while loging out director" })
    }
}

exports.verifytoken=async(req,res)=>{
    try{
         let token= req.body.token;
         let student= verifyStudent(token);

         res.status(200).json({student})
    }catch{

    }
}