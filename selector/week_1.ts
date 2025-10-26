export const selector = {
  // Login page
  login: {
    username: '#userName',
    password: '#password',
    loginBtn: '#login',
    welcomeText: '#userName-value'
  },

  // Text box form
  textBox: {
    fullName: '#userName',
    email: '#userEmail',
    currentAddress: '#currentAddress',
    permanentAddress: '#permanentAddress',
    submitBtn: '#submit',
    outputBox: '#output'
  },

  // Drag and drop
  dragDrop: {
    dragMe: '#draggable',
    dropHere: '#droppable'
  },

  // Select menu
  selectMenu: {
    selectValue: '#withOptGroup',
    oldSelectMenu: '#oldSelectMenu',
    multiSelect: '#cars'
  },

  // Alerts & Frames
  alerts: {
    alertButton: '#alertButton'
  },
  frames: {
    frame1: '#frame1',
    frameBody: 'body'
  },

  // Checkbox & Radio
  checkbox: {
    expandAll: '.rct-option-expand-all',
    checkboxItems: '.rct-checkbox'
  },
  radio: {
    yesRadio: '#yesRadio',
    impressiveRadio: '#impressiveRadio',
    output: '.text-success'
  },

  // File upload/download
  uploadDownload: {
    uploadFile: '#uploadFile',
    uploadedPath: '#uploadedFilePath',
    downloadBtn: '#downloadButton'
  }
};
