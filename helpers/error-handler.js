// global-handler.js

let handler = () => {};

export const registerGlobalHandler = (fn) => {
  handler = fn;
};

export const showGlobalMessage = (data) => {
  handler(data);
};