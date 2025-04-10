// src/pages/auth/signin.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../../../lib/firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../styles/auth.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  console.log('Auth object in SignIn:', auth); // Debug log

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!auth) {
      console.error('Auth object is not initialized. Check Firebase configuration.');
      setError('Authentication service is not available. Please try again later.');
      return;
    }
    setLoading(true);
    try {
      console.log('Attempting to sign in with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-in successful, redirecting to dashboard');
      router.push('/dashboard');
    } catch (err) {
      console.error('Sign-in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
      console.log('User signed out successfully');
    } else {
      console.error('Auth is not initialized');
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.message}>
            You are already signed in as {user.email}.
          </p>
          <p className={styles.message}>
            To sign in with a different account, please{' '}
            <Link href="/auth/signin" onClick={handleSignOut} className={styles.link}>
              sign out
            </Link>{' '}
            first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSignIn} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.buttonLoading : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In' : 'Sign In'}
          </button>
        </form>
        <p className={styles.message}>
          Don’t have an account?{' '}
          <Link href="/auth/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}