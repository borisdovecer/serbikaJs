const sql = require("./db.js");

const Registration = (registration) => {
    this.firstName = registration.firstName;
    this.lastName = registration.lastName;
    this.parrentName = registration.parrentName;
    this.phone = registration.phone;
    this.email = registration.email;
};

Registration.create = (newRegistration, result) => {
    sql.query("INSERT INTO registration SET ?", newRegistration, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newRegistration });
    });
};

Registration.findById = (id, result) => {
    sql.query(`SELECT * FROM registration WHERE id = ${id}`, (err, res) => {
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

Registration.getAll = result => {
    sql.query("SELECT * FROM registration", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Registration.updateById = (id, registration, result) => {
    sql.query(
        "UPDATE registration SET first_name = ?, last_name = ?, parrent_name = ?, phone = ?, email = ? WHERE id = ?",
        [registration.firstName, registration.lastName, registration.parrentName, registration.phone, registration.email, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, { id: id, ...registration });
        }
    );
};

Registration.remove = (id, result) => {
    sql.query("DELETE FROM registration WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Registration;
