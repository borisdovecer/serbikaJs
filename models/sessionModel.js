const sql = require("./db.js");

const Session = (session) => {
    this.studenId = session.studenId;
    this.teacherId = session.teacherId;
    this.date = session.date;
    this.time = session.time;
    this.status = session.status;
    this.image = session.image;
    this.lesson = session.lesson;
};

Session.create = (newSession, result) => {
    sql.query("INSERT INTO session SET ?", newSession, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newSession });
    });
};

Session.findById = (id, result) => {
    sql.query(`SELECT * FROM session WHERE id = ${id}`, (err, res) => {
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

Session.getAll = result => {
    sql.query("SELECT * FROM session", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Session.updateById = (id, session, result) => {
    sql.query(
        "UPDATE session SET student_id = ?, teacher_id = ?, date = ?, time = ?, status = ?, image = ?, lesson = ? WHERE id = ?",
        [session.studenId, session.teacherId, session.date, session.time, session.status, session.image, session.lesson, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, { id: id, ...session });
        }
    );
};

Session.remove = (id, result) => {
    sql.query("DELETE FROM session WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Session;
