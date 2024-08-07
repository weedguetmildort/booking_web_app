const mysql = require("mysql");
const dotenv = require("dotenv");
const { response } = require("express");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

console.log("db" + connection.state);

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getUserById(uid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * \
                FROM users \
                WHERE uid = ?";
        connection.query(query, [uid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT uid, password, firstname, lastname, zip \
                FROM users \
                WHERE email = ?";
        connection.query(query, [email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getPartnerByEmail(email) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT pid, businessName, category, address, city, state, zip, aboutUs \
                FROM partners \
                WHERE email = ?";
        connection.query(query, [email], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getBusinessByPID(pid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT businessName, category, address, city, state, zip, aboutUs \
                FROM partners \
                WHERE pid = ?";
        connection.query(query, [pid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getPartnerAdmin(uid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT pid, isAdmin \
                FROM ispartner \
                WHERE uid = ?";
        connection.query(query, [uid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async isPartner(uid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT (EXISTS(SELECT * FROM ispartner WHERE uid = ?)) as IsPartner";
        connection.query(query, [uid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getPartnerByUid(uid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * \
                FROM partners \
                WHERE pid = (\
                    SELECT pid \
                    FROM ispartner \
                    WHERE uid = ?)";
        connection.query(query, [uid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertUser(firstName, lastName, email, zip, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO Users (firstname, lastname, email, zip, password) \
                VALUES(?,?,?,?,?)";
        connection.query(
          query,
          [firstName, lastName, email, zip, password],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateUser(uID, firstName, lastName, zip) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE Users \
                SET firstname = ?, lastname = ?, zip = ? \
                WHERE uID = ?";
        connection.query(
          query,
          [firstName, lastName, zip, uID],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updatePassword(uID, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE Users \
          SET password = ? \
          WHERE uID = ?";
        connection.query(query, [password, uID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async insertPartner(
    businessName,
    category,
    email,
    address,
    city,
    state,
    zip,
    aboutUs
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO partners (businessName, category, email, address, city, state, zip, aboutUs) \
                VALUES(?,?,?,?,?,?,?,?)";
        connection.query(
          query,
          [businessName, category, email, address, city, state, zip, aboutUs],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async makeUserPartner(uid, pid, isAdmin) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO isPartner (uid, pid, isAdmin) \
                VALUES(?,?,?)";
        connection.query(query, [uid, pid, isAdmin], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updatePartner(
    pID,
    businessName,
    address,
    city,
    state,
    zip,
    category,
    aboutUs
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE Partners \
                SET businessname = ?, address = ?, city = ?, state = ?, zip = ?, category = ?, aboutUs = ? \
                WHERE pID = ?";
        connection.query(
          query,
          [businessName, address, city, state, zip, category, aboutUs, pID],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  // Search DB for business name or service name

  async getSearchResults(criteria) {
    try {
      var myReplace = "%" + criteria + "%";
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
          SELECT p.pID, p.businessname, p.aboutus, p.address, p.state, p.zip, GROUP_CONCAT(s.name SEPARATOR ', ') AS servicename \
      FROM partners p \
      INNER JOIN services s ON p.pID = s.pID \
      WHERE p.pID IN ( \
              SELECT DISTINCT p1.pID \
              FROM partners p1 \
              LEFT JOIN services s1 ON p1.pID = s1.pID \
              WHERE p1.businessname LIKE ? \
                 OR s1.name LIKE ? \
          ) \
      GROUP BY p.pID, p.businessname, p.aboutus, p.address, p.state, p.zip;";
        connection.query(query, [myReplace, myReplace], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertHours(pID, day, open, close) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO hoursofoperation (pID, day, open, close) \
                VALUES(?, ?, ?, ?)";
        connection.query(query, [pID, day, open, close], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateHours(pID, day, open, close) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE hoursofoperation \
                SET open = ?, close = ? \
                WHERE day = ? AND pid = ?";
        connection.query(query, [open, close, day, pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async getHours(pID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT day, open, close \
                FROM hoursofoperation \
                WHERE pid = ?";
        connection.query(query, [pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertService(pID, name, duration, cost, description) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO services (pID, name, duration, cost, description) \
                VALUES(?, ?, ?, ?, ?)";
        connection.query(
          query,
          [pID, name, duration, cost, description],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateService(sID, name, duration, cost, description) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE services \
                SET name = ?, duration = ?, cost = ?, description = ? \
                WHERE sid = ?";
        connection.query(
          query,
          [name, duration, cost, description, sID],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async getServices(pID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT sid, name, duration, cost, description \
                FROM services \
                WHERE pid = ?";
        connection.query(query, [pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getFutureBookings(pID, startTime) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
                SELECT b.bID, b.starttime, s.duration \
                FROM bookings b \
                JOIN services s ON b.sid = s.sid \
                WHERE b.pid = ? AND status in ('pending', 'approved') AND b.starttime > ?;";
        console.log(query);
        connection.query(query, [pID, startTime], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertBooking(uID, pID, sID, startTime) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO bookings (uID, pID, sID, startTime, status) \
                VALUES(?, ?, ?, ?, 'pending')";
        connection.query(query, [uID, pID, sID, startTime], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateBookingStatus(bID, status) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE bookings \
                SET status = ? \
                WHERE bid = ?";
        connection.query(query, [status, bID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateBookingDiscount(bID, discount) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE bookings \
                SET discount = ? \
                WHERE bid = ?";
        connection.query(query, [discount, bID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async updateBookingTime(bID, startTime) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE bookings \
                SET starttime = ? \
                WHERE bid = ?";
        connection.query(query, [startTime, bID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async getAllBookings(pID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
                SELECT b.bID, b.starttime, s.duration, b.status \
                FROM bookings b \
                JOIN services s ON b.sid = s.sid \
                WHERE b.pid = ?";
        connection.query(query, [pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertUserReview(uID, pID, reviewText, score) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO reviews (uID, pID, reviewText, score) \
                VALUES(?,?,?,?)";
        connection.query(
          query,
          [uID, pID, reviewText, score],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async insertPartnerReviewResponse(uID, pID, responseText) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE reviews \
                SET responseText = ? \
                WHERE uid = ? and pid = ?";
        connection.query(query, [responseText, uID, pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return "success : true";
    } catch (error) {
      console.log(error);
      return "success : false";
    }
  }

  async getPartnerReviews(pID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
                SELECT r.rID, p.businessname, r.score, r.reviewtext, u.firstname, u.lastname, r.addedat r.responsetext, r.responsedate \
                FROM reviews r \
                JOIN users u on r.uid = u.uid \
                JOIN partners p on r.pid = p.pid \
                where r.pid = ?";
        connection.query(query, [pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async canUserAddReview(uID, pID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
                SELECT \
                IF( \
	            (select count(*) from reviews where uid = ? and pid = ?) = 0 \
	            AND \
	            (select count(*) from bookings where uid = ? and pid = ? and status = 'done') > 0, \
	            1, 0) as CanReview;";
        connection.query(query, [uID, pID, uID, pID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async canPartnerAddResponse(rID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "\
                SELECT \
                IF( \
                (select responsetext from reviews where rid = ?) IS NULL, \
                1,0) as CanRespond;";
        connection.query(query, [rID], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
