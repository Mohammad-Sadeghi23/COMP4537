require("dotenv").config();

const Database = require("./Database");
const PatientService = require("./PatientService");
const ApiServer = require("./ApiServer");

const writerConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_WRITER_USER,
  password: process.env.DB_WRITER_PASS,
  database: process.env.DB_NAME,
};

const readerConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_READER_USER,
  password: process.env.DB_READER_PASS,
  database: process.env.DB_NAME,
};

const database = new Database(writerConfig, readerConfig);
const patientService = new PatientService(database);

const apiServer = new ApiServer(patientService, {
  allowedOrigin: process.env.SERVER1_ORIGIN,
  port: Number(process.env.PORT) || 8000,
});

apiServer.start();
