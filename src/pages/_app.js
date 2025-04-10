import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/footer';
import { AuthProvider } from '../../context/AuthContext';
import theme from '../styles/theme';
import '../styles/globals.css';

// TipTap Extensions
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { createContext, useContext, useState } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

// Create an Emotion cache for SSR
const cache = createCache({
  key: 'css',
  prepend: true,
});

// Define the FontSize Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});

// Custom Image component with resize, drag, and alignment functionality
const ResizableImage = ({ node, updateAttributes }) => {
  const [size, setSize] = useState({
    width: node.attrs.width || 300,
    height: node.attrs.height || 'auto',
  });

  console.log('Rendering ResizableImage with attrs:', node.attrs);

  const onResize = (e) => {
    e.preventDefault();
    console.log('Resize started');
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height === 'auto' ? null : size.height;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth + deltaX;
      if (newWidth < 100) newWidth = 100; // Minimum width

      let newHeight = startHeight ? startHeight + deltaY : 'auto';
      if (startHeight && newHeight < 50) newHeight = 50; // Minimum height

      console.log('Resizing to:', { width: newWidth, height: newHeight });
      setSize({ width: newWidth, height: newHeight });
      updateAttributes({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      console.log('Resize ended');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Compute alignment styles based on the align attribute
  const alignmentStyles = () => {
    switch (node.attrs.align) {
      case 'center':
        return { marginLeft: 'auto', marginRight: 'auto' };
      case 'right':
        return { marginLeft: 'auto', marginRight: 0 };
      case 'left':
      default:
        return { marginLeft: 0, marginRight: 'auto' };
    }
  };

  return (
    <NodeViewWrapper className="resizable-image" draggable={true} data-drag-handle>
      <div
        style={{
          position: 'relative',
          display: 'block', // Ensure block-level for alignment
          width: `${size.width}px`,
          height: size.height === 'auto' ? 'auto' : `${size.height}px`,
          cursor: 'move',
          ...alignmentStyles(), // Apply alignment styles
        }}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          style={{
            width: '100%',
            height: size.height === 'auto' ? 'auto' : '100%',
            objectFit: 'contain',
          }}
        />
        <div
          className="resize-handle"
          onMouseDown={onResize}
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            width: '12px',
            height: '12px',
            background: '#3182ce',
            border: '2px solid #fff',
            borderRadius: '50%',
            cursor: 'se-resize',
          }}
        />
      </div>
    </NodeViewWrapper>
  );
};

// Configure the Link Extension
const CustomLink = Link.configure({
  openOnClick: false,
  HTMLAttributes: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: '_blank',
      },
      rel: {
        default: 'noopener noreferrer',
      },
    };
  },
});

// Configure the Image Extension with resize, drag, and alignment
// In _app.js
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: 300 },
      height: { default: 'auto' },
      align: {
        default: 'left',
        renderHTML: (attributes) => {
          return {
            'data-align': attributes.align, // Add data-align attribute
            style: (() => {
              switch (attributes.align) {
                case 'center':
                  return 'margin-left: auto; margin-right: auto; display: block;';
                case 'right':
                  return 'margin-left: auto; margin-right: 0; display: block;';
                case 'left':
                default:
                  return 'margin-left: 0; margin-right: auto; display: block;';
              }
            })(),
          };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImage);
  },
}).configure({
  inline: false,
  allowBase64: false,
});

// Configure the TextAlign Extension
const CustomTextAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
  alignments: ['left', 'center', 'right', 'justify'],
});

// Configure the FontFamily Extension
const CustomFontFamily = FontFamily.configure({
  types: ['textStyle'],
});

// Configure the Color Extension
const CustomColor = Color.configure({
  types: ['textStyle'],
});

// Define all TipTap extensions
const extensions = [
  StarterKit,
  CustomLink,
  CustomImage,
  TextStyle,
  FontSize,
  Underline,
  CustomTextAlign,
  CustomFontFamily,
  CustomColor,
];

// Create a Context to Share the Extensions
const TipTapExtensionsContext = createContext({ FontSize, extensions });

export const useTipTapExtensions = () => useContext(TipTapExtensionsContext);

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarAndFooter = ['/auth/signin', '/auth/signup'].includes(router.pathname);

  return (
    <CacheProvider value={cache}>
      <AuthProvider>
        <TipTapExtensionsContext.Provider value={{ FontSize, extensions }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
              <link
                href="https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand&family=Inter&display=swap"
                rel="stylesheet"
              />
            </Head>
            {!hideNavbarAndFooter && <Navbar />}
            <Component {...pageProps} />
            {!hideNavbarAndFooter && <Footer />}
          </ThemeProvider>
        </TipTapExtensionsContext.Provider>
      </AuthProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};