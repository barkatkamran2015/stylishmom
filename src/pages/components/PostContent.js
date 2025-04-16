import sanitizeHtml from 'sanitize-html';
import styles from '../../styles/AdminDashboard.module.css';

const PostContent = ({ content, category, tags }) => {
  // Sanitize the HTML content
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [
      'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a', 'u',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'table', 'tr', 'td', 'th', // Add table-related tags
      'iframe', 'script', // For YouTube/Instagram embeds
    ],
    allowedAttributes: {
      img: ['src', 'width', 'height', 'alt', 'style', 'class', 'align'],
      a: ['href', 'target', 'rel'],
      table: ['style', 'class'], // Allow style for table borders
      td: ['style', 'class', 'colspan', 'rowspan'],
      th: ['style', 'class', 'colspan', 'rowspan'],
      iframe: ['src', 'frameborder', 'allowfullscreen', 'style'],
      script: ['src', 'type'],
      blockquote: ['class', 'data-instgrm-permalink', 'data-instgrm-version'],
      '*': ['style', 'class'], // Allow style and class on all tags
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