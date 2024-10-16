import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
ul,
li {
  list-style: none;
}
button {
  cursor: pointer;
  background-color: transparent;
  border: none;
}
img {
  display: block;
}
`;
