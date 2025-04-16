// src/extensions/Embed.js
import { Node } from '@tiptap/core';

const Embed = Node.create({
  name: 'embed',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      platform: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-embed]',
        getAttrs: (dom) => ({
          src: dom.getAttribute('data-src'),
          platform: dom.getAttribute('data-platform'),
        }),
      },
    ];
  },

  renderHTML({ node }) {
    const { src, platform } = node.attrs;

    if (platform === 'youtube') {
      return [
        'div',
        { class: 'embed-wrapper youtube-embed', 'data-embed': '', 'data-src': src, 'data-platform': platform },
        [
          'iframe',
          {
            src,
            frameborder: '0',
            allowfullscreen: true,
            style: 'width: 100%; height: 100%;',
          },
        ],
      ];
    } else if (platform === 'instagram') {
      return [
        'div',
        { class: 'embed-wrapper instagram-embed', 'data-embed': '', 'data-src': src, 'data-platform': platform },
        [
          'blockquote',
          {
            class: 'instagram-media',
            'data-instgrm-permalink': src,
            'data-instgrm-version': '14',
          },
        ],
      ];
    }

    return ['div', { class: 'embed-wrapper' }, 'Unsupported embed'];
  },

  addCommands() {
    return {
      setEmbed: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});

export default Embed;