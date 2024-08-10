import React from 'react';

const Banner = () => {
    return (
        <div className="position-relative">
          <img
            src="./Images/cricket_picture_2.jpg" // Replace with your image source
            alt="Banner"
            className="img-fluid w-100 h-50"
            style={{ height:'500px !important', opacity: 1 }} // Set the opacity of the image
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="container h-100">
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-4 text-white">Cricket Update</h1>
                <p className="lead text-white">Cricket, often hailed as a gentleman's game, is a sport that encapsulates a unique blend of skill, strategy, and passion. Originating in England centuries ago, it has since evolved into a global phenomenon, captivating millions around the world. </p>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Banner;

