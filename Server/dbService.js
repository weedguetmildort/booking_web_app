const mysql = require("mysql")
const dotenv = require("dotenv")
const { response } = require("express")
let instance = null
dotenv.config()

  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
})

console.log('db' + connection.state)

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users where userid = "
                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            
        }catch(error) {            
            console.log(error)
        }
    }
}

module.exports = DbService



  
