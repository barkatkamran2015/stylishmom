import Image from "next/image";
import styles from "../styles/About.module.css";
import aboutIcon from "../pages/Assets/about1.jpeg"; // Move images to public/assets/

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header1}>
        <h1>Mom Vital Vibes</h1>
      </div>

      <div className={styles.aboutTextTop}>
        <p>
          My name is Fatima Rezaie, and I amm blessed with two amazing children, Yama and Helen, who I love deeply.
          Their love gives me the inspiration and strength I need every day, turning even the hardest days into something beautiful.
        </p>
      </div>

      <div className={styles.aboutMiddleSection}>
        <div className={styles.aboutTextSide}>
          <Image 
            src={aboutIcon} 
            alt="About icon" 
            className={styles.about1Icon} 
            width={400} 
            height={300} 
          />
          <p>
            I do not live far; in fact, I feel close to each and every one of you. One of my lifelong wishes has always been to make positive
            changes in my life, so I can help bring positivity into the lives of others...
          </p>
          <p>
            Some say blogging is dead, that no one reads blogs anymore. But I believe people do read; they just need the right content.
            So here I am, a mother of two, ready to share my life experiences...
          </p>
          <p>
            In this blog, I willl also be sharing the things I do to support my childrens brain and motor development...
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;