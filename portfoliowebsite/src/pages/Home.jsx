import React from "react";
import "../styles/Home.css";
import ProfileImage from "../assets/images/monkey.jpg"; // ide rakd a képed

function Home() {
  return (
    <section className="home">
      <div className="home-container">
        
        {/* LEFT – IMAGE */}
        <div className="home-image">
          <img src={ProfileImage} alt="Home" />
        </div>

        {/* RIGHT – TEXT */}
        <div className="home-content">
          <h1>Benedek Pintér</h1>
          <div className="home-cards">
            <div className="home-card">
              <h3>ChatGPT???</h3>
              <p>
                My #1 friend! With the power of our friendship we can develop at
                a high speed
              </p>
            </div>

            <div className="home-card">
              <h3>Experience</h3>
              <p>
                I am currently completing my BSc in Business Informatics and
                plan to pursue a Master’s degree in Computer Science too deepen
                my understanding in programming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
