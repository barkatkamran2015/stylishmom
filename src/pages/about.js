import Image from "next/image";
import styles from "../styles/About.module.css";
import aboutIcon from "../pages/Assets/aboutme.jpg"; // Ensure this path is correct
import { motion } from "framer-motion";

const About = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className={styles.title}>Mom Vital Vibes</h1>
        <motion.div
          className={styles.titleUnderline}
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Intro Text */}
        <motion.p className={styles.intro} variants={itemVariants}>
          I’m Fatima Rezaie, a proud mother to Yama and Helen—my endless sources of love and inspiration. Their joy fuels my days, turning every challenge into a masterpiece of resilience and beauty.
        </motion.p>

        {/* Image and Text Section */}
        <div className={styles.grid}>
          <motion.div className={styles.imageContainer} variants={imageVariants}>
            <Image
              src={aboutIcon}
              alt="Fatima Rezaie"
              className={styles.profileImage}
              width={450}
              height={350}
              priority
            />
            <div className={styles.imageGlow}></div>
          </motion.div>

          <motion.div className={styles.textContainer} variants={containerVariants}>
            <motion.p variants={itemVariants}>
              I’m not far away—I’m right here, connected to you through shared dreams and positivity. My lifelong passion is to transform my life and radiate that light to others.
            </motion.p>
            <motion.p variants={itemVariants}>
              Blogging isn’t dead—it’s alive with the right voice. As a mom of two, I’m here to share my journey, weaving stories that resonate and inspire.
            </motion.p>
            <motion.p variants={itemVariants}>
              Join me as I explore nurturing my children’s minds and movements, blending love with intention in every step.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;