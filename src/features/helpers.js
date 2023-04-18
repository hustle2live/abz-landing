const cutLength = 24;
const extensionLength = -4;

export const cutElementsName = (obj) =>
   [...obj.name]
      .slice(0, cutLength)
      .slice(0, extensionLength)
      .concat('... ' + [...obj.name].slice(extensionLength).join(''))
      .join('');

export const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;

export const regExpEmail =
   /^[a-z0-9_-]+[a-z0-9_.]*?@[a-z0-9_-]+?\.[a-zA-Z0-9]{2,6}$/;

export const regExpPhone = /^\+380[\d]+$/;

export const functionRejected = (state, action) => {
   state.status = 'rejected';
   state.error = action.payload;
};