import React from "react";
import styles from './HeroSection.module.css'; // Adjust the path if needed

const HeroSection = () => {
  return (
    
    <div className={styles.introArea}>
      <div className={styles.introContent}>
        <div className={styles.sliderContent}>
          <div className="container">
            <div className="row d-flex flex-wrap align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className={styles.slideAllText}>
                  <div className={`${styles.layer} wow fadeInUp`} data-wow-delay="0.3s">
                    <h1 className={styles.title}>
                      <span className={styles.colorTextBold}>The Polling System for a brighter tomorrow</span> 
                    </h1>
                  </div>
                </div>
              </div>
              <div className={styles.background}>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className={`${styles.slideImages} wow fadeInUp`} data-wow-delay="0.3s">
                  <img src="img/slider/s1.png" alt="Polling System" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
