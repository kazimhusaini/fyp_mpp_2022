import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import "./contactUs.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
export const ContactUs = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(username);
    const newPost = {
      username,
      email,
      message,
    };
    try {
      const res = await axios.post("/posts/contact", newPost);
      console.log("email sent");
      setOpen(true)
    } catch (err) {
      if (err.response.data) {
        // setEText(err.response.data)
        // setOpen(true)
        console.log(err.response.data);
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <section className="contactHolder">
      {/* {open ? ( */}
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
           This is a success message!
         </Alert>
       </Snackbar>
      {/* ) : null}  */}

      <div id="contact" className="contact">
        <div class="contact-box">
          <div class="contact-links">
            <h2>CONTACT</h2>
            <div class="links">
              <div class="link">
                <a>
                  <img
                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>
              <div class="link">
                <a>
                  <img
                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                    alt="email"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="contact-form-wrapper">
            <form onSubmit={sendEmail}>
              <div class="form-item">
                <input
                  type="text"
                  name="sender"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username:"
                />
              </div>
              <div class="form-item">
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Email:"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-item">
                <textarea
                  class=""
                  name="message"
                  required
                  placeholder="Message:"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button class="submit-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
