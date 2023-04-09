export const cutElementsName = (obj) =>
  [...obj.name]
    .slice(0, 24)
    .slice(0, -4)
    .concat('... ' + [...obj.name].slice(-4).join(''))
    .join('');

export const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;

export const regExpEmail = /^[a-z 0-9 .@-_]+$/i;

export const regExpPhone = /^[\+\d]*$/;
