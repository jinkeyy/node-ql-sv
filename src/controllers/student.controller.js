const Student = require("../models/student.model")
exports.create = async (reqs, res) => {
    const { body } = reqs
    if (!body.code) return res.status(400).json({ 'msg': 'mã không được để trống' })
    if (!body.name) return res.status(400).json({ 'msg': 'tên không được để trống' })
    const newStudent = new Student(body);
    try {
        const student = await newStudent.save()
        res.json(student);
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.list = async (reqs, res) => {
    try {
        const students = await Student.find().lean()
        res.json(students)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.read = async (req, res) => {
    res.json(req.student)
}
exports.studentId = (req, res, next, id) => {
    const student = Student.findById(id)
    student.exec(function (err, student) {
        if (err) return next("Lỗi")
        if (!student) return next(new Error('Failed to load student ' + id))
        req.student = student
        next()
    })
}
exports.update = async (reqs, res) => {
    let { student, body } = reqs
    if (!body.code) return res.status(400).json({ 'msg': 'mã không được để trống' })
    if (!body.name) return res.status(400).json({ 'msg': 'tên không được để trống' })
    try {
        await Student.findByIdAndUpdate(student._id, body, { new: true, runValidators: true })
        res.json({ "msg": "done" })
    } catch (error) {
        res.status(400).send(error)
    }
}
exports.delete = async (reqs, res) => {
    let { student } = reqs
    try {
        await Student.findOneAndRemove({ "_id": student._id });
        res.json({ "msg": "done" })
    } catch (err) {
        res.status(400).json(err)
    }
}
exports.search = async (reqs, res) => {
    let key = reqs.query.key
    try {
        const students = await Student.find({ name: { $regex: key } })
        res.json(students)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.searchScore = async (reqs, res) => {
    let min = reqs.query.min
    let max = reqs.query.max
    try {
        const students = await Student.find({ score: { $gte: min, $lte: max } })
        res.json(students)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.finalYearStudents = async (reqs, res) => {
    try {
        const students = await Student.find({
            dob: {
                $gte: ("2000-01-01T00:00:00.000Z"),
                $lt: ("2001-01-01T00:00:00.000Z"),
            }
        })
        res.json(students)
    } catch (err) {
        res.status(400).send(err)
    }
}