import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: "mysql",
//         logging: false
//     }
// )

// mysql://db_user:db_password@db_host:db_port/db_name
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

export const sequelize = new Sequelize(
    `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, 
    { 
        logging: false, 
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)