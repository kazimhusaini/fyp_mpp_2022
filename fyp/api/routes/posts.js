const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const nodemailer = require("nodemailer");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(
  "/missingFilter/:firstname?/:lastname?/:city?/:missingAge?/:missingDate?/:ageType?/:gender?",
  async (req, resp) => {
    const firstname = req.params.firstname;
    const lastname = req.params.lastname;
    const city = req.params.city;
    const missingAge = req.params.missingAge;
    const missingDate = req.params.missingDate;
    const ageType = req.params.ageType;
    const gender = req.params.gender;

    let data = await Post.find({
      $or: [
        { firstname },
        { lastname },
        { city },
        { missingAge },
        { missingDate },
        { ageType },
        { gender },
      ],
    });
    resp.send(data);
  }
);

// router.get("/missingFilterr/:firstname?/:lastname?", async (req, res) => {
//   const firstname = req.params.firstname;
//   const lastname = req.params.lastname;

//   try {
//     const singleData = await Post.find({ $or: [{ firstname }, { lastname }] });
//     res.send(singleData);
//   } catch (err) {
//     res.send(err);
//   }
// });
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/contact", async (req, res) => {
  // Check we have an email
  const { email, username, message } = req.body;
  if (!(email && username && message)) {
    res.status(400).send("All input is required");
  }
  if (!email) {
    return res.status(422).send("Email is Missing");
  }
  if (!username) {
    return res.status(422).send("Username is Missing");
  }
  if (!message) {
    return res.status(422).send("message is Missing");
  }
  try {
    transporter.sendMail({
      to: process.env.EMAIL_USERNAME,
      from: email,
      // Subject of Email
      subject: "Contact Message",
      html: `
      <p style="font-weight: bolder;">Use rname: ${username}</p>
      <p style="font-weight: bolder;">Email: ${email}</p>
      <p style="font-weight: bolder;">Message: ${message}</p>
  `,
      // attachments: [{
      //   filename: 'logo.png',
      //   path: 'static/images/logo.png',
      //   cid: 'ii_kl91tsw01'
      // }]
    });
    return res.status(201).send(`Sent a messgae  to `);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/sentToMail", async (req, res) => {
  // Check we have an email
  const { emailTo, username, message, fromEmail } = req.body;
  // if (!(email && username && message)) {
  //   res.status(400).send("All input is required");
  // }
  // if (!email) {
  //   return res.status(422).send("Email is Missing");
  // }
  // if (!username) {
  //   return res.status(422).send("Username is Missing");
  // }
  // if (!message) {
  //   return res.status(422).send("message is Missing");
  // }
  var executed = false;
  if (!executed) {
    executed = true;
    console.log(fromEmail, emailTo);
    res.on("result", async (ev) => {
      const status = await compute.status(
        { startTime: 0, endTime: Date.now() },
        keystore
      );

      console.log("status:", status);
    });
    try {
      transporter.sendMail({
        to: emailTo,
        from: fromEmail,
        // Subject of Email
        subject: "Contact Message",
        html: `
      <p style="font-weight: bolder;">Username: ${username}</p>
      <p style="font-weight: bolder;">Email: ${fromEmail}</p>
      <p style="font-weight: bolder;">Message: ${message}</p>
  `,
        // attachments: [{
        //   filename: 'logo.png',
        //   path: 'static/images/logo.png',
        //   cid: 'ii_kl91tsw01'
        // }]
      });
      return res.status(201).send(`Sent a messgae  to `);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

module.exports = router;
