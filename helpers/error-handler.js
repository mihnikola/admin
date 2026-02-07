// error-handler.js
let showErrorFn = () => {};

export const registerErrorHandler = (fn) => {
  showErrorFn = fn;
};

export const showError = (title) => {
  showErrorFn(title);
};
