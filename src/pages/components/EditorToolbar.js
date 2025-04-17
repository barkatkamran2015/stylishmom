import styles from '../../styles/AdminDashboard.module.css';
import { useState, useRef, useEffect } from 'react';

const ToolbarButton = ({ onClick, disabled, children, isActive, title, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.toolbarButton} ${isActive ? styles.active : ''}`}
    type="button"
    title={title}
    aria-label={ariaLabel || title}
  >
    {children}
  </button>
);

const EditorToolbar = ({
  editor,
  openLinkDialog,
  isLinkDialogOpen,
  linkUrl,
  setLinkUrl,
  handleSetLink,
  imageInputRef,
  handleEditorImageUpload,
}) => {
  // Move all hooks to the top, before any early returns
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedError, setEmbedError] = useState('');
  const embedInputRef = useRef(null);

  // Focus the embed input when the dialog opens
  useEffect(() => {
    if (isEmbedDialogOpen && embedInputRef.current) {
      embedInputRef.current.focus();
    }
  }, [isEmbedDialogOpen]);

  // Early return after hooks are declared
  if (!editor) return null;

  // Function to set image alignment
  const setImageAlignment = (align) => {
    const { state } = editor.view;
    const { selection } = state;
    const node = state.doc.nodeAt(selection.from);

    if (node && node.type.name === 'image') {
      editor
        .chain()
        .focus()
        .setNodeSelection(selection.from)
        .setImage({ ...node.attrs, align })
        .run();
    }
  };

  // Function to handle embed insertion
  const handleInsertEmbed = async () => {
    if (!embedUrl) {
      setIsEmbedDialogOpen(false);
      return;
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]+)/;

    let embedType, embedData;

    if (youtubeRegex.test(embedUrl)) {
      const match = embedUrl.match(youtubeRegex);
      const videoId = match[4];
      embedType = 'youtube';
      embedData = { src: `https://www.youtube.com/embed/${videoId}`, platform: 'youtube' };
    } else if (instagramRegex.test(embedUrl)) {
      const match = embedUrl.match(instagramRegex);
      const postId = match[4];
      embedType = 'instagram';
      embedData = { src: `https://www.instagram.com/p/${postId}/embed`, platform: 'instagram' };
    } else {
      setEmbedError('Invalid URL. Please enter a valid YouTube or Instagram URL.');
      return;
    }

    editor
      .chain()
      .focus()
      .setEmbed(embedData)
      .run();

    setEmbedUrl('');
    setEmbedError('');
    setIsEmbedDialogOpen(false);
  };

  // Function to set line spacing
  const setLineSpacing = (lineHeight) => {
    editor
      .chain()
      .focus()
      .updateAttributes('paragraph', { lineHeight })
      .run();
  };

  return (
    <div className={styles.tiptapToolbar}>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Toggle Bold"
        ariaLabel="Toggle Bold"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Toggle Italic"
        ariaLabel="Toggle Italic"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Toggle Underline"
        ariaLabel="Toggle Underline"
      >
        <u>U</u>
      </ToolbarButton>
      <select
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level) {
            editor.chain().focus().toggleHeading({ level }).run();
          } else {
            editor.chain().focus().setParagraph().run();
          }
        }}
        value={editor.isActive('heading') ? editor.getAttributes('heading').level : ''}
        aria-label="Select heading level"
      >
        <option value="">Paragraph</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
      </select>
      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={editor.getAttributes('textStyle')?.fontFamily || ''}
        aria-label="Select font family"
      >
        <option value="">Default Font</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Arial Black">Arial Black</option>
        <option value="Impact">Impact</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Lucida Console">Lucida Console</option>
        <option value="Palatino Linotype">Palatino Linotype</option>
        <option value="Segoe UI">Segoe UI</option>
        <option value="Calibri">Calibri</option>
        <option value="Courier">Courier</option>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Lora">Lora</option>
        <option value="Merriweather">Merriweather</option>
        <option value="Poppins">Poppins</option>
      </select>
      <select
        onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
        value={editor.getAttributes('textStyle')?.fontSize || ''}
        aria-label="Select font size"
      >
        <option value="">Default Size</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="22px">22px</option>
        <option value="24px">24px</option>
        <option value="26px">26px</option>
        <option value="28px">28px</option>
        <option value="30px">30px</option>
        <option value="32px">32px</option>
        <option value="36px">36px</option>
        <option value="40px">40px</option>
        <option value="44px">44px</option>
        <option value="48px">48px</option>
        <option value="56px">56px</option>
        <option value="64px">64px</option>
        <option value="72px">72px</option>
        <option value="80px">80px</option>
        <option value="96px">96px</option>
      </select>
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        value={editor.getAttributes('textStyle')?.color || '#000000'}
        title="Select text color"
        aria-label="Select text color"
      />
      <select
        onChange={(e) => setLineSpacing(e.target.value)}
        value={editor.isActive('paragraph') ? editor.getAttributes('paragraph').lineHeight || '1.0' : '1.0'}
        aria-label="Select line spacing"
      >
        <option value="1.0">1.0 (Single)</option>
        <option value="1.5">1.5 (1.5x)</option>
        <option value="2.0">2.0 (Double)</option>
        <option value="2.5">2.5 (2.5x)</option>
        <option value="3.0">3.0 (Triple)</option>
      </select>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Toggle Bullet List"
        ariaLabel="Toggle Bullet List"
      >
        Bullet List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Toggle Ordered List"
        ariaLabel="Toggle Ordered List"
      >
        Ordered List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Toggle Blockquote"
        ariaLabel="Toggle Blockquote"
      >
        Blockquote
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
        ariaLabel="Align Left"
      >
        Align Left
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
        ariaLabel="Align Center"
      >
        Align Center
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
        ariaLabel="Align Right"
      >
        Align Right
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        title="Justify"
        ariaLabel="Justify"
      >
        Justify
      </ToolbarButton>
      <ToolbarButton
        onClick={openLinkDialog}
        disabled={editor.state.selection.empty}
        isActive={editor.isActive('link')}
        title="Add Link"
        ariaLabel="Add Link"
      >
        Add Link
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        title="Remove Link"
        ariaLabel="Remove Link"
      >
        Remove Link
      </ToolbarButton>
      <ToolbarButton
        onClick={() => imageInputRef.current?.click()}
        title="Add Image"
        ariaLabel="Add Image"
      >
        Add Image
      </ToolbarButton>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={handleEditorImageUpload}
        aria-label="Upload image"
      />
      <ToolbarButton
        onClick={() => setImageAlignment('left')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'left' })}
        title="Align Image Left"
        ariaLabel="Align Image Left"
      >
        Image Left
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment('center')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'center' })}
        title="Align Image Center"
        ariaLabel="Align Image Center"
      >
        Image Center
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment('right')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'right' })}
        title="Align Image Right"
        ariaLabel="Align Image Right"
      >
        Image Right
      </ToolbarButton>

      {/* Table Controls */}
      <ToolbarButton
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        disabled={!editor.can().insertTable()}
        title="Insert a 3x3 table"
        ariaLabel="Insert a 3x3 table"
      >
        Insert Table
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        title="Add Row After"
        ariaLabel="Add Row After"
      >
        Add Row
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        title="Add Column After"
        ariaLabel="Add Column After"
      >
        Add Column
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        title="Delete Row"
        ariaLabel="Delete Row"
      >
        Delete Row
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        title="Delete Column"
        ariaLabel="Delete Column"
      >
        Delete Column
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
        title="Delete Table"
        ariaLabel="Delete Table"
      >
        Delete Table
      </ToolbarButton>

      {/* Embed Controls */}
      <ToolbarButton
        onClick={() => setIsEmbedDialogOpen(true)}
        title="Add YouTube or Instagram Embed"
        ariaLabel="Add YouTube or Instagram Embed"
      >
        Add Embed
      </ToolbarButton>

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className={styles.linkDialog} role="dialog" aria-labelledby="link-dialog-title">
          <h3 id="link-dialog-title" className={styles.srOnly}>Link Dialog</h3>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            className={styles.linkInput}
            aria-label="Enter URL"
          />
          <button
            type="button"
            onClick={handleSetLink}
            className={styles.linkButton}
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => {
              setLinkUrl('');
              handleSetLink();
            }}
            className={styles.linkButton}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Embed Dialog */}
      {isEmbedDialogOpen && (
        <div className={styles.linkDialog} role="dialog" aria-labelledby="embed-dialog-title">
          <h3 id="embed-dialog-title" className={styles.srOnly}>Embed URL Dialog</h3>
          {embedError && <p className={styles.error}>{embedError}</p>}
          <input
            type="text"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            placeholder="Enter YouTube or Instagram URL"
            className={styles.linkInput}
            ref={embedInputRef}
            aria-label="Enter YouTube or Instagram URL"
          />
          <button
            type="button"
            onClick={handleInsertEmbed}
            className={styles.linkButton}
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => {
              setEmbedUrl('');
              setEmbedError('');
              setIsEmbedDialogOpen(false);
            }}
            className={styles.linkButton}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
