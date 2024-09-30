import React from "react";
import styles from './footer.module.css'; // Import the CSS file

const Footer = () => {
  const menuList = [
    { name: "Home", link: "/" },
    { name: "Poll", link: "/Poll" },
    { name: "Filter Options", link: "#" },
    { name: "Featured Poll", link: "#" },
  ];
  
  return (
    <footer className={styles.footer1}>  {/* Apply footer1 class */}
      <div className={styles["footer-area"]}> {/* Apply footer-area class */}
        <div className={styles["container"]}>
          <div className={styles["row"]}>
            
            {/* Logo Section */}
            <div className={styles["col-xl-4"]}>
              <div className={styles["footer-context"]}>
                <div className={styles["footer-head"]}>
                  
                  <div className={styles["footer-icons"]}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((social, i) => (
                        <li key={i}>
                          <a href="#">
                            <img src={`img/about/midea${i + 1}.png`} alt={`Social Icon ${i + 1}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className={styles["footer-area-bottom"]}>
              <div className={styles["container"]}>
                <div className={styles["row"]}>
                  <div className={styles["col-xl-6"]}>
                    <div className={styles["copyright"]}>
                      <p>
                        Copyright © 2024 <a href="#">@chalamsanjay</a> All Rights Reserved
                      </p>
                    </div>
                  </div>
                  <div className={styles["col-xl-6"]}>
                    <div className={styles["footer-menu"]}>
                      <ul>
                        {["About", "Terms & Condition", "Privacy"].map((el, i) => (
                          <li key={i}>
                            <a href="#">{el}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* Close the row */}
        </div> {/* Close the container */}
      </div> {/* Close the footer-area */}
    </footer>
  );
};

export default Footer;
