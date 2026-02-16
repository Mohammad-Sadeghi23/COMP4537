require('dotenv').config();

// PatientService class to handle patient related operations
class PatientService {

    constructor(database) {
        this.database = database;
    }

    // function to make sure table exits, if not create it
    async ensurePatientTableExists() {
        const sql = `
            CREATE TABLE IF NOT EXISTS patient (
                patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                dateOfBirth DATETIME NOT NULL)
                ENGINE=InnoDB;
        `;

        await this.database.writerQuery(sql);
    }

    // function to insert patient rows in to patient table
    async insertPatients() {

        // ensure patient table exists
        await this.ensurePatientTableExists();

        // SQL statement to insert a single patinet row
        const insertSql = `
        INSERT INTO patient (name, dateOfBirth)
        VALUES (?, ?)`;

        // table of patients to be inserted
        const patients = [
            ["Sarah Brown", "1901-01-01"],
            ["John Smith", "1941-01-01"],
            ["Jack Ma", "1961-01-30"],
            ["Elon Musk", "1999-01-01"]
        ]

        // loop through patients list and insert each to patinets table
        for (const patient of patients) {
            await this.database.writerQuery(insertSql, patient);
        }

        // return number of patients inserted
        return patients.length;
    }

    // function to check if provided sql is a select only query
    isSelectOnly(sql) {

        const normalized = String(sql || "").trim().toUpperCase();
        if (!normalized.startsWith("SELECT ")) return false;
        return true;
    }

    async runSelectQuery(sql) {

        // check/create table every time we run a query
        await this.ensurePatientTableExists();

        if (!this.isSelectOnly(sql)) {
            const err = new Error("Only SELECT queries are allowed.");
            err.statusCode = 400;
            throw err;
        }

        return await this.database.readerQuery(sql);
    }
}

module.exports = PatientService;