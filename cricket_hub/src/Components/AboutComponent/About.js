// src/About.js
import React from 'react';

const About = () => {
  return (
    <section className="about-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img src="Images/cricket_picture_1.jpeg" alt="About Us" className="img-fluid rounded" />
          </div>
          <div className="col-lg-6">
            <h2>About Us</h2>
            <p className="lead">We are a team of passionate developers...</p>
            <p>
              Our mission is to create amazing web applications that improve
              the lives of our users. With a focus on quality and efficiency,
              we strive to deliver the best possible user experience.
            </p>
            <p>
              Our team has a diverse range of skills and expertise, enabling us
              to tackle a wide variety of projects. Whether it's a simple
              website or a complex web application, we are committed to
              achieving excellence in everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
