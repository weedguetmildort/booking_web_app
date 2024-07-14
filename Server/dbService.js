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

    async getUserById(uid) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE uid = ?"
                connection.query(query, [uid], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return response
        }catch(error) {            
            console.log(error)
        }
    }

    async getUserByAuthId(authid) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE authid = ?"
                connection.query(query, [authid], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return response
        }catch(error) {            
            console.log(error)
        }
    }

    async isPartner(uid) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT (EXISTS(SELECT * FROM ispartner WHERE uid = ?)) as IsPartner"
                connection.query(query, [uid], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return response
        }catch(error) {            
            console.log(error)
        }
    }

    async getPartnerByUid(uid) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "select * from partners where pid = (select pid from ispartner where uid = " +uid+ ")"
                connection.query(query, [uid], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return response
        }catch(error) {            
            console.log(error)
        }
    }

    async insertUser(authID, firstName, lastName, email, zip) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query =
                "INSERT INTO Users (authID, firstname, lastname, email, zip) VALUES('" +
                authID +
                "','" +    
                firstName +
                "','" +
                lastName +
                "','" +
                email +
                "','" +    
                zip +
                "')";
                connection.query(query, [authID, firstName, lastName, email, zip], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return "success : true"
        }catch(error) {            
            console.log(error)
            return "success : false"
        }
    }

    async insertPartner(businessName, category, email, address, city, state, zip) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query =
                "INSERT INTO partners (businessName, category, email, address, city, state, zip) VALUES('" +
                businessName +
                "','" +
                category +
                "','" +
                email +
                "','" +    
                address +
                "','" +
                city +
                "','" +
                state +
                "','" +
                zip +
                "')";
                connection.query(query, [businessName, category, email, address, city, state, zip], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return "success : true"
        }catch(error) {            
            console.log(error)
            return "success : false"
        }
    }

    async makeUserPartner(uid, pid, isAdmin) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query =
                "INSERT INTO isPartner (uid, pid, isAdmin) VALUES('" +
                uid +
                "','" +
                pid +
                "','" +
                isAdmin +
                "')";
                connection.query(query, [uid, pid, isAdmin], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            console.log(response)
            return "success : true"
        }catch(error) {            
            console.log(error)
            return "success : false"
        }
    }


}

module.exports = DbService;



  
