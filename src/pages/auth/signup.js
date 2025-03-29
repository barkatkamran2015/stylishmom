// pages/auth/signup.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/auth.module.css';

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to SignIn page with a query parameter to show a message
    router.push('/auth/signin?signupDisabled=true');
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.message}>Redirecting to Sign In...</p>
      </div>
    </div>
  );
}