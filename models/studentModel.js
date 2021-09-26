const sql = require("./db.js");

const Student = (student) => {
    this.username = student.username;
    this.password = student.password;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.phone = student.phone;
    this.gender = student.gender;
    this.birthDate = student.birthDate;
    this.parentName = student.parentName;
    this.teacherId = student.teacherId;
    this.nextSession = student.nextSession;
    this.lesson = student.lesson;
    this.points = student.points;
    this.trophies = student.trophies;
    this.medals = student.medals;
};

Student.create = (newStudent, result) => {
    sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newStudent });
    });
};

Student.findById = (id, result) => {
    sql.query(`SELECT * FROM student WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Student.getAll = result => {
    sql.query("SELECT * FROM student", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Student.updateById = (id, student, result) => {
    sql.query(
        "UPDATE student " +
        "SET first_name = ?," +
        "last_name = ?, " +
        "email = ?, " +
        "phone = ?, " +
        "gender = ?, " +
        "birth_date = ?, " +
        "parent_name = ?, " +
        "teacher_id = ?, " +
        "next_session = ?, " +
        "lesson = ?, " +
        "points = ?, " +
        "trophies = ?, " +
        "medals = ? " +
        "WHERE id = ?",
        [
            student.firstName,
            student.lastName,
            student.email,
            student.phone,
            student.gender,
            student.birthDate,
            student.parentName,
            student.teacherId,
            student.nextSession,
            student.lesson,
            student.points,
            student.trophies,
            student.medals,
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, { id: id, ...student });
        }
    );
};

Student.remove = (id, result) => {
    sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Student;
