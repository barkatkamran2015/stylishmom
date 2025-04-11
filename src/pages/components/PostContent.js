// src/components/PostContent.js
import DOMPurify from 'dompurify';
import styles from '../../styles/AdminDashboard.module.css';

// Check if we're in a Node.js environment (SSR/SSG)
if (typeof window === 'undefined') {
  const { JSDOM } = require('jsdom');
  const window = new JSDOM('').window;
  DOMPurify(window);
}

const PostContent = ({ content, category, tags }) => {
  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a', 'u',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
    ],
    ALLOWED_ATTR: ['src', 'width', 'height', 'alt', 'style', 'class', 'align', 'href', 'target', 'rel'],
  });

  // Parse the sanitized HTML
  let doc;
  if (typeof window === 'undefined') {
    // Use jsdom in Node.js environment
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(sanitizedContent);
    doc = dom.window.document;
  } else {
    // Use DOMParser in the browser
    const parser = new DOMParser();
    doc = parser.parseFromString(sanitizedContent, 'text/html');
  }

  // Adjust img tag styles
  doc.querySelectorAll('img').forEach((img) => {
    const width = img.getAttribute('width') || img.style.width;
    const height = img.getAttribute('height') || img.style.height;
    if (width) img.style.width = width.endsWith('px') ? width : `${width}px`;
    if (height) img.style.height = height.endsWith('px') ? height : `${height}px`;
  });

  return (
    <div>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
      />
      {category && (
        <p className={styles.postMeta}>
          <strong>Category:</strong> {category}
        </p>
      )}
      {tags && Array.isArray(tags) && tags.length > 0 && (
        <p className={styles.postMeta}>
          <strong>Tags:</strong> {tags.join(', ')}
        </p>
      )}
    </div>
  );
};

export default PostContent;