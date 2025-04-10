import styles from '../../styles/AdminDashboard.module.css';

const ToolbarButton = ({ onClick, disabled, children, isActive }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.toolbarButton} ${isActive ? styles.active : ''}`}
    type="button"
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

  return (
    <div className={styles.tiptapToolbar}>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
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
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        Bullet List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        Ordered List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        Blockquote
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      >
        Align Left
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      >
        Align Center
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      >
        Align Right
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
      >
        Justify
      </ToolbarButton>
      <ToolbarButton
        onClick={openLinkDialog}
        disabled={editor.state.selection.empty}
        isActive={editor.isActive('link')}
      >
        Add Link
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        Remove Link
      </ToolbarButton>
      <ToolbarButton onClick={() => imageInputRef.current?.click()}>
        Add Image
      </ToolbarButton>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={handleEditorImageUpload}
      />
      <ToolbarButton
        onClick={() => setImageAlignment('left')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'left' })}
      >
        Image Left
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment('center')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'center' })}
      >
        Image Center
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment('right')}
        disabled={!editor.isActive('image')}
        isActive={editor.isActive('image', { align: 'right' })}
      >
        Image Right
      </ToolbarButton>

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className={styles.linkDialog}>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            className={styles.linkInput}
          />
          <button
            type="button" // Prevent form submission
            onClick={handleSetLink}
            className={styles.linkButton}
          >
            OK
          </button>
          <button
            type="button" // Prevent form submission
            onClick={() => {
              setLinkUrl(''); // Reset the URL
              handleSetLink(); // Call handleSetLink to close the dialog
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