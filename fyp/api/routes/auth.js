const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/auth");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const _ = require('lodash')
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});



router.post("/register", async (req, res) => {
  // Check we have an email
  const { email, password, username, cnic,  number } = req.body;
    if (!email) {
      return res.status(422).send("Please Enter Email");
    }
    if (!password) {
      return res.status(422).send("Please Enter Password");
    }
    if (!username) {
      return res.status(422).send("Please Enter Username");
    }
    if (!cnic) {
      return res.status(422).send("Please Enter Cnic");
    }
    if (!number) {
      return res.status(422).send("Please Enter Mobile Number");
    }
  

  try {
    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).send("Email is already in use.");
    }
    const existingCnic = await User.findOne({ cnic }).exec();
    if (existingCnic) {
      return res.status(409).send("Cnic is already in use.");
    }
    const existingNum = await User.findOne({ cnic }).exec();
    if (existingNum) {
      return res.status(409).send("Number is already in use.");
    }
    
    // Step 1 - Create and save the user
    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      _id: new mongoose.Types.ObjectId,
      username: username,
      cnic: cnic,
      email: email,
      number:number,
      password: encryptedUserPassword,
    }).save();
    const token1 = user.generateVerificationToken();

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      "mySecretKey",
      {
        expiresIn: "5h",
      }
    );
    
    // save user token
    user.token = token;
    // return new user
    // res.status(201).json(user);

    // Step 2 - Generate a verification token with the user's ID
    //   const token = user.generateVerificationToken();
    // Step 3 - Email the user a unique verification link
    transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USERNAME,
      // Subject of Email
      subject: 'Email Verification',
      text: `Hi ! There, You have recently visited 
       our website and entered your email.
       Please follow the given link to verify your email
       http://localhost:5000/api/auth/verify_email/${token1} 
       Thanks`

    })
    return res.status(201).send(`Sent a verification email to ${email}`);
  } catch (err) {
    return res.status(500).send(err);
  }
});



router.post("/login",async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    if (!email) {
      return res.status(422).send({
        message: "Missing email."
      });
    }
    // Validate if user exist in our database

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send("User does not exists");
    }
    // Step 2 - Ensure the account has been verified
    if (!user.verified) {
      return res.status(403).send("Verify your Account.");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "mySecretKey",
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);

      // user
      // return res.status(200).json(user);

      return res.status(200).send({
        message: "User logged in",
        user
      });
    }
    return res.status(400).send("Invalid Credentials");
  }
  catch (err) {

  }
  // Our login logic ends here
});


router.post('/dash', auth, (req, res) => {
  res.status(200).send("Welcome to mpp 🙌 ");
});



router.get('/verify/:token', (req, res) => {
  const { token } = req.params;

  // Verifing the JWT token 
  jwt.verify(token, 'ourSecretKey', function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("Email verification failed,possibly the link is invalid or expired");
    }
    else {
      res.send("Email verifified successfully");
    }
  });
});


router.get('/verify_email/:id', async (req, res) => {
  const { id } = req.params
  // Check we have an id
  if (!id) {
    try {
      return res.status(422).send({
        message: "Missing Token",
      });
    }         
    catch (err) {
      return res.status(404).send({
        message: "err",
      });
    }

  }
  // Step 1 -  Verify the token from the URL
  let payload = null
  try {
    payload = jwt.verify(
      id,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
  } catch (err) {
    return res.status(500).send(err);
  }
  try {
    // Step 2 - Find user with matching ID
    const user = await User.findOne({ _id: payload.ID }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not  exists"
      });
    }
    // Step 3 - Update user verification status to true
    user.verified = true;
    await user.save();
    return res.redirect('http://localhost:3000/verificationConfirmation');

  } catch (err) {
    return res.status(500).send(err);
  }
})

router.put('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try{
  User.findOne({ email }, (err, user) => {

    if (err || !user) {
      return res.status(400).json({ error: "user with  this email already exists." })
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
    transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USERNAME,
      // Subject of Email
      subject: 'Email Verification',
      text: `Hi ! There, You have recently visited 
     our website and entered your email.
     Please reset your password
     http://localhost:3000/passwordreset/${token} 
     Thanks`

    })

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: "reset password link error." })
      }
      else {
        return res.status(201).json({ message: "reset password link sent  to your email" })

      }
    })
  })
}
catch(err){
  if (err) {
    return res.status(400).json({ error: "Email is not valid" })
  }
}
})

router.put('/reset_password', async (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
      if (err) {
        return res.status.json({
          error: "Incorrect token or it is expired"
        })
      }
      User.findOne({ resetLink },async (err, user) => {
        if (err || !user) {
          return res.status(400).json({ error: "User with this token not exist." })

        }
        encryptedUserResetPassword = await bcrypt.hash(newPass, 10);
        const obj = {
          password: encryptedUserResetPassword,
          resetLink:''
        }
        user = _.extend(user, obj);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: "reset password  error." })

          }
          else {
            return res.status(201).json({ message: "Your password hasbeen changed" })

          }
        })
      })
    })
  }
  else {
    return res.status(400).json({ error: "Authentication error !!!" })

  }
})

router.post("/setavatar/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }})

  router.post("/allusers/:id",  async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "profilePic",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  })

  // router.get("/allusers/",  async (req, res, next) => {
  //   try {
  //     const users = await User.find({ friends: { $ne: req.body.friends } }).select([
  //       "email",
  //       "username",
  //       "avatarImage",
  //       "_id",
  //     ]);
  //     return res.json(users);
  //   } catch (ex) {
  //     next(ex);
  //   }
  // })
module.exports = router;
