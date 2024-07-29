require("dotenv").config({ path: "../.env" });
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const {
  generateToken,
  verifyToken,
  checkToken,
  generateState,
  validateState,
} = require("../middlewares/stateValidation");
const CryptoJS = require("crypto-js");

// Encrypter
const encryptPassword = (password) => {
  const secretkey = process.env.REACT_DB_SECRET_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    secretkey
  ).toString();
  return encryptedPassword;
};

// Decrypter
const decryptPassword = (encryptedPassword) => {
  const secretkey = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const router = express.Router();

// Signup
router.post("/api/user-signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username, zipCode } =
      req.body;

    const decryptedPassword = decryptPassword(password);
    const encryptedPassword = encryptPassword(decryptedPassword);

    // Create new user object
    const newUser = {
      username,
      encryptedPassword,
      firstName,
      lastName,
      email,
      isPartner: "0",
      zipCode,
    };

    // Save user to the database via another POST request
    const response = await axios.post(
      "http://localhost:5002/db/api/insertuser",
      newUser
    );

    if (response.status === 201) {
      const savedUser = response.data;

      // Generate a token for the new user
      const token = generateToken(savedUser);

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: savedUser.id,
          email: savedUser.email,
        },
      });
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login
router.post("/api/user-login", async (req, res) => {
  // Simulating user login
  const { username, password } = req.body;

  const decryptedPassword = decryptPassword(password);
  const encryptedPassword = encryptPassword(decryptedPassword);

  try {
    // Make an axios call to get user data by username
    const response = await axios.post(
      "http://localhost:5002/db/api/getUserByUsername",
      { username }
    );

    if (!response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = response.data.data[0];
    const storedPassword = user.password;

    // Compare the provided password with the stored password
    // const passwordMatch = await bcrypt.compare(
    //   encryptedPassword,
    //   storedPassword
    // );
    if (encryptedPassword === storedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const currUser = {
      id: user.uid,
      username: user.username,
      role: "user",
      firstname: user.firstname,
      lastname: user.lastname,
      zip: user.zip,
    };

    // Generate a JWT token
    const token = generateToken(currUser);

    // Return the user data and token
    res.json({
      user: currUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }

  // console.log(response.data);

  // if (response.data) {
  //   const { uID, username, password } = response.data;
  //   console.log(password);
  //   console.log(encryptedPassword);
  //   if (password === encryptedPassword) {
  //     console.log("3");
  //     const currUser = {
  //       username,
  //       uID,
  //     };

  //     const token = generateToken(currUser);
  //     return res.json({ token, currUser });
  //   }
  // } else {
  //   console.error("Invalid login response");
  //   // Handle invalid login response (e.g., show an error message)
  // }

  // console.log(response.data);

  // res.status(401).json({ message: "Invalid credentials" });

  // if (response.status === 200) {
  //   const savedInfo = response.data;

  //   console.log(response);
  //   res.status(201).json({
  //     message: "Success",
  //   });

  // Generate a token for the new user
  // const token = generateToken(savedUser);

  // res.status(201).json({
  //   message: "User created successfully",
  //   token,
  //   user: {
  //     id: savedUser.id,
  //     email: savedUser.email,
  //   },
  // });
  // } else {
  //   res.status(response.status).json(response.data);
  // }
  // } catch (error) {
  //   console.error("Error during signup:", error);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
});

// Check user token
router.post("/api/check-token", checkToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// Provide customer information
router.get("/api/user-profile", verifyToken("user"), (req, res) => {
  return res.json({ token, user });
});

// Update customer information
router.put("/api/user-profile", verifyToken("user"), (req, res) => {
  const userId = req.user.id;
  const { email, firstName, lastName } = req.body;

  // Update user information in the database
  User.findByIdAndUpdate(
    userId,
    { email, firstName, lastName },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).send(err);
      res.json(user);
    }
  );
});

// Scope examples from previous implementation
router.get(
  "/api/private-scoped",
  verifyToken,
  requiredScopes("read:messages"),
  (req, res) => {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// router.get("/login", generateState, (req, res) => {
//   const authUrl =
//     `https://${process.env.AUTH0_DOMAIN}/authorize?` +
//     querystring.stringify({
//       response_type: "code",
//       client_id: process.env.AUTH0_CLIENT_ID,
//       connection: process.env.AUTH0_CONNECTION,
//       redirect_uri: process.env.AUTH0_CALLBACK_URL,
//       scope: "openid profile email",
//       state: req.state, // Use the generated state
//     });

//   res.redirect(authUrl);
// });

// router.get("/callback", validateState, async (req, res) => {
//   const { code } = req.query;

//   try {
//     const tokenResponse = await axios.post(
//       `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
//       {
//         grant_type: "authorization_code",
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         code: code,
//         redirect_uri: process.env.AUTH0_CALLBACK_URL,
//       }
//     );

//     const { access_token } = tokenResponse.data;

//     const userResponse = await axios.get(
//       `https://${process.env.AUTH0_DOMAIN}/userinfo`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     const user = userResponse.data;

//     // Save user information in session or database, then redirect
//     // req.session.user = user; // if using session
//     res.json(user); // For now, just return the user information
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Authentication failed");
//   }
// });

// Used for sure calls

// NEW API CALLS
// Sign Up -- Might move to modular auth file after testing
// router.post("/signup", async (req, res) => {
//   const {
//     client_id,
//     email,
//     password,
//     connection,
//     username,
//     given_name,
//     family_name,
//     name,
//     nickname,
//     picture,
//     user_metadata,
//   } = req.body;

//   try {
//     const response = await axios.post(
//       `https://dev-o5ogeizt5ue5oi0r.us.auth0.com/dbconnections/signup`,
//       {
//         client_id: client_id,
//         email: email,
//         password: password,
//         connection: connection,
//         username: username,
//         given_name: given_name,
//         family_name: family_name,
//         name: name,
//         nickname: nickname,
//         picture: picture,
//         user_metadata: user_metadata,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({
//       message: "User successfully signed up!",
//       data: response.data,
//     });
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       res.status(error.response.status).json({
//         message: "Error signing up user",
//         error: error.response.data,
//       });
//     } else if (error.request) {
//       // The request was made but no response was received
//       res.status(500).json({
//         message: "No response received from the server",
//         error: error.message,
//       });
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       res.status(500).json({
//         message: "Error in setting up the request",
//         error: error.message,
//       });
//     }
//   }
// });

// router.post("/quick-login", async (req, res) => {
//   const { email, password } = req.body;
//   const decryptedPassword = decryptPassword(password);

//   // const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     const response = await axios.post(
//       `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
//       {
//         grant_type: "password",
//         username: email,
//         password: decryptedPassword,
//         audience: process.env.AUTH0_AUDIENCE,
//         scope: "openid profile email",
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         connection: process.env.AUTH0_CONNECTION,
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//     res.status(500).json({ error: "Failed to authenticate" });
//   }
// });

// // Routes for Insomnia
// router.post("/insomnia-quick-login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     const response = await axios.post(
//       `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
//       {
//         grant_type: "password",
//         username: email,
//         password: password,
//         audience: process.env.AUTH0_AUDIENCE,
//         scope: "read",
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         connection: process.env.AUTH0_CONNECTION,
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//     res.status(500).json({ error: "Failed to authenticate" });
//   }
// });

// router.get("/insomnia-quick-login", async (req, res) => {
//   const { email, password } = req.body;
//   const decryptedPassword = decryptPassword(password);

//   // const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     const response = await axios.post(
//       `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
//       {
//         grant_type: "password",
//         username: email,
//         password: decryptedPassword,
//         audience: process.env.AUTH0_AUDIENCE,
//         scope: "read:messages",
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         connection: process.env.AUTH0_CONNECTION,
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//     res.status(500).json({ error: "Failed to authenticate" });
//   }
// });

module.exports = router;

//   try {
//     const response = await axios.post(
//       `http://localhost:5002/api/post/insertuser`,
//       {
//         email: email,
//         password: values.encryptedPassword,
//         username: user_name,
//         firstname: first_name,
//         lastname: last_name,
//         zip: zip_code,
//         isPartner: "0",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({
//       message: "User successfully signed up!",
//       data: response.data,
//     });
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       res.status(error.response.status).json({
//         message: "Error signing up user",
//         error: error.response.data,
//       });
//     } else if (error.request) {
//       // The request was made but no response was received
//       res.status(500).json({
//         message: "No response received from the server",
//         error: error.message,
//       });
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       res.status(500).json({
//         message: "Error in setting up the request",
//         error: error.message,
//       });
//     }
//   }
