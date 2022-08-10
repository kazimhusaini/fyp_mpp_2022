const Messages = require("../models/messageModel");
const router = require("express").Router();


router.post("/addmsg/",async (req, res, next) => {
    try {
      const { from, to, message ,Msend} = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
        messageSent:Msend
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  })
router.post("/getmsg/",async (req, res, next) => {
    try {
      const { from, to,Msend ,_id} = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          id:msg._id
        };
        console.log(msg._id);
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  })

  
router.delete("/:id",async (req, res, next) => {
  try {
    const msg = await Messages.findById(req.params.id);
      try {
        await msg.delete();
        res.status(200).json("msg has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
