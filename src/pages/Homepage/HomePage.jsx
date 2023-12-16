import React from "react";
import { NavigationComponent } from "../../components/HomePageComponents";
import { Link } from "react-router-dom";
import "./HomePage.css";
import useState from "react";
import { useDispatch } from "react-redux";
import fire from "../../API/firebase";
import { toast } from "react-toastify";

import Home from "../../assets/team1.png";
import Overview from "../../assets/team2.png";
import F1 from "../../assets/userreg1.png";
import F2 from "../../assets/manage1.png";
import F3 from "../../assets/control1.png";
import F4 from "../../assets/customize1.png";
import F5 from "../../assets/recovery1.png";

const HomePage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection("messages")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <NavigationComponent />
      <div>
        <section className="home" id="home-section">
          <div className="home-text">
            <span>Welcome To</span>
            <h1>FileFolio</h1>
            <h2>
              Discover A Way To Manage Files
              <br />
              Easily As A Team
            </h2>
            <Link to="/register" className="home-btn">
              Get Started
            </Link>
          </div>
          <div className="home-img">
            <img src={Home} alt="FileFolio Team Management" />
          </div>
        </section>
        {/*Overview*/}
        <section className="overview" id="overview-section">
          <div className="heading-overview">
            <span>FileFolio</span>
            <h1>Overview</h1>
            <p>
              FileFolio is a web application that allows users to manage and
              control their files in a dedicated storage space. It supports team
              collaboration by providing equal access to project files,
              fostering productivity. The platform's mission is to empower users
              in efficient file and project management, enhancing work and study
              environments.
            </p>
            <Link to="/register" className="home-btn">
              Get Started
            </Link>
          </div>
          <div className="overview-img">
            <img src={Overview} alt="FileFolio Team Management" />
          </div>
        </section>
        {/*Feautures*/}
        <section className="features" id="features-section">
          <div className="heading-features">
            <span>FileFolio</span>
            <h1>Features</h1>
            <p>Here are some of the features that FileFolio offers: </p>
          </div>
          <div className="features-container">
            <div className="box">
              <div className="box-img">
                <img src={F1} alt="User Registration" />
              </div>
              <h2>User Registration</h2>
              <br />
              <p>
                The user registration feature in the system involves account
                creation through Google email addresses, followed by email
                verification using a confirmation link. Once users click the
                link, they gain access to the platform, ensuring a secure and
                user-friendly registration process.
              </p>
            </div>
            <div className="box">
              <div className="box-img">
                <img src={F2} alt="File Management" />
              </div>
              <h2>File Management</h2>
              <br />
              <p>
                The file management feature offers users a seamless and
                intuitive way to organize and manipulate their digital
                documents, ensuring easy access and efficient organization. It
                enables users to upload, categorize, and modify files with
                user-friendly tools.
              </p>
            </div>
            <div className="box">
              <div className="box-img">
                <img src={F3} alt="Access Control" />
              </div>
              <h2>Access Control</h2>
              <br />
              <p>
                The access control feature empowers administrators to finely
                tune user permissions and access privileges, enhancing security
                and data control. It provides a robust mechanism for managing
                who can view, edit, and share specific resources within the
                system, ensuring data integrity and confidentiality.
              </p>
            </div>
            <div className="box">
              <div className="box-img">
                <img src={F4} alt="Profile Customization" />
              </div>
              <h2>Profile Customization</h2>
              <br />
              <p>
                The profile customization feature allows users to personalize
                their experience within the sysem by tailoring their profiles
                with information and preferences. Users can add details, profile
                pictures, and adjust settings to create a personalized and
                engaging environment that suits their unique needs.
              </p>
            </div>
            <div className="box">
              <div className="box-img">
                <img src={F5} alt="Account Recovery" />
              </div>
              <h2>Account Recovery</h2>
              <br />
              <p>
                The account recovery feature provides a reliable and secure
                process for users to regain access to their accounts in case of
                a forgotten password or other login issues. It typically
                involves email verification or security questions to ensure a
                smooth and hassle-free account retrieval experience.
              </p>
            </div>
          </div>
        </section>
        <section className="contact-us" id="contact-us-section">
          <div className="heading-contact-us">
            <h2>Contact Us</h2>
            <p>
              Feel free to reach out to us if you have any questions or
              suggestions!
            </p>
            <div className="white-box">
              <form autoComplete="off">
                <div className="form-group-name">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group-email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group-message">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="btn btn-dark"
                  type="submit"
                  onClick={handleSendMessage}
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-links">
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-of-service">Terms of Service</a>
              <a href="#our-company">Our-Company</a>
            </div>
            <p className="ending">
              &#169; FileFolio Company All Rights Reserved
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
