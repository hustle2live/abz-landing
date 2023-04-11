export const cutElementsName = (obj) =>
  [...obj.name]
    .slice(0, 24)
    .slice(0, -4)
    .concat('... ' + [...obj.name].slice(-4).join(''))
    .join('');

export const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;

export const regExpEmail =
  /^[a-z0-9_-]+[a-z0-9_.]*?@[a-z0-9_-]+?\.[a-zA-Z0-9]{2,6}$/;

export const regExpPhone = /^\+380[\d]+$/;
