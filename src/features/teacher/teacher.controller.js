const Student = require('../student/student.model')
const Teacher = require('../teacher/teacher.model')
const jwt = require('jsonwebtoken');
// const secret_key='school';
exports.signup = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json(req.body);
    } catch (err) {
        res.status(201).json({ message: "Error while signing up student" })
    }
}
// -----------sign in teacher-----------
exports.setCookie=async(email,auth)=>{
    try{
        const filter = { email: email };
    const update = { cookie: auth };
    await Teacher.findOneAndUpdate(filter, update);
    }catch(err){
        console.log(err);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (teacher) {
            if (password == teacher.password) {
                const token = jwt.sign({ teacher }, secret_key, { expiresIn: "2h" })
                // set cookie----------
                const filter = { email: email };
                const update = { cookie: token };
               await Teacher.findOneAndUpdate(filter, update);
               const r=await Teacher.findOne({email});
                    res.status(200).json(r)
                    console.log(r.cookie)
            } else {
                res.status(404).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: "Teacher not found" })
        }
    } catch (err) {
        res.status(201).json({ message: "Error while loging in director" })
    }
   
}

// ---------get all student---------
exports.getallstudents = async (req, res) => {
    try {
        let students = await Student.find();
        res.status(200).json({ students: students })
    } catch (err) {
        res.status(201).json({ message: "Error while getting student list" })

    }
}

// ----------------get one student----------
exports.getonestudent = async (req, res) => {
    try {
        let student = await Student.findOne(req.body);
        res.status(200).json({ student: student })
    } catch (err) {
        res.status(201).json({ message: "Error while getting student details" })

    }
}

// ----------add student for teacher--------
exports.addstudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(200).json({ message: "Student added successfully" })

    } catch (err) {
        res.status(201).json({ message: "Error while adding student" })
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