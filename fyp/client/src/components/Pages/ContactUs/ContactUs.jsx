import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React, { useState } from "react";
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
  return (
    <section className="contactHolder">
      {open ? (
        <Collapse
          in={open}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50vw",
            margin: "0 auto",
          }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Message is sent successfull
          </Alert>
        </Collapse>
      ) : null}

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
                <label>Email:</label>
              </div>
              <div class="form-item">
                <textarea
                  class=""
                  name="message"
                  required
                  placeholder="Message:"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label>Message:</label>
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
