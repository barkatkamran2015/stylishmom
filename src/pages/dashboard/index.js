import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../../context/AuthContext';
import styles from '../../styles/AdminDashboard.module.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { useTipTapExtensions } from '../_app';
import PostContent from '../components/PostContent';
import EditorToolbar from '../components/EditorToolbar';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Embed from '../../extensions/Embed';
import CustomParagraph from '../../extensions/Paragraph'; // Import the custom paragraph extension

// Dynamically import DOMPurify to ensure it only runs on the client side
const loadDOMPurify = async () => {
  const DOMPurifyModule = await import('dompurify');
  return DOMPurifyModule.default;
};

// Use dynamic API URL based on environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/posts';
const PHP_API_URL = 'https://www.barkatkamran.com/api.php';

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
  const [domPurifyInstance, setDomPurifyInstance] = useState(null);
  const editorContainerRef = useRef(null);
  const imageInputRef = useRef(null);

  // State for the link dialog
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const { extensions: baseExtensions } = useTipTapExtensions();

  // Extend the base extensions with Table, Embed, and CustomParagraph
  const extensions = [
    ...baseExtensions.map(ext => {
      // Disable the default Paragraph extension from StarterKit
      if (ext.name === 'paragraph') {
        return null;
      }
      if (ext.name === 'starterKit') {
        return ext.configure({
          paragraph: false, // Disable default Paragraph
        });
      }
      return ext;
    }).filter(ext => ext !== null), // Remove null entries
    CustomParagraph, // Add the custom paragraph extension
    Table.configure({
      resizable: false,
    }),
    TableRow,
    TableCell,
    TableHeader,
    Embed,
  ];

  const editor = useEditor({
    extensions,
    content: newPost.content || '<p>Start writing...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setNewPost((prev) => ({ ...prev, content: html }));
    },
    editorProps: {
      attributes: {
        class: styles.tiptapEditor,
      },
    },
  });

  // Load DOMPurify on the client side and configure it for embeds
  useEffect(() => {
    loadDOMPurify().then((DOMPurify) => {
      const instance = DOMPurify(window);
      instance.addHook('uponSanitizeElement', (node, data) => {
        if (node.nodeType !== Node.ELEMENT_NODE || !node.tagName) {
          return;
        }
        if (node.tagName.toLowerCase() === 'iframe' && node.getAttribute('src')?.includes('youtube.com')) {
          node.setAttribute('allowfullscreen', 'true');
        }
        if (node.tagName.toLowerCase() === 'script' && node.getAttribute('src')?.includes('instagram.com/embed.js')) {
          node.setAttribute('type', 'text/javascript');
        }
      });
      setDomPurifyInstance(() => instance);
    });
  }, []);

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Re-process Instagram embeds when content updates
  useEffect(() => {
    if (newPost.content && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [newPost.content]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (editor && newPost.content && editMode) {
      editor.commands.setContent(newPost.content);
    }
  }, [editor, newPost.content, editMode]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchPosts = useCallback(async (offset = 0) => {
    if (!user) return;
  
    setIsLoading(true);
    try {
      const idToken = await user.getIdToken();
      const queryParams = new URLSearchParams({
        method: 'GET_POSTS',
        page: encodeURIComponent(selectedPage),
        limit: pagination.limit,
        offset: offset,
      });
      const url = `${PHP_API_URL}?${queryParams.toString()}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch posts: ${errorMessage}`);
      }
  
      const data = await response.json();
      if (!data.posts || !data.pagination) {
        throw new Error('Invalid response format');
      }
  
      const postsWithPage = data.posts.map((post) => ({
        ...post,
        page: selectedPage,
        tags: post.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) : [],
        titleStyle: post.titleStyle ? (typeof post.titleStyle === 'string' ? JSON.parse(post.titleStyle) : post.titleStyle) : { color: '#000000', fontSize: '24px', textAlign: 'center' },
      }));
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

  const handleEditorImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, GIF, and WebP images are allowed.');
      return;
    }
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB.');
      return;
    }

    setIsLoading(true);
    try {
      if (!user) throw new Error('User not authenticated.');

      const idToken = await user.getIdToken();
      const queryParams = new URLSearchParams({
        method: 'UPLOAD_IMAGE',
        page: selectedPage || '',
      });
      const endpoint = `${PHP_API_URL}?${queryParams.toString()}`;

      const formData = new FormData();
      formData.append('image', file);

      const imageResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      const responseText = await imageResponse.text();
      console.log('Editor Image Upload Response:', responseText);

      if (!imageResponse.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Failed to upload image: ${responseText}`);
        }
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const imageData = JSON.parse(responseText);
      const imageUrl = imageData.imageUrl;

      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl, alt: file.name, align: 'left' }).run();
      }

      setError(null);
    } catch (error) {
      console.error('Editor Image Upload Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, GIF, and WebP images are allowed.');
      return;
    }
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB.');
      return;
    }

    setIsLoading(true);
    try {
      if (!user) throw new Error('User not authenticated.');

      const idToken = await user.getIdToken();
      const queryParams = new URLSearchParams({
        method: 'UPLOAD_IMAGE',
        page: selectedPage || '',
      });
      const endpoint = `${PHP_API_URL}?${queryParams.toString()}`;

      const formData = new FormData();
      formData.append('image', file);

      const imageResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      const responseText = await imageResponse.text();
      console.log('Featured Image Upload Response:', responseText);

      if (!imageResponse.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Failed to upload image: ${responseText}`);
        }
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const imageData = JSON.parse(responseText);
      const imageUrl = imageData.imageUrl;

      setNewPost((prev) => ({ ...prev, imageUrl }));
      setError(null);
    } catch (error) {
      console.error('Featured Image Upload Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const persistImageDimensions = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    doc.querySelectorAll('img').forEach((img) => {
      const width = img.style.width || img.getAttribute('width') || '300';
      const height = img.style.height || img.getAttribute('height') || 'auto';
      img.style.width = width.endsWith('px') ? width : `${width}px`;
      img.style.height = height.endsWith('px') ? height : `${height}`;
      img.setAttribute('width', width.replace('px', ''));
      img.setAttribute('height', height === 'auto' ? 'auto' : height.replace('px', ''));
    });

    return doc.body.innerHTML;
  };

  const handleCreatePost = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }
  
    if (!user.uid) {
      setError('User UID is missing.');
      return;
    }
  
    if (!newPost.title.trim()) {
      setError('Title is required.');
      return;
    }
    const editorContent = editor?.getHTML() || newPost.content;
    if (!editorContent.trim() || editorContent === '<p></p>') {
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
    processedTags = processedTags.map((tag) => tag.trim()).filter((tag) => tag.length > 0).slice(0, 5);
    if (processedTags.some((tag) => tag.length > 30)) {
      setError('Each tag must be 30 characters or less.');
      return;
    }
    const trimmedImageURL = newPost.imageUrl ? newPost.imageUrl.trim() : '';
    if (trimmedImageURL && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(trimmedImageURL) && !/^\/uploads\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(trimmedImageURL)) {
      setError('Image URL must be a valid URL ending in .jpg, .jpeg, .png, .gif, or .webp.');
      return;
    }
    const trimmedBackgroundColor = newPost.backgroundColor ? newPost.backgroundColor.trim() : '#ffffff';
    if (!/^#[0-9A-F]{6}$/i.test(trimmedBackgroundColor)) {
      setError('Background color must be a valid hex color.');
      return;
    }
  
    if (!domPurifyInstance) {
      setError('Sanitization library not loaded. Please try again.');
      return;
    }
  
    setIsLoading(true);
    try {
      const idToken = await user.getIdToken();
      const validatedStyle = validateTitleStyle(newPost.titleStyle);
      const processedContent = persistImageDimensions(editorContent);
      const sanitizedContent = domPurifyInstance.sanitize(processedContent, {
        ALLOWED_TAGS: [
          'img', 'p', 'div', 'span', 'br', 'strong', 'em', 'a', 'u',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
          'blockquote', 'code', 'pre',
          'table', 'tr', 'td', 'th',
          'iframe', 'script',
        ],
        ALLOWED_ATTR: [
          'src', 'width', 'height', 'alt', 'style', 'class', 'align', 'href',
          'target', 'rel', 'color', 'font-family', 'font-size', 'text-align',
          'colspan', 'rowspan',
          'frameborder', 'allowfullscreen',
          'data-instgrm-permalink', 'data-instgrm-version', 'data-embed', 'data-src', 'data-platform',
        ],
      });
  
      const postData = new URLSearchParams({
        id: editMode ? currentPostId : `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: newPost.title.trim(),
        content: sanitizedContent,
        imageUrl: trimmedImageURL,
        backgroundColor: trimmedBackgroundColor,
        titleStyle: JSON.stringify(validatedStyle),
        creator_uid: user.uid,
        category: trimmedCategory,
        tags: JSON.stringify(processedTags),
        ...(editMode && { postId: currentPostId }),
      });
  
      console.log('Post Data Fields:');
      console.log('id:', editMode ? currentPostId : `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      console.log('postId (editMode only):', editMode ? currentPostId : 'N/A');
      console.log('title:', newPost.title.trim());
      console.log('content:', sanitizedContent);
      console.log('creator_uid:', user.uid);
      console.log('method:', editMode ? 'UPDATE_POST' : 'CREATE_POST');
      console.log('Request Body:', postData.toString());
  
      const queryParams = new URLSearchParams({
        method: editMode ? 'UPDATE_POST' : 'CREATE_POST',
        page: selectedPage,
      });
      const endpoint = `${PHP_API_URL}?${queryParams.toString()}`;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postData,
      });
  
      const responseText = await response.text();
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
          const errorMessage = errorData.error || errorData.message || `Failed to ${editMode ? 'update' : 'create'} post`;
          throw new Error(`${errorMessage} (Status: ${response.status})`);
        } catch (parseError) {
          throw new Error(`Failed to ${editMode ? 'update' : 'create'} post: ${responseText} (Status: ${response.status})`);
        }
      }
  
      const responseData = JSON.parse(responseText);
      setSuccessMessage(responseData.message || (editMode ? 'Post updated!' : 'Post created!'));
      setNewPost({ title: '', content: '', image: null, imageUrl: '', backgroundColor: '#ffffff', titleStyle: { color: '#000000', fontSize: '24px', textAlign: 'center' }, category: '', tags: [] });
      editor?.commands.clearContent();
      setEditMode(false);
      setCurrentPostId(null);
      fetchPosts(0);
      setError(null);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} post:`, error);
      setError(error.message);
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
      const queryParams = new URLSearchParams({
        method: 'DELETE',
        page: encodeURIComponent(page),
        id: postId,
      });
      const url = `${PHP_API_URL}?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
  
      if (!response.ok) throw new Error('Failed to delete post');
  
      const responseData = await response.json();
      setSuccessMessage(responseData.message || 'Post deleted!');
      fetchPosts(pagination.offset);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post) => {
    const parsedTitleStyle = typeof post.titleStyle === 'string' ? JSON.parse(post.titleStyle) : post.titleStyle;
    setNewPost({
      title: post.title,
      content: persistImageDimensions(post.content),
      image: null,
      imageUrl: post.imageUrl || '',
      backgroundColor: post.backgroundColor || '#ffffff',
      titleStyle: parsedTitleStyle || { color: '#000000', fontSize: '24px', textAlign: 'center' },
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

  const openLinkDialog = () => {
    if (!editor) {
      setError('Editor is not initialized.');
      return;
    }

    const { from, to } = editor.state.selection;
    if (from === to) {
      setError('Please select some text to add a link.');
      return;
    }

    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setIsLinkDialogOpen(true);
  };

  const handleSetLink = () => {
    if (!editor) {
      setError('Editor is not initialized.');
      return;
    }
  
    console.log('Current selection:', editor.state.selection);
    console.log('Link URL:', linkUrl);
  
    if (linkUrl === '') {
      console.log('Unsetting link');
      editor.chain().focus().unsetLink().run();
    } else {
      let formattedUrl = linkUrl.trim();
      const hasProtocol = formattedUrl.match(/^(https?:\/\/)/);
      const startsWithWww = formattedUrl.match(/^www\./);
  
      if (!hasProtocol) {
        if (startsWithWww) {
          formattedUrl = `https://${formattedUrl}`;
        } else {
          formattedUrl = `https://${formattedUrl}`;
        }
      }
  
      console.log('Applying link:', formattedUrl);
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: formattedUrl, target: '_blank', rel: 'noopener noreferrer' })
        .run();
    }
  
    setIsLinkDialogOpen(false);
    setLinkUrl('');
    setError(null);
  
    console.log('Editor HTML after link operation:', editor.getHTML());
  };

  if (authLoading) {
    return <div className={styles.adminDashboard}><p>Loading authentication...</p></div>;
  }

  if (!user) {
    return <div className={styles.adminDashboard}><p>Redirecting to Sign In...</p></div>;
  }

  if (!editor) {
    return <div className={styles.adminDashboard}><p>Loading editor...</p></div>;
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
          <EditorToolbar
            editor={editor}
            openLinkDialog={openLinkDialog}
            isLinkDialogOpen={isLinkDialogOpen}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            handleSetLink={handleSetLink}
            imageInputRef={imageInputRef}
            handleEditorImageUpload={handleEditorImageUpload}
          />
          <EditorContent editor={editor} />
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
            {['8px', '10px', '12px', '14px', '16px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'].map((size) => (
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
                style={{ backgroundColor: post.backgroundColor || '#ffffff' }}
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
                    onError={(e) => { e.target.src = '/default-image.jpg'; e.target.onerror = null; }}
                  />
                )}

                <p className={styles.postMeta}><strong>Page:</strong> {post.page}</p>
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
                  <p className={styles.postMeta}><strong>Views:</strong> {post.views}</p>
                )}

                <div className={styles.postActions}>
                  <button onClick={() => handleEdit(post)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(post.id, post.page)} className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}

            <div className={styles.pagination}>
              {pagination.offset > 0 && (
                <button onClick={() => fetchPosts(pagination.offset - pagination.limit)} className={styles.paginationLink}>
                  Previous
                </button>
              )}
              {pagination.offset + pagination.limit < pagination.total && (
                <button onClick={() => fetchPosts(pagination.offset + pagination.limit)} className={styles.paginationLink}>
                  Next
                </button>
              )}
              <p>Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const validateTitleStyle = (style) => ({
  color: /^#[0-9A-F]{6}$/i.test(style.color) ? style.color : '#000000',
  fontSize: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'].includes(style.fontSize) ? style.fontSize : '24px',
  textAlign: ['left', 'center', 'right', 'justify'].includes(style.textAlign) ? style.textAlign : 'center',
});
