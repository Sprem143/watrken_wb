const Director = require('./director.model');
const Student = require('../student/student.model');
const Supplier = require('../supplier/model')
const Attendence = require('../student/studentAttendence.model')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'school';

require('dotenv').config();

const verifyToken = async(token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded) {
            return true;
        }
    } catch (error) {
        return false
    };
}

exports.generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Function to verify JWT
exports.verifytoken = (req, res) => {
        exports.verifytoken = async(req, res) => {
            let token = req.body.token;
            let result = verifyToken(token);
            res.status(200).send(result);
        }
    }
    // ---------set attendance-------------

exports.setattendance = async(req, res) => {
    try {
        const { email, yearmonth, date } = req.body;
        let student = await Student.findOne({ email });
        let arr = student.attendance;

        var status = "";
        var re = false;

        if (arr.length == 1) {
            // -----first time attendance----------
            let attendance = [yearmonth, [date]]
            await Student.findOneAndUpdate({ "email": email }, {
                $push: { attendance: attendance },
            }, { returnNewDocument: true })
            status = "First attendance inserted"
        } else {
            // if year and month exist--------------

            for (let i = 1; i < arr.length; i++) {
                console.log(i)
                if (arr[i][0].toUpperCase() === yearmonth.toUpperCase()) {
                    if (arr[i][1].includes(date)) {
                        status = "Attendance already submitted"
                        break;
                    } else {
                        arr[i][1].push(date);
                        let filter = { email: email };
                        let update = { attendance: arr }
                        re = await Student.findOneAndUpdate(filter, update);
                        status = "Attendence submitted";
                        break;
                    }
                } else if (i == arr.length - 1 && re == false) {

                    let attendance = [yearmonth, [date]]
                    await Student.findOneAndUpdate({ "email": email }, {
                        $push: { attendance: attendance },
                    }, { returnNewDocument: true })
                    status = "new month created"
                }
            }
        }
        res.json({ message: status })
    } catch (err) {
        res.status(201).json({ message: "Internal Error" })
    }
}

// ----get total present student
exports.noofpresentstudent = async(req, res) => {
    try {
        const { date } = req.body;
        let result = await Attendence.where({ dateNow: date }).find();
        let tresult = await Supplier.find();
        const r = { s: result, t: tresult };
        res.status(200).json(r);
    } catch (err) {
        res.status(201).json({ message: "Internal error while fetching data" });
    }
}

exports.attendence = async(req, res) => {
    try {
        let { pStudent, attendenceClass, dateNow, totalStudent } = req.body;
        const attendence = new Attendence({ pStudent, attendenceClass, dateNow, totalStudent });
        const result = await attendence.save();
        if (result) {
            console.log(result)
            res.status(200).json({ message: `Attendence saved successfully for date ${dateNow}` })
        } else {
            res.status(201).json({ message: "Error while saving attendance" })
        }
    } catch (err) {
        console.log(err)
        res.status(201).json({ message: "Internal error" });
    }
}

exports.signup = async(req, res) => {
        try {
            const director = new Director(req.body);
            await director.save();
            res.status(200).send("register successfully");
        } catch (err) {
            console.log(err)
            res.status(201).json({ message: "Error while signing up director" })
        }
    }
    // --------director sign in --------

exports.signin = async(req, res) => {
    const { mobile, password } = req.body;
    try {
        const director = await Director.findOne({ mobile: mobile });
        console.log(director)
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        if (director.password != password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = generateToken({ id: director._id });
        res.status(200).json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ---------add a student ----------
exports.addstudent = async(req, res) => {
        try {
            const newStudent = new Student(req.body);
            await newStudent.save();
            res.status(200).json({ message: "Student added successfully" })

        } catch (err) {
            console.log(err)
            res.status(201).json({ message: "Error while adding student" })
        }
    }
    // --------add teacher------------
exports.addteacher = async(req, res) => {
        try {
            const newTeacher = new Supplier(req.body);
            await newTeacher.save();
            res.status(200).json({ message: "Supplieradded successfully", status: 200 })
        } catch (err) {
            res.status(201).json({ message: "Error while adding supplier" });
        }
    }
    // ----- log out ------------
exports.logout = async(req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Logged out successfully');
            }
        });
    } catch (err) {
        res.status(201).json({ message: "Error while loging out director" })
    }
}

// ------------ get all student list---------

exports.getallstudents = async(req, res) => {
    try {
        let students = await Student.find();
        res.status(200).json(students)
    } catch (err) {
        res.status(201).json({ message: "Error while getting student list" })

    }
}
exports.getallteachers = async(req, res) => {
    try {
        let teacher = await Supplier.find();
        res.status(200).json(teacher)
    } catch (err) {
        res.status(201).json({ message: "Error while getting student list" })

    }
}

// ----------------get one student----------
exports.getonestudent = async(req, res) => {
    const email = req.body.email;
    try {
        let student = await Student.findOne({ email });
        res.status(200).json(student)
    } catch (err) {
        res.status(201).json({ message: "Error while getting student details" })
    }
}

exports.getclassstudent = async(req, res) => {
    try {
        const { cls } = req.body;
        const result = await Student.where({ standard: cls }).find();
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: "Internal server error" })
    }
}

exports.getattendance = async(req, res) => {
    try {
        const { clas } = req.body;
        const result = await Attendence.findOne({ attendenceClass: clas });
        res.status(200).json(result.pStudent)
    } catch (err) {

    }

}

exports.getoneteacher = async(req, res) => {
    const email = req.body.email;
    try {
        let teacher = await Supplier.findOne({ email });
        res.status(200).json(teacher)
    } catch (err) {
        res.status(201).json({ message: "Error while getting teacher details" })
    }
}

// --------search a teacher----------
exports.searchteacher = async(req, res) => {
    let st = req.body.st;
    if (!st) {
        return res.status(400).json({ message: 'Please enter teacher\'s name' });
    }
    try {
        let teachers = await Supplier.find({
            username: {
                $regex: st,
                $options: 'i'
            }
        })

        if (teachers.length === 0) {
            return res.status(404).json({ message: 'No teacher found' });
        }
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.searchstudent = async(req, res) => {
    let ss = req.body.ss;
    if (!ss) {
        return res.status(400).json({ message: 'Please enter Student\'s name' });
    }
    try {
        let students = await Student.find({
            username: {
                $regex: ss,
                $options: 'i'
            }
        })
        if (students.length === 0) {
            return res.status(404).json({ message: 'No Student found' });
        }
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ----------remove a student------
exports.removestudent = async(req, res) => {
    const email = req.body.email;
    try {
        const status = await Student.deleteOne({ email: email });
        if (status) { res.status(200).json({ message: "Student removed successfully" }) }

    } catch (err) {
        res.status(201).json({ message: "Error while removing student" })
    }
}

//--------remove a teacher---------
exports.removeteacher = async(req, res) => {
    try {
        let teacher = await Supplier.findOne(req.body);
        if (!teacher) {
            return res.status(404).send("Supplier not found");
        }
        await Supplier.deleteOne(teacher);
        res.status(200).send("Supplier removed successfully");

    } catch (err) {
        res.status(201).json({ message: "Error while removing Supplier" })
    }
}


exports.updatestudent = async(req, res) => {
    let { Email, stdName, stdEmail, stdMobile, stdDob, stdFatherName, stdClass, stdGender, stdAddress } = req.body;
    let student = await Student.findOne({ email: Email });
    if (!stdName) { stdName = student.username };
    if (!stdEmail) { stdEmail = student.email };
    if (!stdMobile) { stdMobile = student.mobile };
    if (!stdDob) { stdDob = student.dob };
    if (!stdFatherName) { stdFatherName = student.fatherName };
    if (!stdClass) { stdClass = student.standard }
    if (!stdGender) { stdGender = student.gender }
    if (!stdAddress) { stdAddress = student.address }

    const filter = { email: Email };
    const update = { username: stdName, email: stdEmail, mobile: stdMobile, dob: stdDob, fatherName: stdFatherName, gender: stdGender, address: stdAddress, standard: stdClass };
    try {
        await Student.findOneAndUpdate(filter, update);
    } catch (err) {
        res.status(404).json({ message: "Not found student" });
    }
}

exports.updateteacher = async(req, res) => {
    let { Email, tName, tEmail, tMobile, tFatherName, tSubject, tGender, tAddress, tSalary } = req.body;
    let student = await Supplier.findOne({ email: Email });
    if (!tName) { tName = student.username };
    if (!tEmail) { tEmail = student.email };
    if (!tMobile) { tMobile = student.mobile };
    if (!tSalary) { tSalary = student.dob };
    if (!tFatherName) { tFatherName = student.fatherName };
    if (!tSubject) { tSubject = student.standard }
    if (!tGender) { tGender = student.gender }
    if (!tAddress) { tAddress = student.address }

    const filter = { email: Email };
    const update = { username: tName, email: tEmail, mobile: tMobile, salary: tSalary, fatherName: tFatherName, gender: tGender, address: tAddress, subject: tSubject };
    try {
        await Supplier.findOneAndUpdate(filter, update);
    } catch (err) {
        res.status(404).json({ message: "Not found Supplier" });
    }
}