const mysql = require('mysql2/promise');
require('dotenv').config();
const http = require("http");
const url = require("url");
const STRINGS = require("../lang/en/en.js");

// Databse class to handle all database operations
class Database {

    // constructor to initialize database connection pools for writer and reader 
    constructor(writerConfig, readerConfig) {

        this.writerPool = mysql.createPool(writerConfig);
        this.readerPool = mysql.createPool(readerConfig);
    }

    // function to execute writer queries
    async writerQuery(sql, params = []) {

        // Executes sql query with the provided statement (sql) and parameters (params)
        const [rows] = await this.writerPool.execute(sql, params);

        // returns the result of the query, array of rows for SELECT queries, or result info for INSERT/UPDATE?DELETE queries
        return rows;
    }

    // function to execute reader queries
    async readerQuery(sql, params = []) {

        // Executes sql query with the provided statement (sql) and parameters (params)
        const [rows] = await this.readerPool.execute(sql, params);

        // returns the result of the query, array of rows for SELECT queries, or result info for INSERT/UPDATE?DELETE queries
        return rows;
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

        await this.writerQuery(sql);
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
            await this.writerQuery(insertSql, patient);
        }

        // return number of patients inserted
        return patients.length;
    }
}

// Create a new instance of the Database class with the given configuration
const database = new Database({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_WRITER_USER,
    password: process.env.DB_WRITER_PASS,
    database: process.env.DB_NAME,
}, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_READER_USER,
    password: process.env.DB_READER_PASS,
    database: process.env.DB_NAME,
});


database.insertPatients()
  .then(inserted => console.log("Inserted rows:", inserted))
  .catch(err => console.error(err));
