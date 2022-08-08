const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/auth");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    }); 
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

//UPDATE
router.put("/:id", auth,async (req, res) => {



  if (req.user.id === req.params.id || req.user.email) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});


//DELETE
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       try {
//         await Post.deleteMany({ username: user.username });
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json("User has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } catch (err) {
//       res.status(404).json("User not found!");
//     }
//   } else {
//     res.status(401).json("You can delete only your account!");
//   }
// });

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", auth, async (req, res) => {
  if (req.user.id === req.params.id || req.user.email) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});


router.post('/user/addfriend' , (req, res) => {
  if (req.body.requestor && req.body.target) {
      User.findOne({ email: req.body.requestor }, (err, requestor) => {
          // if (err)
          //     res.send(err);
          if (requestor) {
              User.findOne({ email: req.body.target, friends: { $nin: [requestor._id] } }, (err, target) => {
                  // if (err) res.send(err);
                  if (target) {

                      //Add target to requestor's friend list
                      User.findByIdAndUpdate(requestor._id,
                          { "$push": { "friends": target._id } },
                          { "new": true, "upsert": true },
                          (err, user) => {
                              if (err)
                                  res.send(err);
                          });

                      //Add target to requestor's followed list
                      User.findByIdAndUpdate(requestor._id,
                          { "$push": { "followed": target._id } },
                          { "new": true, "upsert": true },
                          (err, user) => {
                              if (err)
                                  res.send(err);
                          });

                      //Add requestor to target's friend list
                      User.findByIdAndUpdate(target._id,
                          { "$push": { "friends": requestor._id } },
                          { "new": true, "upsert": true },
                          (err, user) => {
                              if (err)
                                  res.send(err);
                          });

                      //Add requestor to target's friend list
                      User.findByIdAndUpdate(target._id,
                          { "$push": { "followed": requestor._id } },
                          { "new": true, "upsert": true },
                          (err, user) => {
                              if (err)
                                  res.send(err);
                          });
                          res.status(200).json({
                            success: true
                        });
                  } 
                  else {
                      res.status(404).send("Requester and targeted user are friends already, or targeted user does not exist!");
                  }

               
              });

          } 
          else {
              res.status(404).send("Requested user does not exist!");
          }
      });

  } else {
      res.status(400).send("wrong parameters!");
  }
})

router.post('/user/getfriend' , (req, res) => {
if (req.body.requestor) {
  User.findOne({ email: req.body.requestor }, (err, user) => {
      if (err) res.send(err);
      if (user) {
          User.find({ _id: { $in: user.friends } }).select([
            "email",
            "username",
            "avatarImage",
            "profilePic",
            "_id",
          ])
              .exec((err, friends) => {
                  if (err) res.send(err);
                  if (friends && friends.length > 0) {
                      friends = friends
                      
                      res.json({
                          success: true,
                          friends: friends,
                          count: friends.length
                      });
                  } else {
                      res.status(200).send("Requested user has no friends yet!")
                  }
              });
      } else {
          res.status(404).send("Requested user does not exist")
      }

  });
} else {
  res.status(400).send("wrong parameters!")
}
})
module.exports = router;
