const studentController = require("../controllers/student.controller")
module.exports = function (app) {
    app.
        route('/student')
        .get(studentController.list)
        .post(studentController.create)

    app
        .route('/student/:studentId')
        .get(studentController.read)
        .put( studentController.update)
        .delete(studentController.delete)

    app.route("/search/student").get(studentController.search)
    app.route("/search/score/student").get(studentController.searchScore)
    app.route("/search/year/student").get(studentController.finalYearStudents)
    app.param('studentId', studentController.studentId)
}
