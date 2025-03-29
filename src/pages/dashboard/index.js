import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../styles/AdminDashboard.module.css';
import 'react-quill/dist/quill.snow.css';

// Use dynamic API URL based on environment
const API_URL = 'https://www.barkatkamran.com/api.php';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// PostContent Component (updated to display category and tags)
const PostContent = ({ content, category, tags }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a',
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

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null,
    imageUrl: '',
    backgroundColor: '#ffffff',
    titleStyle: { color: '#000000', fontSize: '24px', textAlign: 'center' },
    category: '',
    tags: [],
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [selectedPage, setSelectedPage] = useState('Blog');
  const [pagination, setPagination] = useState({ limit: 10, offset: 0, total: 0, totalPages: 0 });
  const [quillModules, setQuillModules] = useState({
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ 'size': ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': ['', 'center', 'right', 'justify'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ 'direction': 'rtl' }],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  });
  const quillRef = useRef(null);
  const editorContainerRef = useRef(null);

  // Handle auth state properly to prevent redirect on refresh
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, authLoading, router]);

  // Quill Setup - Enhanced with more features
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const Quill = ReactQuill.Quill;
    if (!Quill) {
      console.error('Quill is not available');
      return;
    }

    const Size = Quill.import('formats/size');
    Size.whitelist = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'];
    Quill.register(Size, true);

    const Font = Quill.import('formats/font');
    Font.whitelist = [
      'sans-serif', 'serif', 'monospace', 'roboto', 'open-sans', 'lato', 'slabo', 'oswald', 'montserrat',
      'source-sans-pro', 'arial', 'times-new-roman', 'courier-new', 'comic-sans-ms', 'georgia', 'helvetica',
      'verdana', 'calibri', 'garamond', 'tahoma', 'impact', 'trebuchet-ms', 'lucida-console', 'palatino',
      'dancing-script', 'poppins', 'playfair-display', 'nunito', 'merriweather', 'ubuntu', 'playpen-sans',
      'right-grotesk-wide', 'playwrite-deutschland-grundschrift', 'inter', 'raleway', 'fira-sans',
      'pt-serif', 'lobster', 'quicksand', 'bitter', 'cabin', 'noto-sans', 'inconsolata', 'crimson-text',
    ];
    Quill.register(Font, true);

    setQuillModules((prevModules) => ({
      ...prevModules,
      toolbar: {
        container: [
          [{ 'font': Font.whitelist }],
          [{ 'size': Size.whitelist }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': ['', 'center', 'right', 'justify'] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          [{ 'direction': 'rtl' }],
          ['clean'],
        ],
      },
    }));

    import('quill-image-resize')
      .then(({ ImageResize }) => {
        if (!Quill.imports['modules/imageResize']) {
          Quill.register('modules/imageResize', ImageResize);
        }
        setQuillModules((prevModules) => ({
          ...prevModules,
          imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
        }));
        console.log('ImageResize module loaded successfully');
      })
      .catch((err) => {
        console.error('Failed to load quill-image-resize:', err);
      });
  }, []);

  const fetchPosts = useCallback(async (offset = 0) => {
    if (!user) return;
  
    setIsLoading(true);
    try {
      const idToken = await user.getIdToken();
      const url = `${API_URL}?page=${encodeURIComponent(selectedPage)}&limit=${pagination.limit}&offset=${offset}`;
      console.log('Fetching posts from:', url);
  
      let response;
      try {
        response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
      } catch (fetchError) {
        console.error('Fetch error details:', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Is the API server running at ${API_URL}?`);
      }
  
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage;
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || `HTTP error ${response.status}`;
          } catch (jsonError) {
            // If JSON parsing fails, fall back to reading the response as text
            console.error('Failed to parse error response as JSON:', jsonError);
            const text = await response.text();
            errorMessage = `HTTP error ${response.status}: ${text.length > 100 ? text.substring(0, 100) + '...' : text}`;
          }
        } else {
          const text = await response.text();
          errorMessage = `HTTP error ${response.status}: ${text.length > 100 ? text.substring(0, 100) + '...' : text}`;
        }
        throw new Error(`Failed to fetch posts: ${errorMessage}`);
      }
  
      const data = await response.json();
      if (!data.posts || !data.pagination) {
        throw new Error('Invalid response format: Missing posts or pagination data');
      }
  
      const postsWithPage = data.posts.map((post) => ({
        ...post,
        page: selectedPage,
        tags: post.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) : [],
      }));
      console.log('Fetched Posts:', postsWithPage);
      setPosts(postsWithPage);
      setAllPosts(postsWithPage);
      setPagination((prev) => ({
        ...prev,
        offset,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message);
      setPosts([]);
      setAllPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPage, user, pagination.limit]);

  useEffect(() => {
    fetchPosts(0);
  }, [fetchPosts, selectedPage]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('User not authenticated. Please sign in.');
      }
  
      const idToken = await user.getIdToken();
      const formData = new FormData();
      formData.append('image', file);
  
      // Ensure the required fields are included
      formData.append('id', newPost.id || '');  // Add default value if undefined
      formData.append('title', newPost.title || '');  // Add default value if undefined
      formData.append('content', newPost.content || '');  // Add default value if undefined
      formData.append('creator_uid', newPost.creator_uid || '');  // Add default value if undefined
  
      // Upload the image
      const imageResponse = await fetch(`${API_URL}?page=${selectedPage}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });
  
      if (!imageResponse.ok) {
        const errorData = await imageResponse.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
  
      const imageData = await imageResponse.json();
      const imageUrl = imageData.imageUrl;
  
      // Update the newPost state with the image URL
      setNewPost((prev) => ({
        ...prev,
        imageUrl,
      }));
  
      setError(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const persistImageDimensions = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    doc.querySelectorAll('img').forEach((img) => {
      const width = img.style.width || img.getAttribute('width');
      const height = img.style.height || img.getAttribute('height');
      if (width) img.style.width = width.endsWith('px') ? width : `${width}px`;
      if (height) img.style.height = height.endsWith('px') ? height : `${height}px`;
      if (width) img.setAttribute('width', width.replace('px', ''));
      if (height) img.setAttribute('height', height.replace('px', ''));
    });

    return doc.body.innerHTML;
  };

  const handleCreatePost = async () => {
    if (!user) {
      setError('User not authenticated. Please sign in.');
      return;
    }
  
    // Validate required fields
    if (!newPost.title.trim()) {
      setError('Title is required.');
      return;
    }
  
    if (!newPost.content.trim()) {
      setError('Content is required.');
      return;
    }
  
    if (!selectedPage) {
      setError('Page is required.');
      return;
    }
  
    const trimmedCategory = newPost.category ? newPost.category.trim() : '';
    if (trimmedCategory.length > 50) {
      setError('Category must be 50 characters or less.');
      return;
    }
  
    let processedTags = newPost.tags || [];
    if (!Array.isArray(processedTags)) {
      setError('Tags must be an array of strings.');
      return;
    }
    processedTags = processedTags
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .slice(0, 5);
    if (processedTags.some((tag) => tag.length > 30)) {
      setError('Each tag must be 30 characters or less.');
      return;
    }
  
    const trimmedImageURL = newPost.imageUrl ? newPost.imageUrl.trim() : '';
    if (trimmedImageURL) {
      const isValidExternalURL = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(trimmedImageURL);
      const isValidRelativeURL = /^\/uploads\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(trimmedImageURL);
      if (!isValidExternalURL && !isValidRelativeURL) {
        setError('Image URL must be a valid URL ending in .jpg, .jpeg, .png, .gif, or .webp, or a relative path like /uploads/image.jpg');
        return;
      }
    }
  
    const trimmedBackgroundColor = newPost.backgroundColor ? newPost.backgroundColor.trim() : '#ffffff';
    if (!/^#[0-9A-F]{6}$/i.test(trimmedBackgroundColor)) {
      setError('Background color must be a valid hex color (e.g., #ffffff).');
      return;
    }
  
    const validateTitleStyle = (style) => {
      const validColors = /^#[0-9A-F]{6}$/i;
      const validFontSizes = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'];
      const validTextAligns = ['left', 'center', 'right', 'justify'];
  
      return {
        color: validColors.test(style.color) ? style.color : '#000000',
        fontSize: validFontSizes.includes(style.fontSize) ? style.fontSize : '24px',
        textAlign: validTextAligns.includes(style.textAlign) ? style.textAlign : 'center',
      };
    };
  
    setIsLoading(true);
    try {
      const idToken = await user.getIdToken();
      const validatedStyle = validateTitleStyle(newPost.titleStyle);
      const processedContent = persistImageDimensions(newPost.content);
      const sanitizedContent = DOMPurify.sanitize(processedContent, {
        ALLOWED_TAGS: [
          'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
          'blockquote', 'code', 'pre',
        ],
        ALLOWED_ATTR: ['src', 'width', 'height', 'alt', 'style', 'class', 'align', 'href', 'target', 'rel'],
      });
  
      const formData = new FormData();
      formData.append('id', editMode ? currentPostId : `post_${Date.now()}`);
      formData.append('title', newPost.title.trim());
      formData.append('content', sanitizedContent);
      formData.append('imageUrl', trimmedImageURL);
      formData.append('backgroundColor', trimmedBackgroundColor);
      formData.append('titleStyle', JSON.stringify(validatedStyle));
      formData.append('creator_uid', user.uid);
      formData.append('category', trimmedCategory);
      formData.append('tags', JSON.stringify(processedTags));
      formData.append('page', selectedPage);
      if (editMode) {
        formData.append('method', 'UPDATE_POST');
        formData.append('postId', currentPostId);
      } else {
        formData.append('method', 'CREATE_POST');
      }
  
      const endpoint = `${API_URL}`;
      console.log('Submitting to endpoint:', endpoint);
      console.log('Form Data:', Object.fromEntries(formData.entries()));
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });
  
      const responseText = await response.text();
      console.log('API Raw Response:', responseText);
      console.log('API Response Status:', response.status);
  
      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          console.error('API Error Response:', errorData);
          throw new Error(
            errorData.error && typeof errorData.error === 'string'
              ? errorData.error
              : `Failed to ${editMode ? 'update' : 'create'} post: ${JSON.stringify(errorData)}`
          );
        } catch (jsonError) {
          throw new Error(`Failed to ${editMode ? 'update' : 'create'} post: Invalid JSON response - ${responseText}`);
        }
      }
  
      const responseData = JSON.parse(responseText);
      console.log('API Success Response:', responseData);
  
      setSuccessMessage(
        responseData.message || (editMode ? 'Post updated successfully!' : 'Post created successfully!')
      );
  
      // Reset the form and refresh posts
      setNewPost({
        title: '',
        content: '',
        image: null,
        imageUrl: '',
        backgroundColor: '#ffffff',
        titleStyle: { color: '#000000', fontSize: '24px', textAlign: 'center' },
        category: '',
        tags: [],
      });
      setEditMode(false);
      setCurrentPostId(null);
      fetchPosts(0);
      setError(null);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} post:`, error);
      setError(`Failed to ${editMode ? 'update' : 'create'} post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (postId, page) => {
    if (!user) {
      setError('You must be signed in to delete a post.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setIsLoading(true);
      const idToken = await user.getIdToken();
      const response = await fetch(`${API_URL}?page=${encodeURIComponent(page)}&id=${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message || 'Post deleted successfully!');
      fetchPosts(pagination.offset);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post) => {
    setNewPost({
      title: post.title,
      content: persistImageDimensions(post.content),
      image: null,
      imageUrl: post.imageUrl || '',
      backgroundColor: post.backgroundColor || '#ffffff',
      titleStyle: post.titleStyle || { color: '#000000', fontSize: '24px', textAlign: 'center' },
      category: post.category || '',
      tags: post.tags || [],
    });
    setSelectedPage(post.page || 'Blog');
    setEditMode(true);
    setCurrentPostId(post.id);
    editorContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        (post.content && post.content.toLowerCase().includes(lowerCaseQuery)) ||
        (post.category && post.category.toLowerCase().includes(lowerCaseQuery)) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)))
    );
    setPosts(filteredPosts);
  };

  const applyTheme = (themeColor) => {
    setNewPost((prev) => ({ ...prev, backgroundColor: themeColor }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setNewPost((prev) => ({ ...prev, tags: tagsArray }));
  };

  if (authLoading) {
    return (
      <div className={styles.adminDashboard}>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.adminDashboard}>
        <p>Redirecting to Sign In...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminDashboard}>
      <Head>
        <title>Admin Dashboard | The Stylish Mama</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <h2 className={styles.title}>Admin Dashboard</h2>

      {isLoading && <div className={styles.loadingSpinner}>Loading...</div>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search posts by title, content, category, or tags"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className={styles.searchInput}
        />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }} className={styles.postForm} ref={editorContainerRef}>
        <div className={styles.formGroup}>
          <label htmlFor="post-title" className={styles.formLabel}>Post Title:</label>
          <input
            type="text"
            id="post-title"
            placeholder="Enter post title"
            value={newPost.title}
            onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
            className={styles.titleInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.formLabel}>Category:</label>
          <input
            type="text"
            id="category"
            placeholder="e.g., Main Course"
            value={newPost.category}
            onChange={(e) => setNewPost((prev) => ({ ...prev, category: e.target.value }))}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags" className={styles.formLabel}>Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            placeholder="e.g., healthy, quick"
            value={newPost.tags.join(', ')}
            onChange={handleTagsChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Upload Featured Image (or enter URL below):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.imageUpload}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image-url" className={styles.formLabel}>Or Enter Image URL:</label>
          <input
            type="text"
            id="image-url"
            placeholder="e.g., https://example.com/image.jpg"
            value={newPost.imageUrl}
            onChange={(e) => setNewPost((prev) => ({ ...prev, imageUrl: e.target.value }))}
            className={styles.inputField}
          />
        </div>

        {newPost.imageUrl && (
          <div className={styles.imagePreview}>
            <img
              src={
                newPost.imageUrl.startsWith('http')
                  ? newPost.imageUrl
                  : `https://www.barkatkamran.com${newPost.imageUrl}`
              }
              alt="Uploaded or Entered"
              className={styles.uploadedImage}
              onError={() => setNewPost((prev) => ({ ...prev, imageUrl: '' }))}
            />
          </div>
        )}

        <div className={styles.editorContainer} style={{ backgroundColor: newPost.backgroundColor }}>
          <label htmlFor="rich-editor" className={styles.formLabel}>Write Content:</label>
          <ReactQuill
            ref={quillRef}
            value={newPost.content}
            onChange={(value) => setNewPost((prev) => ({ ...prev, content: value }))}
            theme="snow"
            modules={quillModules}
            className={styles.quillEditor}
            style={{ backgroundColor: newPost.backgroundColor }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title-color" className={styles.formLabel}>Title Color:</label>
          <input
            type="color"
            id="title-color"
            value={newPost.titleStyle.color || '#000000'}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                titleStyle: { ...prev.titleStyle, color: e.target.value },
              }))
            }
            className={styles.colorPicker}
          />

          <label htmlFor="title-size" className={styles.formLabel}>Title Font Size:</label>
          <select
            id="title-size"
            value={newPost.titleStyle.fontSize || '24px'}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                titleStyle: { ...prev.titleStyle, fontSize: e.target.value },
              }))
            }
            className={styles.sizeSelect}
          >
            {['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <label htmlFor="title-position" className={styles.formLabel}>Title Alignment:</label>
          <select
            id="title-position"
            value={newPost.titleStyle.textAlign || 'center'}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                titleStyle: { ...prev.titleStyle, textAlign: e.target.value },
              }))
            }
            className={styles.positionSelect}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="page-select" className={styles.formLabel}>Select Page:</label>
          <select
            id="page-select"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className={styles.pageSelect}
          >
            <option value="Blog">Blog</option>
            <option value="ProductsReview">Products Review</option>
            <option value="Recipe">Food</option>
            <option value="Drinks">Drinks</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="theme-select" className={styles.formLabel}>Select Background Theme:</label>
          <select
            id="theme-select"
            onChange={(e) => applyTheme(e.target.value)}
            className={styles.pageSelect}
          >
            <option value="#ffffff">Default</option>
            <option value="#e0f7fa">Blue</option>
            <option value="#e8f5e9">Green</option>
            <option value="#eceff1">Gray</option>
            <option value="#006a7a">Blue-Green Cyan</option>
            <option value="#6568a6">Slate Blue</option>
            <option value="#c299c0">Pastel Lavender</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {editMode ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      <div className={styles.postsList}>
        <h3>Recent Posts for {selectedPage}</h3>
        {posts.length === 0 ? (
          <p>No posts available for {selectedPage}</p>
        ) : (
          <>
            {posts.map((post) => (
              <div
                key={post.id}
                className={styles.postItem}
                style={{
                  backgroundColor: post.backgroundColor || '#ffffff',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <h4
                  className={styles.postTitle}
                  style={{
                    color: post.titleStyle?.color || '#000',
                    fontSize: post.titleStyle?.fontSize || '24px',
                    textAlign: post.titleStyle?.textAlign || 'center',
                  }}
                >
                  {post.title}
                </h4>

                <PostContent content={post.content} category={post.category} tags={post.tags} />

                {post.imageUrl && (
                  <img
                    src={
                      post.imageUrl.startsWith('http')
                        ? post.imageUrl
                        : `https://www.barkatkamran.com${post.imageUrl}`
                    }
                    alt={post.title}
                    className={styles.postImage}
                    onError={(e) => {
                      e.target.src = '/default-image.jpg';
                      e.target.onerror = null;
                    }}
                  />
                )}

                <p className={styles.postMeta}>
                  <strong>Page:</strong> {post.page}
                </p>

                {post.createdAt && (
                  <p className={styles.postMeta}>
                    <strong>Created At:</strong>{" "}
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                {post.views !== undefined && (
                  <p className={styles.postMeta}>
                    <strong>Views:</strong> {post.views}
                  </p>
                )}

                <div className={styles.postActions}>
                  <button onClick={() => handleEdit(post)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(post.id, post.page)} className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}

            <div className={styles.pagination}>
              {pagination.offset > 0 && (
                <button
                  onClick={() => fetchPosts(pagination.offset - pagination.limit)}
                  className={styles.paginationLink}
                >
                  Previous
                </button>
              )}
              {pagination.offset + pagination.limit < pagination.total && (
                <button
                  onClick={() => fetchPosts(pagination.offset + pagination.limit)}
                  className={styles.paginationLink}
                >
                  Next
                </button>
              )}
              <p>
                Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}