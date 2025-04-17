import { Paragraph } from '@tiptap/extension-paragraph';

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      lineHeight: {
        default: '1.0',
        parseHTML: (element) => element.style.lineHeight || '1.0',
        renderHTML: (attributes) => {
          if (!attributes.lineHeight || attributes.lineHeight === '1.0') {
            return {};
          }
          return {
            style: `line-height: ${attributes.lineHeight}`,
          };
        },
      },
    };
  },
});

export default CustomParagraph;