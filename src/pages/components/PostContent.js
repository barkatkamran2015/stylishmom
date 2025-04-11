// src/components/PostContent.js
import sanitizeHtml from 'sanitize-html';
import styles from '../../styles/AdminDashboard.module.css';

const PostContent = ({ content, category, tags }) => {
  // Sanitize the HTML content
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [
      'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a', 'u',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
    ],
    allowedAttributes: {
      img: ['src', 'width', 'height', 'alt', 'style', 'class', 'align'],
      a: ['href', 'target', 'rel'],
      '*': ['style', 'class'],
    },
  });

  return (
    <div>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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
