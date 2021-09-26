const sql = require("./db.js");

const Teacher = (teacher) => {
    this.username = teacher.username;
    this.firstName = teacher.firstName;
    this.lastName = teacher.lastName;
};

Teacher.create = (newTeacher, result) => {
    sql.query("INSERT INTO teacher SET ?", newTeacher, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newTeacher });
    });
};

Teacher.findById = (id, result) => {
    sql.query(`SELECT * FROM teacher WHERE id = ${id}`, (err, res) => {
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

Teacher.getAll = result => {
    sql.query("SELECT * FROM teacher", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Teacher.updateById = (id, teacher, result) => {
    sql.query(
        "UPDATE teacher SET first_name = ?, last_name = ? WHERE id = ?",
        [teacher.firstName, teacher.lastName, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, { id: id, ...teacher });
        }
    );
};

Teacher.remove = (id, result) => {
    sql.query("DELETE FROM teacher WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Teacher;
