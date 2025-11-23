export const LoginSelectors = {
  usernameInput: '#userName',
  passwordInput: '#password',
  loginButton: '#login',
  usernameValue:'#userName-value'
};
export const BooksSelectors = {
  rows: '.rt-tbody .rt-tr-group',
  titleHeader: 'div:has-text("Title")',
  titleAnchor: '.rt-td:nth-child(2) a',
  searchBox: '#searchBox',
  numberPages:'.-pageInfo',
  rowsPerPageSelect: 'select[aria-label="rows per page"]',
  paginationInfo: '.-pagination .-pageInfo',
  nextButton: 'button[aria-label="next-page"], button:has-text("Next")',  
};
export const HeaderSelectors = {
  usernameLabel: '#userName',
  logoutButton: '#submit',
  logoutTextButton: 'button:has-text("Log out")'
};
