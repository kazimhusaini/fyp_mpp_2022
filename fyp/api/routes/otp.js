const nodemailer = require("nodemailer");
const router = require("express").Router();
const speakeasy = require("speakeasy");
const User = require("../models/User");
// const app=express();
// view engine setup
// app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
// app.set('view engine','handlebars');
// // body parser middleware
// app.use(bodyparser.urlencoded({extended : false}));
// app.use(bodyparser.json());

// //static folder
// app.use('/public',express.static(path.join(__dirname, 'public')));

router.get("/", function (req, res) {
  res.render("contact");
});

var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
// console.log(otp);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/send", function (req, res) {
  email = req.body.email;
  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("Opt is send to you Email");
  });
});
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const generateOtp = function generateOtp() {
  let token = speakeasy.totp({
    secret: process.env.OTP_KEY,
    encoding: "base32",
    digits: 4,
    step: 60,
    window: 1,
  });
  return token;
};

router.post("/sentOtp", (req, res) => {
  let otpCode = generateOtp();
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: +18587584919,
      to: +923354607405,
      body: `Your OTP Code is ${otpCode} `,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

router.post("/chatMessages", (req, res) => {
 let m=req.body.messages
 let fro=req.body.fro

  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: +18587584919,
      to: +923354607405,
      body: `You have new message in Missing person Portal: ${m} from ${fro} `,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
router.post("/resend", function (req, res) {
  let otpCode = generateOtp();
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: +18587584919,
      to: +923354607405,
      body: `Your OTP Code is ${otpCode} `,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

const verifyOtp = function verifyOtp(token) {
  let expiry = speakeasy.totp.verifyDelta({
    secret: process.env.OTP_KEY,
    encoding: "base32",
    token: token,
    step: 60,
    window: 1,
    digits: 4,
  });
  return expiry;
};
router.post("/verify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let otpCode = req.body.otp;
    let otpexpiry = verifyOtp(otpCode);
    if (otpexpiry) {
      const user = await User.findOne({ _id: id }).exec();
      if (!user) {
        return res.status(404).send({
          message: "User does not  exists",
        });
      }
      // Step 3 - Update user verification status to true
      user.verifiedNumber = true;
      await user.save();
      res.send("Otp Code is verified");
    } else {
      res.send("Your Otp code is expire");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
