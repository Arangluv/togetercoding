import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
display: block;
}
* {
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
html {
    background-color: #222f3e;
}
body {
    a {
        text-decoration: none;
    }
/* line-height: 1; */
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
.ql-toolbar {
  background: #eaecec;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  border-bottom: none;
}
.ql-container {
    background-color: #2f3542;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    min-height: 20vh;
    font-size: 1.2vw;
    color: white;
}
.ql-picker-label::before {
    color: #2f3542;
}
.ql-picker-item::before {
    color: #2f3542;
}
.quill > .ql-container > .ql-editor.ql-blank::before{
    font-size: 15px;
    color: #f5f6fa;
    opacity: 0.5;
    white-space: pre-wrap;
}
`;
