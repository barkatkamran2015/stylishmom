/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/firebaseConfig */ \"(pages-dir-node)/./lib/firebaseConfig.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Add loading state\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(_lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__.app);\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(auth, {\n                \"AuthProvider.useEffect.unsubscribe\": (user)=>{\n                    setUser(user);\n                    setLoading(false); // Set loading to false once auth state is resolved\n                }\n            }[\"AuthProvider.useEffect.unsubscribe\"]);\n            return ({\n                \"AuthProvider.useEffect\": ()=>unsubscribe()\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/context/AuthContext.js\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXVFO0FBQ1g7QUFDakI7QUFFM0MsTUFBTU8sNEJBQWNQLG9EQUFhQTtBQUUxQixTQUFTUSxhQUFhLEVBQUVDLFFBQVEsRUFBRTtJQUN2QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1QsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDVSxTQUFTQyxXQUFXLEdBQUdYLCtDQUFRQSxDQUFDLE9BQU8sb0JBQW9CO0lBRWxFQyxnREFBU0E7a0NBQUM7WUFDUixNQUFNVyxPQUFPVixzREFBT0EsQ0FBQ0Usb0RBQUdBO1lBQ3hCLE1BQU1TLGNBQWNWLGlFQUFrQkEsQ0FBQ1M7c0RBQU0sQ0FBQ0o7b0JBQzVDQyxRQUFRRDtvQkFDUkcsV0FBVyxRQUFRLG1EQUFtRDtnQkFDeEU7O1lBRUE7MENBQU8sSUFBTUU7O1FBQ2Y7aUNBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDUixZQUFZUyxRQUFRO1FBQUNDLE9BQU87WUFBRVA7WUFBTUU7UUFBUTtrQkFDMUNIOzs7Ozs7QUFHUDtBQUVPLFNBQVNTO0lBQ2QsT0FBT2pCLGlEQUFVQSxDQUFDTTtBQUNwQiIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vY29udGV4dC9BdXRoQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0QXV0aCwgb25BdXRoU3RhdGVDaGFuZ2VkIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuLi9saWIvZmlyZWJhc2VDb25maWcnXG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7IC8vIEFkZCBsb2FkaW5nIHN0YXRlXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBhdXRoID0gZ2V0QXV0aChhcHApO1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsICh1c2VyKSA9PiB7XG4gICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7IC8vIFNldCBsb2FkaW5nIHRvIGZhbHNlIG9uY2UgYXV0aCBzdGF0ZSBpcyByZXNvbHZlZFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBsb2FkaW5nIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBdXRoKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG59Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJnZXRBdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXBwIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJhdXRoIiwidW5zdWJzY3JpYmUiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/firebaseConfig.js":
/*!*******************************!*\
  !*** ./lib/firebaseConfig.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: () => (/* binding */ app),\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyBxvhugc4PAxKhtT4A3_bkkn93gAqvlwUk\",\n    authDomain: \"stylishmama-2f5ce.firebaseapp.com\",\n    projectId: \"stylishmama-2f5ce\",\n    storageBucket: \"stylishmama-2f5ce.firebasestorage.app\",\n    messagingSenderId: \"807674812157\",\n    appId: \"1:807674812157:web:02e4fb3fab7ed792a75094\"\n};\n// Initialize Firebase only once\nconst app = !(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)()[0];\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9maXJlYmFzZUNvbmZpZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDSjtBQUNWO0FBRXhDLE1BQU1JLGlCQUFpQjtJQUNyQkMsUUFBUUMseUNBQXdDO0lBQ2hERyxZQUFZSCxtQ0FBNEM7SUFDeERLLFdBQVdMLG1CQUEyQztJQUN0RE8sZUFBZVAsdUNBQStDO0lBQzlEUyxtQkFBbUJULGNBQW9EO0lBQ3ZFVyxPQUFPWCwyQ0FBdUM7QUFDaEQ7QUFFQSxnQ0FBZ0M7QUFDaEMsTUFBTWEsTUFBTSxDQUFDbEIscURBQU9BLEdBQUdtQixNQUFNLEdBQUdwQiwyREFBYUEsQ0FBQ0ksa0JBQWtCSCxxREFBT0EsRUFBRSxDQUFDLEVBQUU7QUFDNUUsTUFBTW9CLEtBQUtuQixnRUFBWUEsQ0FBQ2lCO0FBQ3hCLE1BQU1HLE9BQU9uQixzREFBT0EsQ0FBQ2dCO0FBRUkiLCJzb3VyY2VzIjpbIi9Vc2Vycy9iYXJrYXRhbGlrYW1yYW4vRGVza3RvcC9zdHlsaXNobW9tL2xpYi9maXJlYmFzZUNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwLCBnZXRBcHBzIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0IHsgZ2V0RmlyZXN0b3JlIH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XG5cbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVksXG4gIGF1dGhEb21haW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXG4gIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbiAgYXBwSWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCxcbn07XG5cbi8vIEluaXRpYWxpemUgRmlyZWJhc2Ugb25seSBvbmNlXG5jb25zdCBhcHAgPSAhZ2V0QXBwcygpLmxlbmd0aCA/IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpIDogZ2V0QXBwcygpWzBdO1xuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcbmNvbnN0IGF1dGggPSBnZXRBdXRoKGFwcCk7XG5cbmV4cG9ydCB7IGFwcCwgZGIsIGF1dGggfTtcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXBwcyIsImdldEZpcmVzdG9yZSIsImdldEF1dGgiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZIiwiYXV0aERvbWFpbiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOIiwicHJvamVjdElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCIsInN0b3JhZ2VCdWNrZXQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCIsImFwcElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEIiwiYXBwIiwibGVuZ3RoIiwiZGIiLCJhdXRoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/firebaseConfig.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/Assets/logo1.png":
/*!************************************!*\
  !*** ./src/pages/Assets/logo1.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\"src\":\"/_next/static/media/logo1.32b930f5.png\",\"height\":196,\"width\":600,\"blurDataURL\":\"/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.32b930f5.png&w=8&q=70\",\"blurWidth\":8,\"blurHeight\":3});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9Bc3NldHMvbG9nbzEucG5nIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZSxDQUFDLDhMQUE4TCIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vc3JjL3BhZ2VzL0Fzc2V0cy9sb2dvMS5wbmciXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1wic3JjXCI6XCIvX25leHQvc3RhdGljL21lZGlhL2xvZ28xLjMyYjkzMGY1LnBuZ1wiLFwiaGVpZ2h0XCI6MTk2LFwid2lkdGhcIjo2MDAsXCJibHVyRGF0YVVSTFwiOlwiL19uZXh0L2ltYWdlP3VybD0lMkZfbmV4dCUyRnN0YXRpYyUyRm1lZGlhJTJGbG9nbzEuMzJiOTMwZjUucG5nJnc9OCZxPTcwXCIsXCJibHVyV2lkdGhcIjo4LFwiYmx1ckhlaWdodFwiOjN9OyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/Assets/logo1.png\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp),\n/* harmony export */   useTipTapExtensions: () => (/* binding */ useTipTapExtensions)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\n/* harmony import */ var _barrel_optimize_names_CssBaseline_ThemeProvider_mui_material__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! __barrel_optimize__?names=CssBaseline,ThemeProvider!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=CssBaseline,ThemeProvider!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _pages_components_Navbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/components/Navbar */ \"(pages-dir-node)/./src/pages/components/Navbar.js\");\n/* harmony import */ var _pages_footer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/footer */ \"(pages-dir-node)/./src/pages/footer.js\");\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../context/AuthContext */ \"(pages-dir-node)/./context/AuthContext.js\");\n/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/theme */ \"(pages-dir-node)/./src/styles/theme.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tiptap/starter-kit */ \"@tiptap/starter-kit\");\n/* harmony import */ var _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tiptap/extension-link */ \"@tiptap/extension-link\");\n/* harmony import */ var _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tiptap/extension-image */ \"@tiptap/extension-image\");\n/* harmony import */ var _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @tiptap/extension-underline */ \"@tiptap/extension-underline\");\n/* harmony import */ var _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @tiptap/extension-text-align */ \"@tiptap/extension-text-align\");\n/* harmony import */ var _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @tiptap/extension-font-family */ \"@tiptap/extension-font-family\");\n/* harmony import */ var _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @tiptap/extension-color */ \"@tiptap/extension-color\");\n/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @tiptap/core */ \"@tiptap/core\");\n/* harmony import */ var _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @tiptap/extension-text-style */ \"@tiptap/extension-text-style\");\n/* harmony import */ var _tiptap_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @tiptap/react */ \"@tiptap/react\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react__WEBPACK_IMPORTED_MODULE_3__, _emotion_cache__WEBPACK_IMPORTED_MODULE_4__, _pages_components_Navbar__WEBPACK_IMPORTED_MODULE_7__, _pages_footer__WEBPACK_IMPORTED_MODULE_8__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_9__, _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_12__, _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__, _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_14__, _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__, _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_16__, _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_17__, _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_18__, _tiptap_core__WEBPACK_IMPORTED_MODULE_19__, _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_20__, _tiptap_react__WEBPACK_IMPORTED_MODULE_21__]);\n([_emotion_react__WEBPACK_IMPORTED_MODULE_3__, _emotion_cache__WEBPACK_IMPORTED_MODULE_4__, _pages_components_Navbar__WEBPACK_IMPORTED_MODULE_7__, _pages_footer__WEBPACK_IMPORTED_MODULE_8__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_9__, _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_12__, _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__, _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_14__, _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__, _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_16__, _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_17__, _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_18__, _tiptap_core__WEBPACK_IMPORTED_MODULE_19__, _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_20__, _tiptap_react__WEBPACK_IMPORTED_MODULE_21__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n // Added for route tracking\n// TipTap Extensions\n\n\n\n\n\n\n\n\n\n\n\n// Create an Emotion cache for SSR\nconst cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n    key: 'css',\n    prepend: true\n});\n// Define the FontSize Extension\nconst FontSize = _tiptap_core__WEBPACK_IMPORTED_MODULE_19__.Extension.create({\n    name: 'fontSize',\n    addOptions () {\n        return {\n            types: [\n                'textStyle'\n            ]\n        };\n    },\n    addGlobalAttributes () {\n        return [\n            {\n                types: this.options.types,\n                attributes: {\n                    fontSize: {\n                        default: null,\n                        parseHTML: (element)=>element.style.fontSize || null,\n                        renderHTML: (attributes)=>{\n                            if (!attributes.fontSize) {\n                                return {};\n                            }\n                            return {\n                                style: `font-size: ${attributes.fontSize}`\n                            };\n                        }\n                    }\n                }\n            }\n        ];\n    },\n    addCommands () {\n        return {\n            setFontSize: (fontSize)=>({ chain })=>{\n                    return chain().setMark('textStyle', {\n                        fontSize\n                    }).run();\n                },\n            unsetFontSize: ()=>({ chain })=>{\n                    return chain().setMark('textStyle', {\n                        fontSize: null\n                    }).removeEmptyTextStyle().run();\n                }\n        };\n    }\n});\n// Custom Image component with resize, drag, and alignment functionality\nconst ResizableImage = ({ node, updateAttributes })=>{\n    const [size, setSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        width: node.attrs.width || 300,\n        height: node.attrs.height || 'auto'\n    });\n    console.log('Rendering ResizableImage with attrs:', node.attrs);\n    const onResize = (e)=>{\n        e.preventDefault();\n        console.log('Resize started');\n        const startX = e.clientX;\n        const startY = e.clientY;\n        const startWidth = size.width;\n        const startHeight = size.height === 'auto' ? null : size.height;\n        const onMouseMove = (moveEvent)=>{\n            const deltaX = moveEvent.clientX - startX;\n            const deltaY = moveEvent.clientY - startY;\n            let newWidth = startWidth + deltaX;\n            if (newWidth < 100) newWidth = 100; // Minimum width\n            let newHeight = startHeight ? startHeight + deltaY : 'auto';\n            if (startHeight && newHeight < 50) newHeight = 50; // Minimum height\n            console.log('Resizing to:', {\n                width: newWidth,\n                height: newHeight\n            });\n            setSize({\n                width: newWidth,\n                height: newHeight\n            });\n            updateAttributes({\n                width: newWidth,\n                height: newHeight\n            });\n        };\n        const onMouseUp = ()=>{\n            console.log('Resize ended');\n            document.removeEventListener('mousemove', onMouseMove);\n            document.removeEventListener('mouseup', onMouseUp);\n        };\n        document.addEventListener('mousemove', onMouseMove);\n        document.addEventListener('mouseup', onMouseUp);\n    };\n    // Compute alignment styles based on the align attribute\n    const alignmentStyles = ()=>{\n        switch(node.attrs.align){\n            case 'center':\n                return {\n                    marginLeft: 'auto',\n                    marginRight: 'auto'\n                };\n            case 'right':\n                return {\n                    marginLeft: 'auto',\n                    marginRight: 0\n                };\n            case 'left':\n            default:\n                return {\n                    marginLeft: 0,\n                    marginRight: 'auto'\n                };\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tiptap_react__WEBPACK_IMPORTED_MODULE_21__.NodeViewWrapper, {\n        className: \"resizable-image\",\n        draggable: true,\n        \"data-drag-handle\": true,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                position: 'relative',\n                display: 'block',\n                width: `${size.width}px`,\n                height: size.height === 'auto' ? 'auto' : `${size.height}px`,\n                cursor: 'move',\n                ...alignmentStyles()\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    src: node.attrs.src,\n                    alt: node.attrs.alt,\n                    style: {\n                        width: '100%',\n                        height: size.height === 'auto' ? 'auto' : '100%',\n                        objectFit: 'contain'\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                    lineNumber: 146,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"resize-handle\",\n                    onMouseDown: onResize,\n                    style: {\n                        position: 'absolute',\n                        bottom: '4px',\n                        right: '4px',\n                        width: '12px',\n                        height: '12px',\n                        background: '#3182ce',\n                        border: '2px solid #fff',\n                        borderRadius: '50%',\n                        cursor: 'se-resize'\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                    lineNumber: 155,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n            lineNumber: 136,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n        lineNumber: 135,\n        columnNumber: 5\n    }, undefined);\n};\n// Configure the Link Extension\nconst CustomLink = _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__[\"default\"].configure({\n    openOnClick: false,\n    HTMLAttributes: {\n        target: '_blank',\n        rel: 'noopener noreferrer'\n    },\n    addAttributes () {\n        return {\n            href: {\n                default: null\n            },\n            target: {\n                default: '_blank'\n            },\n            rel: {\n                default: 'noopener noreferrer'\n            }\n        };\n    }\n});\n// Configure the Image Extension with resize, drag, and alignment\nconst CustomImage = _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_14__[\"default\"].extend({\n    addAttributes () {\n        return {\n            ...this.parent?.(),\n            width: {\n                default: 300\n            },\n            height: {\n                default: 'auto'\n            },\n            align: {\n                default: 'left',\n                renderHTML: (attributes)=>{\n                    return {\n                        'data-align': attributes.align,\n                        style: (()=>{\n                            switch(attributes.align){\n                                case 'center':\n                                    return 'margin-left: auto; margin-right: auto; display: block;';\n                                case 'right':\n                                    return 'margin-left: auto; margin-right: 0; display: block;';\n                                case 'left':\n                                default:\n                                    return 'margin-left: 0; margin-right: auto; display: block;';\n                            }\n                        })()\n                    };\n                }\n            }\n        };\n    },\n    addNodeView () {\n        return (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_21__.ReactNodeViewRenderer)(ResizableImage);\n    }\n}).configure({\n    inline: false,\n    allowBase64: false\n});\n// Configure the TextAlign Extension\nconst CustomTextAlign = _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_16__[\"default\"].configure({\n    types: [\n        'heading',\n        'paragraph'\n    ],\n    alignments: [\n        'left',\n        'center',\n        'right',\n        'justify'\n    ]\n});\n// Configure the FontFamily Extension\nconst CustomFontFamily = _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_17__[\"default\"].configure({\n    types: [\n        'textStyle'\n    ]\n});\n// Configure the Color Extension\nconst CustomColor = _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_18__[\"default\"].configure({\n    types: [\n        'textStyle'\n    ]\n});\n// Define all TipTap extensions\nconst extensions = [\n    _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n    CustomLink,\n    CustomImage,\n    _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_20__.TextStyle,\n    FontSize,\n    _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n    CustomTextAlign,\n    CustomFontFamily,\n    CustomColor\n];\n// Create a Context to Share the Extensions\nconst TipTapExtensionsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    FontSize,\n    extensions\n});\nconst useTipTapExtensions = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TipTapExtensionsContext);\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    const hideNavbarAndFooter = [\n        '/auth/signin',\n        '/auth/signup'\n    ].includes(router.pathname);\n    // Google Analytics route change tracking\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            const handleRouteChange = {\n                \"MyApp.useEffect.handleRouteChange\": (url)=>{\n                    window.gtag('config', 'G-RLTSW4SWV4', {\n                        page_path: url\n                    });\n                }\n            }[\"MyApp.useEffect.handleRouteChange\"];\n            router.events.on('routeChangeComplete', handleRouteChange);\n            return ({\n                \"MyApp.useEffect\": ()=>{\n                    router.events.off('routeChangeComplete', handleRouteChange);\n                }\n            })[\"MyApp.useEffect\"];\n        }\n    }[\"MyApp.useEffect\"], [\n        router.events\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_3__.CacheProvider, {\n        value: cache,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_9__.AuthProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TipTapExtensionsContext.Provider, {\n                value: {\n                    FontSize,\n                    extensions\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_CssBaseline_ThemeProvider_mui_material__WEBPACK_IMPORTED_MODULE_22__.ThemeProvider, {\n                    theme: _styles_theme__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_CssBaseline_ThemeProvider_mui_material__WEBPACK_IMPORTED_MODULE_22__.CssBaseline, {}, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                            lineNumber: 289,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                                    href: \"https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand&family=Inter&display=swap\",\n                                    rel: \"stylesheet\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                                    lineNumber: 291,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                                    async: true,\n                                    src: \"https://www.googletagmanager.com/gtag/js?id=G-RLTSW4SWV4\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                                    lineNumber: 296,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                                    dangerouslySetInnerHTML: {\n                                        __html: `\n                    window.dataLayer = window.dataLayer || [];\n                    function gtag(){dataLayer.push(arguments);}\n                    gtag('js', new Date());\n                    gtag('config', 'G-RLTSW4SWV4');\n                  `\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                                    lineNumber: 297,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                            lineNumber: 290,\n                            columnNumber: 13\n                        }, this),\n                        !hideNavbarAndFooter && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pages_components_Navbar__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                            lineNumber: 308,\n                            columnNumber: 38\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                            ...pageProps\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                            lineNumber: 309,\n                            columnNumber: 13\n                        }, this),\n                        !hideNavbarAndFooter && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pages_footer__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                            lineNumber: 310,\n                            columnNumber: 38\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                    lineNumber: 288,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n                lineNumber: 287,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n            lineNumber: 286,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/_app.js\",\n        lineNumber: 285,\n        columnNumber: 5\n    }, this);\n}\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType).isRequired,\n    pageProps: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVsQixxQkFDRSw4REFBQ3BJLHlEQUFhQTtRQUFDdUksT0FBTzlHO2tCQUNwQiw0RUFBQ2pCLDhEQUFZQTtzQkFDWCw0RUFBQzhHLHdCQUF3QmtCLFFBQVE7Z0JBQUNELE9BQU87b0JBQUUzRztvQkFBVXlGO2dCQUFXOzBCQUM5RCw0RUFBQ25ILHlHQUFhQTtvQkFBQ08sT0FBT0Esc0RBQUtBOztzQ0FDekIsOERBQUNOLHVHQUFXQTs7Ozs7c0NBQ1osOERBQUNDLGtEQUFJQTs7OENBQ0gsOERBQUNxSTtvQ0FDQy9CLE1BQUs7b0NBQ0xGLEtBQUk7Ozs7Ozs4Q0FHTiw4REFBQ2tDO29DQUFPQyxLQUFLO29DQUFDakQsS0FBSTs7Ozs7OzhDQUNsQiw4REFBQ2dEO29DQUNDRSx5QkFBeUI7d0NBQ3ZCQyxRQUFRLENBQUM7Ozs7O2tCQUtULENBQUM7b0NBQ0g7Ozs7Ozs7Ozs7Ozt3QkFHSCxDQUFDakIscUNBQXVCLDhEQUFDdEgsZ0VBQU1BOzs7OztzQ0FDaEMsOERBQUNtSDs0QkFBVyxHQUFHQyxTQUFTOzs7Ozs7d0JBQ3ZCLENBQUNFLHFDQUF1Qiw4REFBQ3JILHFEQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUM7QUFFQWlILE1BQU1zQixTQUFTLEdBQUc7SUFDaEJyQixXQUFXMUgsK0RBQXFCLENBQUNpSixVQUFVO0lBQzNDdEIsV0FBVzNILDBEQUFnQixDQUFDaUosVUFBVTtBQUN4QyIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vc3JjL3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciwgQ3NzQmFzZWxpbmUgfSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL3BhZ2VzL2NvbXBvbmVudHMvTmF2YmFyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vcGFnZXMvZm9vdGVyJztcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQnO1xuaW1wb3J0IHRoZW1lIGZyb20gJy4uL3N0eWxlcy90aGVtZSc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7IC8vIEFkZGVkIGZvciByb3V0ZSB0cmFja2luZ1xuXG4vLyBUaXBUYXAgRXh0ZW5zaW9uc1xuaW1wb3J0IFN0YXJ0ZXJLaXQgZnJvbSAnQHRpcHRhcC9zdGFydGVyLWtpdCc7XG5pbXBvcnQgTGluayBmcm9tICdAdGlwdGFwL2V4dGVuc2lvbi1saW5rJztcbmltcG9ydCBJbWFnZSBmcm9tICdAdGlwdGFwL2V4dGVuc2lvbi1pbWFnZSc7XG5pbXBvcnQgVW5kZXJsaW5lIGZyb20gJ0B0aXB0YXAvZXh0ZW5zaW9uLXVuZGVybGluZSc7XG5pbXBvcnQgVGV4dEFsaWduIGZyb20gJ0B0aXB0YXAvZXh0ZW5zaW9uLXRleHQtYWxpZ24nO1xuaW1wb3J0IEZvbnRGYW1pbHkgZnJvbSAnQHRpcHRhcC9leHRlbnNpb24tZm9udC1mYW1pbHknO1xuaW1wb3J0IENvbG9yIGZyb20gJ0B0aXB0YXAvZXh0ZW5zaW9uLWNvbG9yJztcbmltcG9ydCB7IEV4dGVuc2lvbiB9IGZyb20gJ0B0aXB0YXAvY29yZSc7XG5pbXBvcnQgeyBUZXh0U3R5bGUgfSBmcm9tICdAdGlwdGFwL2V4dGVuc2lvbi10ZXh0LXN0eWxlJztcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTm9kZVZpZXdXcmFwcGVyLCBSZWFjdE5vZGVWaWV3UmVuZGVyZXIgfSBmcm9tICdAdGlwdGFwL3JlYWN0JztcblxuLy8gQ3JlYXRlIGFuIEVtb3Rpb24gY2FjaGUgZm9yIFNTUlxuY29uc3QgY2FjaGUgPSBjcmVhdGVDYWNoZSh7XG4gIGtleTogJ2NzcycsXG4gIHByZXBlbmQ6IHRydWUsXG59KTtcblxuLy8gRGVmaW5lIHRoZSBGb250U2l6ZSBFeHRlbnNpb25cbmNvbnN0IEZvbnRTaXplID0gRXh0ZW5zaW9uLmNyZWF0ZSh7XG4gIG5hbWU6ICdmb250U2l6ZScsXG4gIGFkZE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGVzOiBbJ3RleHRTdHlsZSddLFxuICAgIH07XG4gIH0sXG4gIGFkZEdsb2JhbEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZXM6IHRoaXMub3B0aW9ucy50eXBlcyxcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGZvbnRTaXplOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgcGFyc2VIVE1MOiAoZWxlbWVudCkgPT4gZWxlbWVudC5zdHlsZS5mb250U2l6ZSB8fCBudWxsLFxuICAgICAgICAgICAgcmVuZGVySFRNTDogKGF0dHJpYnV0ZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzLmZvbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IGBmb250LXNpemU6ICR7YXR0cmlidXRlcy5mb250U2l6ZX1gLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdO1xuICB9LFxuICBhZGRDb21tYW5kcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0Rm9udFNpemU6XG4gICAgICAgIChmb250U2l6ZSkgPT5cbiAgICAgICAgKHsgY2hhaW4gfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjaGFpbigpLnNldE1hcmsoJ3RleHRTdHlsZScsIHsgZm9udFNpemUgfSkucnVuKCk7XG4gICAgICAgIH0sXG4gICAgICB1bnNldEZvbnRTaXplOlxuICAgICAgICAoKSA9PlxuICAgICAgICAoeyBjaGFpbiB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNoYWluKCkuc2V0TWFyaygndGV4dFN0eWxlJywgeyBmb250U2l6ZTogbnVsbCB9KS5yZW1vdmVFbXB0eVRleHRTdHlsZSgpLnJ1bigpO1xuICAgICAgICB9LFxuICAgIH07XG4gIH0sXG59KTtcblxuLy8gQ3VzdG9tIEltYWdlIGNvbXBvbmVudCB3aXRoIHJlc2l6ZSwgZHJhZywgYW5kIGFsaWdubWVudCBmdW5jdGlvbmFsaXR5XG5jb25zdCBSZXNpemFibGVJbWFnZSA9ICh7IG5vZGUsIHVwZGF0ZUF0dHJpYnV0ZXMgfSkgPT4ge1xuICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSB1c2VTdGF0ZSh7XG4gICAgd2lkdGg6IG5vZGUuYXR0cnMud2lkdGggfHwgMzAwLFxuICAgIGhlaWdodDogbm9kZS5hdHRycy5oZWlnaHQgfHwgJ2F1dG8nLFxuICB9KTtcblxuICBjb25zb2xlLmxvZygnUmVuZGVyaW5nIFJlc2l6YWJsZUltYWdlIHdpdGggYXR0cnM6Jywgbm9kZS5hdHRycyk7XG5cbiAgY29uc3Qgb25SZXNpemUgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnUmVzaXplIHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3Qgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBzaXplLndpZHRoO1xuICAgIGNvbnN0IHN0YXJ0SGVpZ2h0ID0gc2l6ZS5oZWlnaHQgPT09ICdhdXRvJyA/IG51bGwgOiBzaXplLmhlaWdodDtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKG1vdmVFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGFYID0gbW92ZUV2ZW50LmNsaWVudFggLSBzdGFydFg7XG4gICAgICBjb25zdCBkZWx0YVkgPSBtb3ZlRXZlbnQuY2xpZW50WSAtIHN0YXJ0WTtcblxuICAgICAgbGV0IG5ld1dpZHRoID0gc3RhcnRXaWR0aCArIGRlbHRhWDtcbiAgICAgIGlmIChuZXdXaWR0aCA8IDEwMCkgbmV3V2lkdGggPSAxMDA7IC8vIE1pbmltdW0gd2lkdGhcblxuICAgICAgbGV0IG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ID8gc3RhcnRIZWlnaHQgKyBkZWx0YVkgOiAnYXV0byc7XG4gICAgICBpZiAoc3RhcnRIZWlnaHQgJiYgbmV3SGVpZ2h0IDwgNTApIG5ld0hlaWdodCA9IDUwOyAvLyBNaW5pbXVtIGhlaWdodFxuXG4gICAgICBjb25zb2xlLmxvZygnUmVzaXppbmcgdG86JywgeyB3aWR0aDogbmV3V2lkdGgsIGhlaWdodDogbmV3SGVpZ2h0IH0pO1xuICAgICAgc2V0U2l6ZSh7IHdpZHRoOiBuZXdXaWR0aCwgaGVpZ2h0OiBuZXdIZWlnaHQgfSk7XG4gICAgICB1cGRhdGVBdHRyaWJ1dGVzKHsgd2lkdGg6IG5ld1dpZHRoLCBoZWlnaHQ6IG5ld0hlaWdodCB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1Jlc2l6ZSBlbmRlZCcpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgfTtcblxuICAvLyBDb21wdXRlIGFsaWdubWVudCBzdHlsZXMgYmFzZWQgb24gdGhlIGFsaWduIGF0dHJpYnV0ZVxuICBjb25zdCBhbGlnbm1lbnRTdHlsZXMgPSAoKSA9PiB7XG4gICAgc3dpdGNoIChub2RlLmF0dHJzLmFsaWduKSB7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICByZXR1cm4geyBtYXJnaW5MZWZ0OiAnYXV0bycsIG1hcmdpblJpZ2h0OiAnYXV0bycgfTtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgcmV0dXJuIHsgbWFyZ2luTGVmdDogJ2F1dG8nLCBtYXJnaW5SaWdodDogMCB9O1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geyBtYXJnaW5MZWZ0OiAwLCBtYXJnaW5SaWdodDogJ2F1dG8nIH07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPE5vZGVWaWV3V3JhcHBlciBjbGFzc05hbWU9XCJyZXNpemFibGUtaW1hZ2VcIiBkcmFnZ2FibGU9e3RydWV9IGRhdGEtZHJhZy1oYW5kbGU+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJywgLy8gRW5zdXJlIGJsb2NrLWxldmVsIGZvciBhbGlnbm1lbnRcbiAgICAgICAgICB3aWR0aDogYCR7c2l6ZS53aWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodCA9PT0gJ2F1dG8nID8gJ2F1dG8nIDogYCR7c2l6ZS5oZWlnaHR9cHhgLFxuICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxuICAgICAgICAgIC4uLmFsaWdubWVudFN0eWxlcygpLCAvLyBBcHBseSBhbGlnbm1lbnQgc3R5bGVzXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9e25vZGUuYXR0cnMuc3JjfVxuICAgICAgICAgIGFsdD17bm9kZS5hdHRycy5hbHR9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUuaGVpZ2h0ID09PSAnYXV0bycgPyAnYXV0bycgOiAnMTAwJScsXG4gICAgICAgICAgICBvYmplY3RGaXQ6ICdjb250YWluJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVzaXplLWhhbmRsZVwiXG4gICAgICAgICAgb25Nb3VzZURvd249e29uUmVzaXplfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICByaWdodDogJzRweCcsXG4gICAgICAgICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzMxODJjZScsXG4gICAgICAgICAgICBib3JkZXI6ICcycHggc29saWQgI2ZmZicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgY3Vyc29yOiAnc2UtcmVzaXplJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9Ob2RlVmlld1dyYXBwZXI+XG4gICk7XG59O1xuXG4vLyBDb25maWd1cmUgdGhlIExpbmsgRXh0ZW5zaW9uXG5jb25zdCBDdXN0b21MaW5rID0gTGluay5jb25maWd1cmUoe1xuICBvcGVuT25DbGljazogZmFsc2UsXG4gIEhUTUxBdHRyaWJ1dGVzOiB7XG4gICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICByZWw6ICdub29wZW5lciBub3JlZmVycmVyJyxcbiAgfSxcbiAgYWRkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjoge1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRhcmdldDoge1xuICAgICAgICBkZWZhdWx0OiAnX2JsYW5rJyxcbiAgICAgIH0sXG4gICAgICByZWw6IHtcbiAgICAgICAgZGVmYXVsdDogJ25vb3BlbmVyIG5vcmVmZXJyZXInLFxuICAgICAgfSxcbiAgICB9O1xuICB9LFxufSk7XG5cbi8vIENvbmZpZ3VyZSB0aGUgSW1hZ2UgRXh0ZW5zaW9uIHdpdGggcmVzaXplLCBkcmFnLCBhbmQgYWxpZ25tZW50XG5jb25zdCBDdXN0b21JbWFnZSA9IEltYWdlLmV4dGVuZCh7XG4gIGFkZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucGFyZW50Py4oKSxcbiAgICAgIHdpZHRoOiB7IGRlZmF1bHQ6IDMwMCB9LFxuICAgICAgaGVpZ2h0OiB7IGRlZmF1bHQ6ICdhdXRvJyB9LFxuICAgICAgYWxpZ246IHtcbiAgICAgICAgZGVmYXVsdDogJ2xlZnQnLFxuICAgICAgICByZW5kZXJIVE1MOiAoYXR0cmlidXRlcykgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnZGF0YS1hbGlnbic6IGF0dHJpYnV0ZXMuYWxpZ24sIC8vIEFkZCBkYXRhLWFsaWduIGF0dHJpYnV0ZVxuICAgICAgICAgICAgc3R5bGU6ICgoKSA9PiB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlcy5hbGlnbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ21hcmdpbi1sZWZ0OiBhdXRvOyBtYXJnaW4tcmlnaHQ6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyc7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdtYXJnaW4tbGVmdDogYXV0bzsgbWFyZ2luLXJpZ2h0OiAwOyBkaXNwbGF5OiBibG9jazsnO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ21hcmdpbi1sZWZ0OiAwOyBtYXJnaW4tcmlnaHQ6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSxcbiAgYWRkTm9kZVZpZXcoKSB7XG4gICAgcmV0dXJuIFJlYWN0Tm9kZVZpZXdSZW5kZXJlcihSZXNpemFibGVJbWFnZSk7XG4gIH0sXG59KS5jb25maWd1cmUoe1xuICBpbmxpbmU6IGZhbHNlLFxuICBhbGxvd0Jhc2U2NDogZmFsc2UsXG59KTtcblxuLy8gQ29uZmlndXJlIHRoZSBUZXh0QWxpZ24gRXh0ZW5zaW9uXG5jb25zdCBDdXN0b21UZXh0QWxpZ24gPSBUZXh0QWxpZ24uY29uZmlndXJlKHtcbiAgdHlwZXM6IFsnaGVhZGluZycsICdwYXJhZ3JhcGgnXSxcbiAgYWxpZ25tZW50czogWydsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5J10sXG59KTtcblxuLy8gQ29uZmlndXJlIHRoZSBGb250RmFtaWx5IEV4dGVuc2lvblxuY29uc3QgQ3VzdG9tRm9udEZhbWlseSA9IEZvbnRGYW1pbHkuY29uZmlndXJlKHtcbiAgdHlwZXM6IFsndGV4dFN0eWxlJ10sXG59KTtcblxuLy8gQ29uZmlndXJlIHRoZSBDb2xvciBFeHRlbnNpb25cbmNvbnN0IEN1c3RvbUNvbG9yID0gQ29sb3IuY29uZmlndXJlKHtcbiAgdHlwZXM6IFsndGV4dFN0eWxlJ10sXG59KTtcblxuLy8gRGVmaW5lIGFsbCBUaXBUYXAgZXh0ZW5zaW9uc1xuY29uc3QgZXh0ZW5zaW9ucyA9IFtcbiAgU3RhcnRlcktpdCxcbiAgQ3VzdG9tTGluayxcbiAgQ3VzdG9tSW1hZ2UsXG4gIFRleHRTdHlsZSxcbiAgRm9udFNpemUsXG4gIFVuZGVybGluZSxcbiAgQ3VzdG9tVGV4dEFsaWduLFxuICBDdXN0b21Gb250RmFtaWx5LFxuICBDdXN0b21Db2xvcixcbl07XG5cbi8vIENyZWF0ZSBhIENvbnRleHQgdG8gU2hhcmUgdGhlIEV4dGVuc2lvbnNcbmNvbnN0IFRpcFRhcEV4dGVuc2lvbnNDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7IEZvbnRTaXplLCBleHRlbnNpb25zIH0pO1xuXG5leHBvcnQgY29uc3QgdXNlVGlwVGFwRXh0ZW5zaW9ucyA9ICgpID0+IHVzZUNvbnRleHQoVGlwVGFwRXh0ZW5zaW9uc0NvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IGhpZGVOYXZiYXJBbmRGb290ZXIgPSBbJy9hdXRoL3NpZ25pbicsICcvYXV0aC9zaWdudXAnXS5pbmNsdWRlcyhyb3V0ZXIucGF0aG5hbWUpO1xuXG4gIC8vIEdvb2dsZSBBbmFseXRpY3Mgcm91dGUgY2hhbmdlIHRyYWNraW5nXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUm91dGVDaGFuZ2UgPSAodXJsKSA9PiB7XG4gICAgICB3aW5kb3cuZ3RhZygnY29uZmlnJywgJ0ctUkxUU1c0U1dWNCcsIHtcbiAgICAgICAgcGFnZV9wYXRoOiB1cmwsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBoYW5kbGVSb3V0ZUNoYW5nZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlUm91dGVDaGFuZ2UpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXIuZXZlbnRzXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q2FjaGVQcm92aWRlciB2YWx1ZT17Y2FjaGV9PlxuICAgICAgPEF1dGhQcm92aWRlcj5cbiAgICAgICAgPFRpcFRhcEV4dGVuc2lvbnNDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IEZvbnRTaXplLCBleHRlbnNpb25zIH19PlxuICAgICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgICA8Q3NzQmFzZWxpbmUgLz5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxvYnN0ZXImZmFtaWx5PVF1aWNrc2FuZCZmYW1pbHk9SW50ZXImZGlzcGxheT1zd2FwXCJcbiAgICAgICAgICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgey8qIEdvb2dsZSBBbmFseXRpY3MgR0E0IFNjcmlwdCAqL31cbiAgICAgICAgICAgICAgPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPUctUkxUU1c0U1dWNFwiPjwvc2NyaXB0PlxuICAgICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgICAgIF9faHRtbDogYFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ3RhZygpe2RhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7fVxuICAgICAgICAgICAgICAgICAgICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICBndGFnKCdjb25maWcnLCAnRy1STFRTVzRTV1Y0Jyk7XG4gICAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICB7IWhpZGVOYXZiYXJBbmRGb290ZXIgJiYgPE5hdmJhciAvPn1cbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgICAgIHshaGlkZU5hdmJhckFuZEZvb3RlciAmJiA8Rm9vdGVyIC8+fVxuICAgICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICAgPC9UaXBUYXBFeHRlbnNpb25zQ29udGV4dC5Qcm92aWRlcj5cbiAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn1cblxuTXlBcHAucHJvcFR5cGVzID0ge1xuICBDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50VHlwZS5pc1JlcXVpcmVkLFxuICBwYWdlUHJvcHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2FjaGVQcm92aWRlciIsImNyZWF0ZUNhY2hlIiwiVGhlbWVQcm92aWRlciIsIkNzc0Jhc2VsaW5lIiwiSGVhZCIsInVzZVJvdXRlciIsIk5hdmJhciIsIkZvb3RlciIsIkF1dGhQcm92aWRlciIsInRoZW1lIiwidXNlRWZmZWN0IiwiU3RhcnRlcktpdCIsIkxpbmsiLCJJbWFnZSIsIlVuZGVybGluZSIsIlRleHRBbGlnbiIsIkZvbnRGYW1pbHkiLCJDb2xvciIsIkV4dGVuc2lvbiIsIlRleHRTdHlsZSIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJOb2RlVmlld1dyYXBwZXIiLCJSZWFjdE5vZGVWaWV3UmVuZGVyZXIiLCJjYWNoZSIsImtleSIsInByZXBlbmQiLCJGb250U2l6ZSIsImNyZWF0ZSIsIm5hbWUiLCJhZGRPcHRpb25zIiwidHlwZXMiLCJhZGRHbG9iYWxBdHRyaWJ1dGVzIiwib3B0aW9ucyIsImF0dHJpYnV0ZXMiLCJmb250U2l6ZSIsImRlZmF1bHQiLCJwYXJzZUhUTUwiLCJlbGVtZW50Iiwic3R5bGUiLCJyZW5kZXJIVE1MIiwiYWRkQ29tbWFuZHMiLCJzZXRGb250U2l6ZSIsImNoYWluIiwic2V0TWFyayIsInJ1biIsInVuc2V0Rm9udFNpemUiLCJyZW1vdmVFbXB0eVRleHRTdHlsZSIsIlJlc2l6YWJsZUltYWdlIiwibm9kZSIsInVwZGF0ZUF0dHJpYnV0ZXMiLCJzaXplIiwic2V0U2l6ZSIsIndpZHRoIiwiYXR0cnMiLCJoZWlnaHQiLCJjb25zb2xlIiwibG9nIiwib25SZXNpemUiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdGFydFgiLCJjbGllbnRYIiwic3RhcnRZIiwiY2xpZW50WSIsInN0YXJ0V2lkdGgiLCJzdGFydEhlaWdodCIsIm9uTW91c2VNb3ZlIiwibW92ZUV2ZW50IiwiZGVsdGFYIiwiZGVsdGFZIiwibmV3V2lkdGgiLCJuZXdIZWlnaHQiLCJvbk1vdXNlVXAiLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYWxpZ25tZW50U3R5bGVzIiwiYWxpZ24iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJjbGFzc05hbWUiLCJkcmFnZ2FibGUiLCJkYXRhLWRyYWctaGFuZGxlIiwiZGl2IiwicG9zaXRpb24iLCJkaXNwbGF5IiwiY3Vyc29yIiwiaW1nIiwic3JjIiwiYWx0Iiwib2JqZWN0Rml0Iiwib25Nb3VzZURvd24iLCJib3R0b20iLCJyaWdodCIsImJhY2tncm91bmQiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJDdXN0b21MaW5rIiwiY29uZmlndXJlIiwib3Blbk9uQ2xpY2siLCJIVE1MQXR0cmlidXRlcyIsInRhcmdldCIsInJlbCIsImFkZEF0dHJpYnV0ZXMiLCJocmVmIiwiQ3VzdG9tSW1hZ2UiLCJleHRlbmQiLCJwYXJlbnQiLCJhZGROb2RlVmlldyIsImlubGluZSIsImFsbG93QmFzZTY0IiwiQ3VzdG9tVGV4dEFsaWduIiwiYWxpZ25tZW50cyIsIkN1c3RvbUZvbnRGYW1pbHkiLCJDdXN0b21Db2xvciIsImV4dGVuc2lvbnMiLCJUaXBUYXBFeHRlbnNpb25zQ29udGV4dCIsInVzZVRpcFRhcEV4dGVuc2lvbnMiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsImhpZGVOYXZiYXJBbmRGb290ZXIiLCJpbmNsdWRlcyIsInBhdGhuYW1lIiwiaGFuZGxlUm91dGVDaGFuZ2UiLCJ1cmwiLCJ3aW5kb3ciLCJndGFnIiwicGFnZV9wYXRoIiwiZXZlbnRzIiwib24iLCJvZmYiLCJ2YWx1ZSIsIlByb3ZpZGVyIiwibGluayIsInNjcmlwdCIsImFzeW5jIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJwcm9wVHlwZXMiLCJlbGVtZW50VHlwZSIsImlzUmVxdWlyZWQiLCJvYmplY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/components/Navbar.js":
/*!****************************************!*\
  !*** ./src/pages/components/Navbar.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/firebaseConfig */ \"(pages-dir-node)/./lib/firebaseConfig.js\");\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AuthContext */ \"(pages-dir-node)/./context/AuthContext.js\");\n/* harmony import */ var _barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=AppBar,Box,Button,Divider,Drawer,IconButton,List,ListItem,ListItemText,Toolbar,Typography!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,Divider,Drawer,IconButton,List,ListItem,ListItemText,Toolbar,Typography!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/Menu */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Menu.js\");\n/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/icons-material/Close */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Close.js\");\n/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/ExpandMore */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/ExpandMore.js\");\n/* harmony import */ var _Assets_logo1_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Assets/logo1.png */ \"(pages-dir-node)/./src/pages/Assets/logo1.png\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_4__, _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_5__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_6__, _barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_4__, _lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_5__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_6__, _barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\nconst Navbar = ()=>{\n    const [drawerOpen, setDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [mobileMenuOpen, setMobileMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const desktopDropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // Ref for desktop dropdown\n    const mobileDropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // Ref for mobile dropdown\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { user } = (0,_context_AuthContext__WEBPACK_IMPORTED_MODULE_6__.useAuth)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            setIsClient(true);\n        }\n    }[\"Navbar.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const handleResize = {\n                \"Navbar.useEffect.handleResize\": ()=>{\n                    if (window.innerWidth > 768 && drawerOpen) setDrawerOpen(false);\n                }\n            }[\"Navbar.useEffect.handleResize\"];\n            window.addEventListener('resize', handleResize);\n            return ({\n                \"Navbar.useEffect\": ()=>window.removeEventListener('resize', handleResize)\n            })[\"Navbar.useEffect\"];\n        }\n    }[\"Navbar.useEffect\"], [\n        drawerOpen\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const handleClickOutside = {\n                \"Navbar.useEffect.handleClickOutside\": (event)=>{\n                    const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target);\n                    const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);\n                    // Only close dropdown if the click is outside both desktop and mobile dropdowns\n                    if (isOutsideDesktop && isOutsideMobile) {\n                        setMobileMenuOpen({});\n                    }\n                }\n            }[\"Navbar.useEffect.handleClickOutside\"];\n            document.addEventListener('mousedown', handleClickOutside);\n            return ({\n                \"Navbar.useEffect\": ()=>document.removeEventListener('mousedown', handleClickOutside)\n            })[\"Navbar.useEffect\"];\n        }\n    }[\"Navbar.useEffect\"], []);\n    const handleLogout = ()=>{\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.signOut)(_lib_firebaseConfig__WEBPACK_IMPORTED_MODULE_5__.auth).then(()=>{\n            console.log('User signed out');\n            router.push('/auth/signin');\n        }).catch((error)=>console.error('Error signing out: ', error));\n    };\n    const toggleDrawer = (open)=>()=>setDrawerOpen(open);\n    const toggleMobileMenu = (menuLabel)=>{\n        setMobileMenuOpen((prev)=>({\n                ...prev,\n                [menuLabel]: !prev[menuLabel]\n            }));\n    };\n    const closeNavbarAndNavigate = ()=>{\n        setDrawerOpen(false);\n        setMobileMenuOpen({});\n    };\n    const menuItems = [\n        {\n            label: 'Home',\n            path: '/'\n        },\n        {\n            label: 'About',\n            path: '/about'\n        },\n        {\n            label: 'Recipe',\n            dropdown: [\n                {\n                    label: 'Food',\n                    path: '/food'\n                },\n                {\n                    label: 'Drinks',\n                    path: '/drinks'\n                },\n                {\n                    label: 'Dessert',\n                    path: '/dessert'\n                }\n            ]\n        },\n        {\n            label: 'Blog',\n            path: '/blog'\n        },\n        {\n            label: 'Products Review',\n            path: '/productsreview'\n        },\n        {\n            label: 'Contact',\n            path: '/contact'\n        }\n    ];\n    if (!isClient) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.AppBar, {\n        position: \"sticky\",\n        sx: {\n            backgroundColor: '#2980b9',\n            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',\n            top: 0,\n            zIndex: 1200\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {\n            sx: {\n                justifyContent: 'space-between',\n                padding: {\n                    xs: '0 10px',\n                    md: '0 20px'\n                }\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Typography, {\n                    variant: \"h6\",\n                    sx: {\n                        display: 'flex',\n                        alignItems: 'center'\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: \"/\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: _Assets_logo1_png__WEBPACK_IMPORTED_MODULE_7__[\"default\"].src,\n                            alt: \"The Stylish Mama Logo\",\n                            style: {\n                                height: '60px',\n                                objectFit: 'contain',\n                                transition: 'transform 0.3s ease',\n                                '&:hover': {\n                                    transform: 'scale(1.05)'\n                                }\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 114,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                        lineNumber: 113,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                    lineNumber: 112,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                    sx: {\n                        display: {\n                            xs: 'none',\n                            md: 'flex'\n                        },\n                        gap: 2,\n                        alignItems: 'center'\n                    },\n                    ref: desktopDropdownRef,\n                    children: [\n                        menuItems.map((menu, index)=>menu.dropdown ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                sx: {\n                                    position: 'relative'\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                        onClick: ()=>toggleMobileMenu(menu.label),\n                                        endIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                            lineNumber: 134,\n                                            columnNumber: 28\n                                        }, void 0),\n                                        sx: {\n                                            color: 'white',\n                                            fontWeight: 600,\n                                            textTransform: 'none',\n                                            padding: '8px 16px',\n                                            borderRadius: '8px',\n                                            '&:hover': {\n                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                            }\n                                        },\n                                        children: menu.label\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 132,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    mobileMenuOpen[menu.label] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                        sx: {\n                                            position: 'absolute',\n                                            top: '100%',\n                                            left: 0,\n                                            backgroundColor: '#2980b9',\n                                            borderRadius: '8px',\n                                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',\n                                            minWidth: '150px',\n                                            zIndex: 1,\n                                            overflow: 'hidden'\n                                        },\n                                        children: menu.dropdown.map((item, idx)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                                component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                                href: item.path,\n                                                onClick: ()=>setMobileMenuOpen({}),\n                                                sx: {\n                                                    display: 'block',\n                                                    color: 'white',\n                                                    padding: '10px 20px',\n                                                    textAlign: 'left',\n                                                    textTransform: 'none',\n                                                    '&:hover': {\n                                                        backgroundColor: 'rgba(255, 255, 255, 0.15)'\n                                                    }\n                                                },\n                                                children: item.label\n                                            }, idx, false, {\n                                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                                lineNumber: 163,\n                                                columnNumber: 23\n                                            }, undefined))\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 149,\n                                        columnNumber: 19\n                                    }, undefined)\n                                ]\n                            }, index, true, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                lineNumber: 131,\n                                columnNumber: 15\n                            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                href: menu.path,\n                                sx: {\n                                    color: 'white',\n                                    fontWeight: 600,\n                                    textTransform: 'none',\n                                    padding: '8px 16px',\n                                    borderRadius: '8px',\n                                    '&:hover': {\n                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                    }\n                                },\n                                children: menu.label\n                            }, index, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                lineNumber: 186,\n                                columnNumber: 15\n                            }, undefined)),\n                        !user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                    component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                    href: \"/auth/signin\",\n                                    sx: {\n                                        color: 'white',\n                                        fontWeight: 600,\n                                        padding: '8px 16px',\n                                        borderRadius: '8px',\n                                        '&:hover': {\n                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                        }\n                                    },\n                                    children: \"Sign In\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 207,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                    component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                    href: \"/auth/signup\",\n                                    sx: {\n                                        backgroundColor: '#FFD700',\n                                        color: '#0b9299',\n                                        fontWeight: 600,\n                                        padding: '8px 16px',\n                                        borderRadius: '8px',\n                                        '&:hover': {\n                                            backgroundColor: '#ffea00'\n                                        }\n                                    },\n                                    children: \"Sign Up\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 220,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                            onClick: handleLogout,\n                            sx: {\n                                color: 'white',\n                                fontWeight: 600,\n                                padding: '8px 16px',\n                                borderRadius: '8px',\n                                '&:hover': {\n                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                }\n                            },\n                            children: \"Logout\"\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 236,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                    lineNumber: 128,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.IconButton, {\n                    edge: \"end\",\n                    onClick: toggleDrawer(true),\n                    sx: {\n                        display: {\n                            xs: 'block',\n                            md: 'none'\n                        },\n                        color: 'white',\n                        padding: '10px',\n                        borderRadius: '50%',\n                        backgroundColor: 'rgba(255, 255, 255, 0.1)',\n                        '&:hover': {\n                            backgroundColor: 'rgba(255, 255, 255, 0.2)'\n                        }\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                        sx: {\n                            fontSize: '28px'\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                        lineNumber: 264,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                    lineNumber: 252,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Drawer, {\n                    anchor: \"right\",\n                    open: drawerOpen,\n                    onClose: toggleDrawer(false),\n                    sx: {\n                        '& .MuiDrawer-paper': {\n                            width: {\n                                xs: '80vw',\n                                sm: '300px'\n                            },\n                            height: '100vh',\n                            backgroundColor: '#0b9299',\n                            padding: '20px',\n                            boxSizing: 'border-box',\n                            transition: 'width 0.3s ease'\n                        }\n                    },\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                            sx: {\n                                display: 'flex',\n                                justifyContent: 'space-between',\n                                alignItems: 'center',\n                                mb: 2\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Typography, {\n                                    variant: \"h6\",\n                                    sx: {\n                                        color: 'white',\n                                        fontWeight: 700\n                                    },\n                                    children: \"Menu\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 284,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.IconButton, {\n                                    onClick: toggleDrawer(false),\n                                    sx: {\n                                        color: 'white'\n                                    },\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 288,\n                                        columnNumber: 15\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 287,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 283,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Divider, {\n                            sx: {\n                                my: 2,\n                                backgroundColor: 'rgba(255, 255, 255, 0.3)'\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 291,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.List, {\n                            ref: mobileDropdownRef,\n                            children: menuItems.map((menu, index)=>menu.dropdown ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItem, {\n                                            button: true,\n                                            onClick: ()=>toggleMobileMenu(menu.label),\n                                            sx: {\n                                                padding: '12px 16px',\n                                                color: 'white'\n                                            },\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItemText, {\n                                                    primary: menu.label,\n                                                    primaryTypographyProps: {\n                                                        fontSize: '16px',\n                                                        fontWeight: 600\n                                                    }\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                                    lineNumber: 301,\n                                                    columnNumber: 21\n                                                }, undefined),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                                    sx: {\n                                                        color: 'white',\n                                                        transform: mobileMenuOpen[menu.label] ? 'rotate(180deg)' : 'rotate(0deg)',\n                                                        transition: 'transform 0.3s'\n                                                    }\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                                    lineNumber: 305,\n                                                    columnNumber: 21\n                                                }, undefined)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                            lineNumber: 296,\n                                            columnNumber: 19\n                                        }, undefined),\n                                        mobileMenuOpen[menu.label] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                            sx: {\n                                                pl: 4\n                                            },\n                                            children: menu.dropdown.map((item, idx)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItem, {\n                                                    button: true,\n                                                    component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                                    href: item.path,\n                                                    onClick: closeNavbarAndNavigate,\n                                                    sx: {\n                                                        padding: '10px 16px',\n                                                        color: 'white'\n                                                    },\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItemText, {\n                                                        primary: item.label,\n                                                        primaryTypographyProps: {\n                                                            fontSize: '14px'\n                                                        }\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                                        lineNumber: 318,\n                                                        columnNumber: 27\n                                                    }, undefined)\n                                                }, idx, false, {\n                                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                                    lineNumber: 310,\n                                                    columnNumber: 25\n                                                }, undefined))\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                            lineNumber: 308,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 295,\n                                    columnNumber: 17\n                                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItem, {\n                                    button: true,\n                                    component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                    href: menu.path,\n                                    onClick: closeNavbarAndNavigate,\n                                    sx: {\n                                        padding: '12px 16px',\n                                        color: 'white'\n                                    },\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.ListItemText, {\n                                        primary: menu.label,\n                                        primaryTypographyProps: {\n                                            fontSize: '16px',\n                                            fontWeight: 600\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 333,\n                                        columnNumber: 19\n                                    }, undefined)\n                                }, index, false, {\n                                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                    lineNumber: 325,\n                                    columnNumber: 17\n                                }, undefined))\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 292,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Divider, {\n                            sx: {\n                                my: 2,\n                                backgroundColor: 'rgba(255, 255, 255, 0.3)'\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 338,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                            sx: {\n                                display: 'flex',\n                                flexDirection: 'column',\n                                gap: 2\n                            },\n                            children: !user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                        component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                        href: \"/auth/signin\",\n                                        onClick: closeNavbarAndNavigate,\n                                        sx: {\n                                            color: 'white',\n                                            border: '2px solid white',\n                                            borderRadius: '8px',\n                                            padding: '10px 20px',\n                                            fontWeight: 600,\n                                            textTransform: 'none',\n                                            '&:hover': {\n                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                            }\n                                        },\n                                        children: \"Sign In\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 342,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                        component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                                        href: \"/auth/signup\",\n                                        onClick: closeNavbarAndNavigate,\n                                        sx: {\n                                            backgroundColor: '#FFD700',\n                                            color: '#0b9299',\n                                            borderRadius: '8px',\n                                            padding: '10px 20px',\n                                            fontWeight: 600,\n                                            textTransform: 'none',\n                                            '&:hover': {\n                                                backgroundColor: '#ffea00'\n                                            }\n                                        },\n                                        children: \"Sign Up\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                        lineNumber: 358,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Divider_Drawer_IconButton_List_ListItem_ListItemText_Toolbar_Typography_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                onClick: ()=>{\n                                    handleLogout();\n                                    closeNavbarAndNavigate();\n                                },\n                                sx: {\n                                    color: 'white',\n                                    border: '2px solid white',\n                                    borderRadius: '8px',\n                                    padding: '10px 20px',\n                                    fontWeight: 600,\n                                    textTransform: 'none',\n                                    '&:hover': {\n                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'\n                                    }\n                                },\n                                children: \"Logout\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                                lineNumber: 376,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                            lineNumber: 339,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n                    lineNumber: 268,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n            lineNumber: 110,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/components/Navbar.js\",\n        lineNumber: 101,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9jb21wb25lbnRzL05hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFDWjtBQUNYO0FBQ1c7QUFDVztBQUNJO0FBYWhDO0FBQ3lCO0FBQ0U7QUFDVTtBQUNoQjtBQUU1QyxNQUFNdUIsU0FBUztJQUNiLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHekIsK0NBQVFBLENBQUM7SUFDN0MsTUFBTSxDQUFDMEIsZ0JBQWdCQyxrQkFBa0IsR0FBRzNCLCtDQUFRQSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDNEIsVUFBVUMsWUFBWSxHQUFHN0IsK0NBQVFBLENBQUM7SUFDekMsTUFBTThCLHFCQUFxQjVCLDZDQUFNQSxDQUFDLE9BQU8sMkJBQTJCO0lBQ3BFLE1BQU02QixvQkFBb0I3Qiw2Q0FBTUEsQ0FBQyxPQUFRLDBCQUEwQjtJQUNuRSxNQUFNOEIsU0FBUzdCLHNEQUFTQTtJQUN4QixNQUFNLEVBQUU4QixJQUFJLEVBQUUsR0FBRzFCLDZEQUFPQTtJQUV4Qk4sZ0RBQVNBOzRCQUFDO1lBQ1I0QixZQUFZO1FBQ2Q7MkJBQUcsRUFBRTtJQUVMNUIsZ0RBQVNBOzRCQUFDO1lBQ1IsTUFBTWlDO2lEQUFlO29CQUNuQixJQUFJQyxPQUFPQyxVQUFVLEdBQUcsT0FBT1osWUFBWUMsY0FBYztnQkFDM0Q7O1lBQ0FVLE9BQU9FLGdCQUFnQixDQUFDLFVBQVVIO1lBQ2xDO29DQUFPLElBQU1DLE9BQU9HLG1CQUFtQixDQUFDLFVBQVVKOztRQUNwRDsyQkFBRztRQUFDVjtLQUFXO0lBRWZ2QixnREFBU0E7NEJBQUM7WUFDUixNQUFNc0M7dURBQXFCLENBQUNDO29CQUMxQixNQUFNQyxtQkFBbUJYLG1CQUFtQlksT0FBTyxJQUFJLENBQUNaLG1CQUFtQlksT0FBTyxDQUFDQyxRQUFRLENBQUNILE1BQU1JLE1BQU07b0JBQ3hHLE1BQU1DLGtCQUFrQmQsa0JBQWtCVyxPQUFPLElB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QU87NENBQ1B5QixRQUFROzRDQUNSdEIsY0FBYzs0Q0FDZHpCLFNBQVM7NENBQ1R1QixZQUFZOzRDQUNaQyxlQUFlOzRDQUNmLFdBQVc7Z0RBQUU3QixpQkFBaUI7NENBQTJCO3dDQUMzRDtrREFDRDs7Ozs7O2tEQUdELDhEQUFDaEQsaUtBQU1BO3dDQUNMb0YsV0FBV2xHLGtEQUFJQTt3Q0FDZnlFLE1BQUs7d0NBQ0xjLFNBQVNoQzt3Q0FDVE0sSUFBSTs0Q0FDRkMsaUJBQWlCOzRDQUNqQjJCLE9BQU87NENBQ1BHLGNBQWM7NENBQ2R6QixTQUFTOzRDQUNUdUIsWUFBWTs0Q0FDWkMsZUFBZTs0Q0FDZixXQUFXO2dEQUFFN0IsaUJBQWlCOzRDQUFVO3dDQUMxQztrREFDRDs7Ozs7Ozs2REFLSCw4REFBQ2hELGlLQUFNQTtnQ0FDTHlFLFNBQVM7b0NBQ1A1QztvQ0FDQVk7Z0NBQ0Y7Z0NBQ0FNLElBQUk7b0NBQ0Y0QixPQUFPO29DQUNQeUIsUUFBUTtvQ0FDUnRCLGNBQWM7b0NBQ2R6QixTQUFTO29DQUNUdUIsWUFBWTtvQ0FDWkMsZUFBZTtvQ0FDZixXQUFXO3dDQUFFN0IsaUJBQWlCO29DQUEyQjtnQ0FDM0Q7MENBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTZjtBQUVBLGlFQUFlM0MsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vc3JjL3BhZ2VzL2NvbXBvbmVudHMvTmF2YmFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyBzaWduT3V0IH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vLi4vLi4vbGliL2ZpcmViYXNlQ29uZmlnJztcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0JztcbmltcG9ydCB7XG4gIEFwcEJhcixcbiAgVG9vbGJhcixcbiAgVHlwb2dyYXBoeSxcbiAgSWNvbkJ1dHRvbixcbiAgRHJhd2VyLFxuICBMaXN0LFxuICBMaXN0SXRlbSxcbiAgTGlzdEl0ZW1UZXh0LFxuICBCb3gsXG4gIERpdmlkZXIsXG4gIEJ1dHRvbixcbn0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgTWVudUljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9NZW51JztcbmltcG9ydCBDbG9zZUljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9DbG9zZSc7XG5pbXBvcnQgRXhwYW5kTW9yZUljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9FeHBhbmRNb3JlJztcbmltcG9ydCBpbWFnZUxvZ28gZnJvbSAnLi4vQXNzZXRzL2xvZ28xLnBuZyc7XG5cbmNvbnN0IE5hdmJhciA9ICgpID0+IHtcbiAgY29uc3QgW2RyYXdlck9wZW4sIHNldERyYXdlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9iaWxlTWVudU9wZW4sIHNldE1vYmlsZU1lbnVPcGVuXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2lzQ2xpZW50LCBzZXRJc0NsaWVudF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGRlc2t0b3BEcm9wZG93blJlZiA9IHVzZVJlZihudWxsKTsgLy8gUmVmIGZvciBkZXNrdG9wIGRyb3Bkb3duXG4gIGNvbnN0IG1vYmlsZURyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpOyAgLy8gUmVmIGZvciBtb2JpbGUgZHJvcGRvd25cbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SXNDbGllbnQodHJ1ZSk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCAmJiBkcmF3ZXJPcGVuKSBzZXREcmF3ZXJPcGVuKGZhbHNlKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgfSwgW2RyYXdlck9wZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgaXNPdXRzaWRlRGVza3RvcCA9IGRlc2t0b3BEcm9wZG93blJlZi5jdXJyZW50ICYmICFkZXNrdG9wRHJvcGRvd25SZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgY29uc3QgaXNPdXRzaWRlTW9iaWxlID0gbW9iaWxlRHJvcGRvd25SZWYuY3VycmVudCAmJiAhbW9iaWxlRHJvcGRvd25SZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgLy8gT25seSBjbG9zZSBkcm9wZG93biBpZiB0aGUgY2xpY2sgaXMgb3V0c2lkZSBib3RoIGRlc2t0b3AgYW5kIG1vYmlsZSBkcm9wZG93bnNcbiAgICAgIGlmIChpc091dHNpZGVEZXNrdG9wICYmIGlzT3V0c2lkZU1vYmlsZSkge1xuICAgICAgICBzZXRNb2JpbGVNZW51T3Blbih7fSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xuICAgIHNpZ25PdXQoYXV0aClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgc2lnbmVkIG91dCcpO1xuICAgICAgICByb3V0ZXIucHVzaCgnL2F1dGgvc2lnbmluJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcignRXJyb3Igc2lnbmluZyBvdXQ6ICcsIGVycm9yKSk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlRHJhd2VyID0gKG9wZW4pID0+ICgpID0+IHNldERyYXdlck9wZW4ob3Blbik7XG5cbiAgY29uc3QgdG9nZ2xlTW9iaWxlTWVudSA9IChtZW51TGFiZWwpID0+IHtcbiAgICBzZXRNb2JpbGVNZW51T3BlbigocHJldikgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbbWVudUxhYmVsXTogIXByZXZbbWVudUxhYmVsXSxcbiAgICB9KSk7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VOYXZiYXJBbmROYXZpZ2F0ZSA9ICgpID0+IHtcbiAgICBzZXREcmF3ZXJPcGVuKGZhbHNlKTtcbiAgICBzZXRNb2JpbGVNZW51T3Blbih7fSk7XG4gIH07XG5cbiAgY29uc3QgbWVudUl0ZW1zID0gW1xuICAgIHsgbGFiZWw6ICdIb21lJywgcGF0aDogJy8nIH0sXG4gICAgeyBsYWJlbDogJ0Fib3V0JywgcGF0aDogJy9hYm91dCcgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JlY2lwZScsXG4gICAgICBkcm9wZG93bjogW1xuICAgICAgICB7IGxhYmVsOiAnRm9vZCcsIHBhdGg6ICcvZm9vZCcgfSxcbiAgICAgICAgeyBsYWJlbDogJ0RyaW5rcycsIHBhdGg6ICcvZHJpbmtzJyB9LFxuICAgICAgICB7IGxhYmVsOiAnRGVzc2VydCcsIHBhdGg6ICcvZGVzc2VydCcgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7IGxhYmVsOiAnQmxvZycsIHBhdGg6ICcvYmxvZycgfSxcbiAgICB7IGxhYmVsOiAnUHJvZHVjdHMgUmV2aWV3JywgcGF0aDogJy9wcm9kdWN0c3JldmlldycgfSxcbiAgICB7IGxhYmVsOiAnQ29udGFjdCcsIHBhdGg6ICcvY29udGFjdCcgfSxcbiAgXTtcblxuICBpZiAoIWlzQ2xpZW50KSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxBcHBCYXJcbiAgICAgIHBvc2l0aW9uPVwic3RpY2t5XCJcbiAgICAgIHN4PXt7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyOTgwYjknLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgekluZGV4OiAxMjAwLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8VG9vbGJhciBzeD17eyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBwYWRkaW5nOiB7IHhzOiAnMCAxMHB4JywgbWQ6ICcwIDIwcHgnIH0gfX0+XG4gICAgICAgIHsvKiBMb2dvICovfVxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIiBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VMb2dvLnNyY31cbiAgICAgICAgICAgICAgYWx0PVwiVGhlIFN0eWxpc2ggTWFtYSBMb2dvXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICBvYmplY3RGaXQ6ICdjb250YWluJyxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuM3MgZWFzZScsXG4gICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7IHRyYW5zZm9ybTogJ3NjYWxlKDEuMDUpJyB9LFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvVHlwb2dyYXBoeT5cblxuICAgICAgICB7LyogRGVza3RvcCBNZW51ICovfVxuICAgICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6IHsgeHM6ICdub25lJywgbWQ6ICdmbGV4JyB9LCBnYXA6IDIsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19IHJlZj17ZGVza3RvcERyb3Bkb3duUmVmfT5cbiAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgobWVudSwgaW5kZXgpID0+XG4gICAgICAgICAgICBtZW51LmRyb3Bkb3duID8gKFxuICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IHN4PXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU1vYmlsZU1lbnUobWVudS5sYWJlbCl9XG4gICAgICAgICAgICAgICAgICBlbmRJY29uPXs8RXhwYW5kTW9yZUljb24gLz59XG4gICAgICAgICAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTZweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHttZW51LmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIHttb2JpbGVNZW51T3BlblttZW51LmxhYmVsXSAmJiAoXG4gICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjk4MGI5JyxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KScsXG4gICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICcxNTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxLFxuICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge21lbnUuZHJvcGRvd24ubWFwKChpdGVtLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudD17TGlua31cbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0ucGF0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKHt9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgY29tcG9uZW50PXtMaW5rfVxuICAgICAgICAgICAgICAgIGhyZWY9e21lbnUucGF0aH1cbiAgICAgICAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDE2cHgnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge21lbnUubGFiZWx9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgKVxuICAgICAgICAgICl9XG4gICAgICAgICAgeyF1c2VyID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGNvbXBvbmVudD17TGlua31cbiAgICAgICAgICAgICAgICBocmVmPVwiL2F1dGgvc2lnbmluXCJcbiAgICAgICAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDE2cHgnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknIH0sXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBjb21wb25lbnQ9e0xpbmt9XG4gICAgICAgICAgICAgICAgaHJlZj1cIi9hdXRoL3NpZ251cFwiXG4gICAgICAgICAgICAgICAgc3g9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGRkQ3MDAnLFxuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMGI5Mjk5JyxcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTZweCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7IGJhY2tncm91bmRDb2xvcjogJyNmZmVhMDAnIH0sXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMb2dvdXR9XG4gICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAnJjpob3Zlcic6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJyB9LFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBMb2dvdXRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIHsvKiBNb2JpbGUgTWVudSBCdXR0b24gKi99XG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgZWRnZT1cImVuZFwiXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlRHJhd2VyKHRydWUpfVxuICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICBkaXNwbGF5OiB7IHhzOiAnYmxvY2snLCBtZDogJ25vbmUnIH0sXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknLFxuICAgICAgICAgICAgJyY6aG92ZXInOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScgfSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPE1lbnVJY29uIHN4PXt7IGZvbnRTaXplOiAnMjhweCcgfX0gLz5cbiAgICAgICAgPC9JY29uQnV0dG9uPlxuXG4gICAgICAgIHsvKiBNb2JpbGUgRHJhd2VyICovfVxuICAgICAgICA8RHJhd2VyXG4gICAgICAgICAgYW5jaG9yPVwicmlnaHRcIlxuICAgICAgICAgIG9wZW49e2RyYXdlck9wZW59XG4gICAgICAgICAgb25DbG9zZT17dG9nZ2xlRHJhd2VyKGZhbHNlKX1cbiAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgJyYgLk11aURyYXdlci1wYXBlcic6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHsgeHM6ICc4MHZ3Jywgc206ICczMDBweCcgfSxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMGI5Mjk5JyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDAuM3MgZWFzZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1iOiAyIH19PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgc3g9e3sgY29sb3I6ICd3aGl0ZScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICAgICAgTWVudVxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgPEljb25CdXR0b24gb25DbGljaz17dG9nZ2xlRHJhd2VyKGZhbHNlKX0gc3g9e3sgY29sb3I6ICd3aGl0ZScgfX0+XG4gICAgICAgICAgICAgIDxDbG9zZUljb24gLz5cbiAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8RGl2aWRlciBzeD17eyBteTogMiwgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpJyB9fSAvPlxuICAgICAgICAgIDxMaXN0IHJlZj17bW9iaWxlRHJvcGRvd25SZWZ9PlxuICAgICAgICAgICAge21lbnVJdGVtcy5tYXAoKG1lbnUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICBtZW51LmRyb3Bkb3duID8gKFxuICAgICAgICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU1vYmlsZU1lbnUobWVudS5sYWJlbCl9XG4gICAgICAgICAgICAgICAgICAgIHN4PXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBjb2xvcjogJ3doaXRlJyB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1UZXh0XG4gICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17bWVudS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VHlwb2dyYXBoeVByb3BzPXt7IGZvbnRTaXplOiAnMTZweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8RXhwYW5kTW9yZUljb24gc3g9e3sgY29sb3I6ICd3aGl0ZScsIHRyYW5zZm9ybTogbW9iaWxlTWVudU9wZW5bbWVudS5sYWJlbF0gPyAncm90YXRlKDE4MGRlZyknIDogJ3JvdGF0ZSgwZGVnKScsIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4zcycgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICAgICAgICB7bW9iaWxlTWVudU9wZW5bbWVudS5sYWJlbF0gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8Qm94IHN4PXt7IHBsOiA0IH19PlxuICAgICAgICAgICAgICAgICAgICAgIHttZW51LmRyb3Bkb3duLm1hcCgoaXRlbSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ9e0xpbmt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0ucGF0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VOYXZiYXJBbmROYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3g9e3sgcGFkZGluZzogJzEwcHggMTZweCcsIGNvbG9yOiAnd2hpdGUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17aXRlbS5sYWJlbH0gcHJpbWFyeVR5cG9ncmFwaHlQcm9wcz17eyBmb250U2l6ZTogJzE0cHgnIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPExpc3RJdGVtXG4gICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAgICAgICBjb21wb25lbnQ9e0xpbmt9XG4gICAgICAgICAgICAgICAgICBocmVmPXttZW51LnBhdGh9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU5hdmJhckFuZE5hdmlnYXRlfVxuICAgICAgICAgICAgICAgICAgc3g9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGNvbG9yOiAnd2hpdGUnIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dCBwcmltYXJ5PXttZW51LmxhYmVsfSBwcmltYXJ5VHlwb2dyYXBoeVByb3BzPXt7IGZvbnRTaXplOiAnMTZweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fSAvPlxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgIDxEaXZpZGVyIHN4PXt7IG15OiAyLCBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknIH19IC8+XG4gICAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6IDIgfX0+XG4gICAgICAgICAgICB7IXVzZXIgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgY29tcG9uZW50PXtMaW5rfVxuICAgICAgICAgICAgICAgICAgaHJlZj1cIi9hdXRoL3NpZ25pblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU5hdmJhckFuZE5hdmlnYXRlfVxuICAgICAgICAgICAgICAgICAgc3g9e3tcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzJweCBzb2xpZCB3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDIwcHgnLFxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScgfSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2lnbiBJblxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudD17TGlua31cbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIvYXV0aC9zaWdudXBcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VOYXZiYXJBbmROYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGRkQ3MDAnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwYjkyOTknLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZlYTAwJyB9LFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTaWduIFVwXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGhhbmRsZUxvZ291dCgpO1xuICAgICAgICAgICAgICAgICAgY2xvc2VOYXZiYXJBbmROYXZpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgc3g9e3tcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkIHdoaXRlJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAyMHB4JyxcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzogeyBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknIH0sXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIExvZ291dFxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvRHJhd2VyPlxuICAgICAgPC9Ub29sYmFyPlxuICAgIDwvQXBwQmFyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyOyJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVJvdXRlciIsIkxpbmsiLCJzaWduT3V0IiwiYXV0aCIsInVzZUF1dGgiLCJBcHBCYXIiLCJUb29sYmFyIiwiVHlwb2dyYXBoeSIsIkljb25CdXR0b24iLCJEcmF3ZXIiLCJMaXN0IiwiTGlzdEl0ZW0iLCJMaXN0SXRlbVRleHQiLCJCb3giLCJEaXZpZGVyIiwiQnV0dG9uIiwiTWVudUljb24iLCJDbG9zZUljb24iLCJFeHBhbmRNb3JlSWNvbiIsImltYWdlTG9nbyIsIk5hdmJhciIsImRyYXdlck9wZW4iLCJzZXREcmF3ZXJPcGVuIiwibW9iaWxlTWVudU9wZW4iLCJzZXRNb2JpbGVNZW51T3BlbiIsImlzQ2xpZW50Iiwic2V0SXNDbGllbnQiLCJkZXNrdG9wRHJvcGRvd25SZWYiLCJtb2JpbGVEcm9wZG93blJlZiIsInJvdXRlciIsInVzZXIiLCJoYW5kbGVSZXNpemUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja091dHNpZGUiLCJldmVudCIsImlzT3V0c2lkZURlc2t0b3AiLCJjdXJyZW50IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJpc091dHNpZGVNb2JpbGUiLCJkb2N1bWVudCIsImhhbmRsZUxvZ291dCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicHVzaCIsImNhdGNoIiwiZXJyb3IiLCJ0b2dnbGVEcmF3ZXIiLCJvcGVuIiwidG9nZ2xlTW9iaWxlTWVudSIsIm1lbnVMYWJlbCIsInByZXYiLCJjbG9zZU5hdmJhckFuZE5hdmlnYXRlIiwibWVudUl0ZW1zIiwibGFiZWwiLCJwYXRoIiwiZHJvcGRvd24iLCJwb3NpdGlvbiIsInN4IiwiYmFja2dyb3VuZENvbG9yIiwiYm94U2hhZG93IiwidG9wIiwiekluZGV4IiwianVzdGlmeUNvbnRlbnQiLCJwYWRkaW5nIiwieHMiLCJtZCIsInZhcmlhbnQiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImhyZWYiLCJpbWciLCJzcmMiLCJhbHQiLCJzdHlsZSIsImhlaWdodCIsIm9iamVjdEZpdCIsInRyYW5zaXRpb24iLCJ0cmFuc2Zvcm0iLCJnYXAiLCJyZWYiLCJtYXAiLCJtZW51IiwiaW5kZXgiLCJvbkNsaWNrIiwiZW5kSWNvbiIsImNvbG9yIiwiZm9udFdlaWdodCIsInRleHRUcmFuc2Zvcm0iLCJib3JkZXJSYWRpdXMiLCJsZWZ0IiwibWluV2lkdGgiLCJvdmVyZmxvdyIsIml0ZW0iLCJpZHgiLCJjb21wb25lbnQiLCJ0ZXh0QWxpZ24iLCJlZGdlIiwiZm9udFNpemUiLCJhbmNob3IiLCJvbkNsb3NlIiwid2lkdGgiLCJzbSIsImJveFNpemluZyIsIm1iIiwibXkiLCJidXR0b24iLCJwcmltYXJ5IiwicHJpbWFyeVR5cG9ncmFwaHlQcm9wcyIsInBsIiwiZmxleERpcmVjdGlvbiIsImJvcmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/components/Navbar.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/footer.js":
/*!*****************************!*\
  !*** ./src/pages/footer.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Footer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"@fortawesome/react-fontawesome\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ \"@fortawesome/free-brands-svg-icons\");\n/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ \"@fortawesome/free-solid-svg-icons\");\n/* harmony import */ var _styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/Footer.module.css */ \"(pages-dir-node)/./src/styles/Footer.module.css\");\n/* harmony import */ var _styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__]);\n([_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// src/components/Footer.js\n\n\n\n\n\n\nfunction Footer() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n        className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footer),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerContent),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerSection),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: \"About Me\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 13,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Welcome to our space! Moms from all around the world, let's come together to share our experiences, support one another, and dive into the beautiful journey of motherhood. Whether you're an immigrant mom or a mom from any corner of the globe, this blog is a place for all of us to connect, learn, and grow together.\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 14,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerSection),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: \"Quick Links\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 19,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/about\",\n                                            children: \"About\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 21,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 21,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/contact\",\n                                            children: \"Contact Us\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 22,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 22,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/productsreview\",\n                                            children: \"Products Review\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 23,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 23,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/recipe\",\n                                            children: \"Recipe\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 24,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 24,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/blog\",\n                                            children: \"Blog\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 25,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 25,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 20,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerSection),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: \"Follow Me\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 29,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().socialIcons),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        href: \"https://facebook.com\",\n                                        target: \"_blank\",\n                                        rel: \"noopener noreferrer\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n                                            icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faFacebookF,\n                                            size: \"2x\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 32,\n                                            columnNumber: 15\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 31,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        href: \"https://www.instagram.com/the_stylishmama?igsh=MWhmaXJoYWRlNDRhOA%3D%3D&utm_source=qr\",\n                                        target: \"_blank\",\n                                        rel: \"noopener noreferrer\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n                                            icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faInstagram,\n                                            size: \"2x\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                            lineNumber: 39,\n                                            columnNumber: 15\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 34,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 30,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerSection),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: \"Contact Me\"\n                            }, void 0, false, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 44,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n                                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faEnvelope,\n                                        size: \"lg\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                        lineNumber: 46,\n                                        columnNumber: 13\n                                    }, this),\n                                    \" fatimarezaie1234@gmail.com\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                                lineNumber: 45,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Footer_module_css__WEBPACK_IMPORTED_MODULE_5___default().footerBottom),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: [\n                        \"\\xa9 \",\n                        new Date().getFullYear(),\n                        \" All Rights Reserved.\"\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                    lineNumber: 51,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/barkatalikamran/Desktop/stylishmom/src/pages/footer.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9mb290ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBMkI7O0FBQ0U7QUFDb0M7QUFDYTtBQUNmO0FBQ2Q7QUFFbEMsU0FBU007SUFDdEIscUJBQ0UsOERBQUNDO1FBQU9DLFdBQVdILHlFQUFhOzswQkFDOUIsOERBQUNJO2dCQUFJRCxXQUFXSCxnRkFBb0I7O2tDQUNsQyw4REFBQ0k7d0JBQUlELFdBQVdILGdGQUFvQjs7MENBQ2xDLDhEQUFDTzswQ0FBRzs7Ozs7OzBDQUNKLDhEQUFDQzswQ0FBRTs7Ozs7Ozs7Ozs7O2tDQUlMLDhEQUFDSjt3QkFBSUQsV0FBV0gsZ0ZBQW9COzswQ0FDbEMsOERBQUNPOzBDQUFHOzs7Ozs7MENBQ0osOERBQUNFOztrREFDQyw4REFBQ0M7a0RBQUcsNEVBQUNmLGtEQUFJQTs0Q0FBQ2dCLE1BQUs7c0RBQVM7Ozs7Ozs7Ozs7O2tEQUN4Qiw4REFBQ0Q7a0RBQUcsNEVBQUNmLGtEQUFJQTs0Q0FBQ2dCLE1BQUs7c0RBQVc7Ozs7Ozs7Ozs7O2tEQUMxQiw4REFBQ0Q7a0RBQUcsNEVBQUNmLGtEQUFJQTs0Q0FBQ2dCLE1BQUs7c0RBQWtCOzs7Ozs7Ozs7OztrREFDakMsOERBQUNEO2tEQUFHLDRFQUFDZixrREFBSUE7NENBQUNnQixNQUFLO3NEQUFVOzs7Ozs7Ozs7OztrREFDekIsOERBQUNEO2tEQUFHLDRFQUFDZixrREFBSUE7NENBQUNnQixNQUFLO3NEQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHM0IsOERBQUNQO3dCQUFJRCxXQUFXSCxnRkFBb0I7OzBDQUNsQyw4REFBQ087MENBQUc7Ozs7OzswQ0FDSiw4REFBQ0g7Z0NBQUlELFdBQVdILDhFQUFrQjs7a0RBQ2hDLDhEQUFDYTt3Q0FBRUYsTUFBSzt3Q0FBdUJHLFFBQU87d0NBQVNDLEtBQUk7a0RBQ2pELDRFQUFDbkIsMkVBQWVBOzRDQUFDb0IsTUFBTW5CLDJFQUFXQTs0Q0FBRW9CLE1BQUs7Ozs7Ozs7Ozs7O2tEQUUzQyw4REFBQ0o7d0NBQ0NGLE1BQUs7d0NBQ0xHLFFBQU87d0NBQ1BDLEtBQUk7a0RBRUosNEVBQUNuQiwyRUFBZUE7NENBQUNvQixNQUFNbEIsMkVBQVdBOzRDQUFFbUIsTUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBSS9DLDhEQUFDYjt3QkFBSUQsV0FBV0gsZ0ZBQW9COzswQ0FDbEMsOERBQUNPOzBDQUFHOzs7Ozs7MENBQ0osOERBQUNDOztrREFDQyw4REFBQ1osMkVBQWVBO3dDQUFDb0IsTUFBTWpCLHlFQUFVQTt3Q0FBRWtCLE1BQUs7Ozs7OztvQ0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFJckQsOERBQUNiO2dCQUFJRCxXQUFXSCwrRUFBbUI7MEJBQ2pDLDRFQUFDUTs7d0JBQUU7d0JBQUcsSUFBSVcsT0FBT0MsV0FBVzt3QkFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXZDIiwic291cmNlcyI6WyIvVXNlcnMvYmFya2F0YWxpa2FtcmFuL0Rlc2t0b3Avc3R5bGlzaG1vbS9zcmMvcGFnZXMvZm9vdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9jb21wb25lbnRzL0Zvb3Rlci5qc1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYUZhY2Vib29rRiwgZmFJbnN0YWdyYW0gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1icmFuZHMtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhRW52ZWxvcGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvRm9vdGVyLm1vZHVsZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIoKSB7XG4gIHJldHVybiAoXG4gICAgPGZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJDb250ZW50fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJTZWN0aW9ufT5cbiAgICAgICAgICA8aDI+QWJvdXQgTWU8L2gyPlxuICAgICAgICAgIDxwPlxuICBXZWxjb21lIHRvIG91ciBzcGFjZSEgTW9tcyBmcm9tIGFsbCBhcm91bmQgdGhlIHdvcmxkLCBsZXQmYXBvcztzIGNvbWUgdG9nZXRoZXIgdG8gc2hhcmUgb3VyIGV4cGVyaWVuY2VzLCBzdXBwb3J0IG9uZSBhbm90aGVyLCBhbmQgZGl2ZSBpbnRvIHRoZSBiZWF1dGlmdWwgam91cm5leSBvZiBtb3RoZXJob29kLiBXaGV0aGVyIHlvdSZhcG9zO3JlIGFuIGltbWlncmFudCBtb20gb3IgYSBtb20gZnJvbSBhbnkgY29ybmVyIG9mIHRoZSBnbG9iZSwgdGhpcyBibG9nIGlzIGEgcGxhY2UgZm9yIGFsbCBvZiB1cyB0byBjb25uZWN0LCBsZWFybiwgYW5kIGdyb3cgdG9nZXRoZXIuXG48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvb3RlclNlY3Rpb259PlxuICAgICAgICAgIDxoMj5RdWljayBMaW5rczwvaDI+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPjxMaW5rIGhyZWY9XCIvYWJvdXRcIj5BYm91dDwvTGluaz48L2xpPlxuICAgICAgICAgICAgPGxpPjxMaW5rIGhyZWY9XCIvY29udGFjdFwiPkNvbnRhY3QgVXM8L0xpbms+PC9saT5cbiAgICAgICAgICAgIDxsaT48TGluayBocmVmPVwiL3Byb2R1Y3RzcmV2aWV3XCI+UHJvZHVjdHMgUmV2aWV3PC9MaW5rPjwvbGk+XG4gICAgICAgICAgICA8bGk+PExpbmsgaHJlZj1cIi9yZWNpcGVcIj5SZWNpcGU8L0xpbms+PC9saT5cbiAgICAgICAgICAgIDxsaT48TGluayBocmVmPVwiL2Jsb2dcIj5CbG9nPC9MaW5rPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9vdGVyU2VjdGlvbn0+XG4gICAgICAgICAgPGgyPkZvbGxvdyBNZTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zb2NpYWxJY29uc30+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9mYWNlYm9vay5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFGYWNlYm9va0Z9IHNpemU9XCIyeFwiIC8+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS90aGVfc3R5bGlzaG1hbWE/aWdzaD1NV2htYVhKb1lXUmxORFJoT0ElM0QlM0QmdXRtX3NvdXJjZT1xclwiXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhSW5zdGFncmFtfSBzaXplPVwiMnhcIiAvPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJTZWN0aW9ufT5cbiAgICAgICAgICA8aDI+Q29udGFjdCBNZTwvaDI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhRW52ZWxvcGV9IHNpemU9XCJsZ1wiIC8+IGZhdGltYXJlemFpZTEyMzRAZ21haWwuY29tXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJCb3R0b219PlxuICAgICAgICA8cD7CqSB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBBbGwgUmlnaHRzIFJlc2VydmVkLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9vdGVyPlxuICApO1xufSJdLCJuYW1lcyI6WyJMaW5rIiwiRm9udEF3ZXNvbWVJY29uIiwiZmFGYWNlYm9va0YiLCJmYUluc3RhZ3JhbSIsImZhRW52ZWxvcGUiLCJzdHlsZXMiLCJGb290ZXIiLCJmb290ZXIiLCJjbGFzc05hbWUiLCJkaXYiLCJmb290ZXJDb250ZW50IiwiZm9vdGVyU2VjdGlvbiIsImgyIiwicCIsInVsIiwibGkiLCJocmVmIiwic29jaWFsSWNvbnMiLCJhIiwidGFyZ2V0IiwicmVsIiwiaWNvbiIsInNpemUiLCJmb290ZXJCb3R0b20iLCJEYXRlIiwiZ2V0RnVsbFllYXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/footer.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/Footer.module.css":
/*!**************************************!*\
  !*** ./src/styles/Footer.module.css ***!
  \**************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"footer\": \"Footer_footer__JrJN9\",\n\t\"footerContent\": \"Footer_footerContent__6fVXO\",\n\t\"footerSection\": \"Footer_footerSection__K5TRX\",\n\t\"socialIcons\": \"Footer_socialIcons__p2DEw\",\n\t\"footerBottom\": \"Footer_footerBottom__Ch4z_\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9zdHlsZXMvRm9vdGVyLm1vZHVsZS5jc3MiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vc3JjL3N0eWxlcy9Gb290ZXIubW9kdWxlLmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJmb290ZXJcIjogXCJGb290ZXJfZm9vdGVyX19KckpOOVwiLFxuXHRcImZvb3RlckNvbnRlbnRcIjogXCJGb290ZXJfZm9vdGVyQ29udGVudF9fNmZWWE9cIixcblx0XCJmb290ZXJTZWN0aW9uXCI6IFwiRm9vdGVyX2Zvb3RlclNlY3Rpb25fX0s1VFJYXCIsXG5cdFwic29jaWFsSWNvbnNcIjogXCJGb290ZXJfc29jaWFsSWNvbnNfX3AyREV3XCIsXG5cdFwiZm9vdGVyQm90dG9tXCI6IFwiRm9vdGVyX2Zvb3RlckJvdHRvbV9fQ2g0el9cIlxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/styles/Footer.module.css\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/styles/theme.js":
/*!*****************************!*\
  !*** ./src/styles/theme.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"(pages-dir-node)/./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n// styles/theme.js\n\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            main: '#0b9299'\n        },\n        secondary: {\n            main: '#FFD700'\n        }\n    },\n    typography: {\n        fontFamily: '\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',\n        h6: {\n            fontWeight: 700\n        }\n    },\n    components: {\n        MuiButton: {\n            styleOverrides: {\n                root: {\n                    textTransform: 'none'\n                }\n            }\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9zdHlsZXMvdGhlbWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0JBQWtCO0FBQ2lDO0FBRW5ELE1BQU1DLFFBQVFELGlFQUFXQSxDQUFDO0lBQ3RCRSxTQUFTO1FBQ1BDLFNBQVM7WUFDUEMsTUFBTTtRQUNSO1FBQ0FDLFdBQVc7WUFDVEQsTUFBTTtRQUNSO0lBQ0Y7SUFDQUUsWUFBWTtRQUNWQyxZQUFZO1FBQ1pDLElBQUk7WUFDRkMsWUFBWTtRQUNkO0lBQ0Y7SUFDQUMsWUFBWTtRQUNWQyxXQUFXO1lBQ1RDLGdCQUFnQjtnQkFDZEMsTUFBTTtvQkFDSkMsZUFBZTtnQkFDakI7WUFDRjtRQUNGO0lBQ0Y7QUFDRjtBQUVGLGlFQUFlYixLQUFLQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvYmFya2F0YWxpa2FtcmFuL0Rlc2t0b3Avc3R5bGlzaG1vbS9zcmMvc3R5bGVzL3RoZW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlcy90aGVtZS5qc1xuaW1wb3J0IHsgY3JlYXRlVGhlbWUgfSBmcm9tICdAbXVpL21hdGVyaWFsL3N0eWxlcyc7XG5cbmNvbnN0IHRoZW1lID0gY3JlYXRlVGhlbWUoe1xuICAgIHBhbGV0dGU6IHtcbiAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgbWFpbjogJyMwYjkyOTknLFxuICAgICAgfSxcbiAgICAgIHNlY29uZGFyeToge1xuICAgICAgICBtYWluOiAnI0ZGRDcwMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdHlwb2dyYXBoeToge1xuICAgICAgZm9udEZhbWlseTogJ1wiUm9ib3RvXCIsIFwiSGVsdmV0aWNhXCIsIFwiQXJpYWxcIiwgc2Fucy1zZXJpZicsXG4gICAgICBoNjoge1xuICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgTXVpQnV0dG9uOiB7XG4gICAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XG4gICAgICAgICAgcm9vdDoge1xuICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ25vbmUnLCAvLyBPdmVycmlkZSBkZWZhdWx0IGJ1dHRvbiB0ZXh0IHRyYW5zZm9ybVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCB0aGVtZTsiXSwibmFtZXMiOlsiY3JlYXRlVGhlbWUiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsInNlY29uZGFyeSIsInR5cG9ncmFwaHkiLCJmb250RmFtaWx5IiwiaDYiLCJmb250V2VpZ2h0IiwiY29tcG9uZW50cyIsIk11aUJ1dHRvbiIsInN0eWxlT3ZlcnJpZGVzIiwicm9vdCIsInRleHRUcmFuc2Zvcm0iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/styles/theme.js\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,Divider,Drawer,IconButton,List,ListItem,ListItemText,Toolbar,Typography!=!./node_modules/@mui/material/index.js":
/*!*******************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=AppBar,Box,Button,Divider,Drawer,IconButton,List,ListItem,ListItemText,Toolbar,Typography!=!./node_modules/@mui/material/index.js ***!
  \*******************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppBar: () => (/* reexport safe */ _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Button: () => (/* reexport safe */ _Button_index_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   Divider: () => (/* reexport safe */ _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Drawer: () => (/* reexport safe */ _Drawer_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   IconButton: () => (/* reexport safe */ _IconButton_index_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   List: () => (/* reexport safe */ _List_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   ListItem: () => (/* reexport safe */ _ListItem_index_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   ListItemText: () => (/* reexport safe */ _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   Toolbar: () => (/* reexport safe */ _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   Typography: () => (/* reexport safe */ _Typography_index_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/AppBar/index.js\");\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Box/index.js\");\n/* harmony import */ var _Button_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Button/index.js\");\n/* harmony import */ var _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Divider/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Divider/index.js\");\n/* harmony import */ var _Drawer_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Drawer/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Drawer/index.js\");\n/* harmony import */ var _IconButton_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IconButton/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/IconButton/index.js\");\n/* harmony import */ var _List_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./List/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/List/index.js\");\n/* harmony import */ var _ListItem_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ListItem/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItem/index.js\");\n/* harmony import */ var _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListItemText/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItemText/index.js\");\n/* harmony import */ var _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Toolbar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Toolbar/index.js\");\n/* harmony import */ var _Typography_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Typography/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Typography/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__, _Drawer_index_js__WEBPACK_IMPORTED_MODULE_4__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_5__, _List_index_js__WEBPACK_IMPORTED_MODULE_6__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_8__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_9__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_10__]);\n([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__, _Drawer_index_js__WEBPACK_IMPORTED_MODULE_4__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_5__, _List_index_js__WEBPACK_IMPORTED_MODULE_6__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_8__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_9__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUFwcEJhcixCb3gsQnV0dG9uLERpdmlkZXIsRHJhd2VyLEljb25CdXR0b24sTGlzdCxMaXN0SXRlbSxMaXN0SXRlbVRleHQsVG9vbGJhcixUeXBvZ3JhcGh5IT0hLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNxRDtBQUNOO0FBQ007QUFDRTtBQUNGO0FBQ1E7QUFDWjtBQUNRO0FBQ1E7QUFDViIsInNvdXJjZXMiOlsiL1VzZXJzL2JhcmthdGFsaWthbXJhbi9EZXNrdG9wL3N0eWxpc2htb20vbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFwcEJhciB9IGZyb20gXCIuL0FwcEJhci9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJveCB9IGZyb20gXCIuL0JveC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvbiB9IGZyb20gXCIuL0J1dHRvbi9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIERpdmlkZXIgfSBmcm9tIFwiLi9EaXZpZGVyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJhd2VyIH0gZnJvbSBcIi4vRHJhd2VyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSWNvbkJ1dHRvbiB9IGZyb20gXCIuL0ljb25CdXR0b24vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0IH0gZnJvbSBcIi4vTGlzdC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3RJdGVtIH0gZnJvbSBcIi4vTGlzdEl0ZW0vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0SXRlbVRleHQgfSBmcm9tIFwiLi9MaXN0SXRlbVRleHQvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhci9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFR5cG9ncmFwaHkgfSBmcm9tIFwiLi9UeXBvZ3JhcGh5L2luZGV4LmpzXCIiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,Divider,Drawer,IconButton,List,ListItem,ListItemText,Toolbar,Typography!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=CssBaseline,ThemeProvider!=!./node_modules/@mui/material/index.js":
/*!***************************************************************************************************!*\
  !*** __barrel_optimize__?names=CssBaseline,ThemeProvider!=!./node_modules/@mui/material/index.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CssBaseline: () => (/* reexport safe */ _CssBaseline_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   ThemeProvider: () => (/* reexport safe */ _Users_barkatalikamran_Desktop_stylishmom_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider)\n/* harmony export */ });\n/* harmony import */ var _CssBaseline_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CssBaseline/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/CssBaseline/index.js\");\n/* harmony import */ var _Users_barkatalikamran_Desktop_stylishmom_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@mui/material/styles/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/styles/index.js\");\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUNzc0Jhc2VsaW5lLFRoZW1lUHJvdmlkZXIhPSEuL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQytEIiwic291cmNlcyI6WyIvVXNlcnMvYmFya2F0YWxpa2FtcmFuL0Rlc2t0b3Avc3R5bGlzaG1vbS9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ3NzQmFzZWxpbmUgfSBmcm9tIFwiLi9Dc3NCYXNlbGluZS9pbmRleC5qc1wiXG5leHBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi9Vc2Vycy9iYXJrYXRhbGlrYW1yYW4vRGVza3RvcC9zdHlsaXNobW9tL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL3N0eWxlcy9pbmRleC5qc1wiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=CssBaseline,ThemeProvider!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@emotion/cache");;

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@emotion/react");;

/***/ }),

/***/ "@fortawesome/free-brands-svg-icons":
/*!*****************************************************!*\
  !*** external "@fortawesome/free-brands-svg-icons" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/free-brands-svg-icons");;

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ }),

/***/ "@fortawesome/react-fontawesome":
/*!*************************************************!*\
  !*** external "@fortawesome/react-fontawesome" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/InitColorSchemeScript");

/***/ }),

/***/ "@mui/system/RtlProvider":
/*!******************************************!*\
  !*** external "@mui/system/RtlProvider" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/RtlProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createBreakpoints":
/*!************************************************!*\
  !*** external "@mui/system/createBreakpoints" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createBreakpoints");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/cssVars");

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/spacing");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/useThemeProps");

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils");

/***/ }),

/***/ "@mui/utils/HTMLElementType":
/*!*********************************************!*\
  !*** external "@mui/utils/HTMLElementType" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/HTMLElementType");

/***/ }),

/***/ "@mui/utils/appendOwnerState":
/*!**********************************************!*\
  !*** external "@mui/utils/appendOwnerState" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/appendOwnerState");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/createChainedFunction":
/*!***************************************************!*\
  !*** external "@mui/utils/createChainedFunction" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/createChainedFunction");

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/debounce");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/deprecatedPropType":
/*!************************************************!*\
  !*** external "@mui/utils/deprecatedPropType" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/deprecatedPropType");

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/elementAcceptingRef");

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/elementTypeAcceptingRef");

/***/ }),

/***/ "@mui/utils/extractEventHandlers":
/*!**************************************************!*\
  !*** external "@mui/utils/extractEventHandlers" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/extractEventHandlers");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/getReactElementRef":
/*!************************************************!*\
  !*** external "@mui/utils/getReactElementRef" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/getReactElementRef");

/***/ }),

/***/ "@mui/utils/integerPropType":
/*!*********************************************!*\
  !*** external "@mui/utils/integerPropType" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/integerPropType");

/***/ }),

/***/ "@mui/utils/isFocusVisible":
/*!********************************************!*\
  !*** external "@mui/utils/isFocusVisible" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/isFocusVisible");

/***/ }),

/***/ "@mui/utils/isMuiElement":
/*!******************************************!*\
  !*** external "@mui/utils/isMuiElement" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/isMuiElement");

/***/ }),

/***/ "@mui/utils/mergeSlotProps":
/*!********************************************!*\
  !*** external "@mui/utils/mergeSlotProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/mergeSlotProps");

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/ownerDocument");

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/ownerWindow");

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/refType");

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/requirePropFactory");

/***/ }),

/***/ "@mui/utils/resolveComponentProps":
/*!***************************************************!*\
  !*** external "@mui/utils/resolveComponentProps" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/resolveComponentProps");

/***/ }),

/***/ "@mui/utils/resolveProps":
/*!******************************************!*\
  !*** external "@mui/utils/resolveProps" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/resolveProps");

/***/ }),

/***/ "@mui/utils/setRef":
/*!************************************!*\
  !*** external "@mui/utils/setRef" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/setRef");

/***/ }),

/***/ "@mui/utils/unsupportedProp":
/*!*********************************************!*\
  !*** external "@mui/utils/unsupportedProp" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/unsupportedProp");

/***/ }),

/***/ "@mui/utils/useControlled":
/*!*******************************************!*\
  !*** external "@mui/utils/useControlled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useControlled");

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useEnhancedEffect");

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useEventCallback");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "@mui/utils/useId":
/*!***********************************!*\
  !*** external "@mui/utils/useId" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useId");

/***/ }),

/***/ "@mui/utils/useLazyRef":
/*!****************************************!*\
  !*** external "@mui/utils/useLazyRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useLazyRef");

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useTimeout");

/***/ }),

/***/ "@tiptap/core":
/*!*******************************!*\
  !*** external "@tiptap/core" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/core");;

/***/ }),

/***/ "@tiptap/extension-color":
/*!******************************************!*\
  !*** external "@tiptap/extension-color" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-color");;

/***/ }),

/***/ "@tiptap/extension-font-family":
/*!************************************************!*\
  !*** external "@tiptap/extension-font-family" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-font-family");;

/***/ }),

/***/ "@tiptap/extension-image":
/*!******************************************!*\
  !*** external "@tiptap/extension-image" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-image");;

/***/ }),

/***/ "@tiptap/extension-link":
/*!*****************************************!*\
  !*** external "@tiptap/extension-link" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-link");;

/***/ }),

/***/ "@tiptap/extension-text-align":
/*!***********************************************!*\
  !*** external "@tiptap/extension-text-align" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-text-align");;

/***/ }),

/***/ "@tiptap/extension-text-style":
/*!***********************************************!*\
  !*** external "@tiptap/extension-text-style" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-text-style");;

/***/ }),

/***/ "@tiptap/extension-underline":
/*!**********************************************!*\
  !*** external "@tiptap/extension-underline" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/extension-underline");;

/***/ }),

/***/ "@tiptap/react":
/*!********************************!*\
  !*** external "@tiptap/react" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/react");;

/***/ }),

/***/ "@tiptap/starter-kit":
/*!**************************************!*\
  !*** external "@tiptap/starter-kit" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tiptap/starter-kit");;

/***/ }),

/***/ "clsx?9dfb":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("clsx");;

/***/ }),

/***/ "clsx?ce27":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("clsx");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui","vendor-chunks/@babel"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.js")));
module.exports = __webpack_exports__;

})();