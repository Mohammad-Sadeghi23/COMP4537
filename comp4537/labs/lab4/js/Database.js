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
}

module.exports = Database;
