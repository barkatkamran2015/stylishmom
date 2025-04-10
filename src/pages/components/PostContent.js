// components/PostContent.js
import DOMPurify from 'dompurify';
import styles from '../../styles/AdminDashboard.module.css';

const PostContent = ({ content, category, tags }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a', 'u',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
    ],
    ALLOWED_ATTR: ['src', 'width', 'height', 'alt', 'style', 'class', 'align', 'href', 'target', 'rel'],
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedContent, 'text/html');

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