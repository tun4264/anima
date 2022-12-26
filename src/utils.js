const clamp = (min, value, max) => Math.max(Math.min(max, value), min);
const isWithinRange = (min, value, max) => min <= value ? value <= max : false;
const uuidGenerate = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g , function(c) {
    const rnd = Math.random() * 16 | 0;
    const v = c === 'x' ? rnd : (rnd & 0x3 | 0x8);
    return v.toString(16);
  });
};
const typeOf = {
  none: function(v) {
    return v == null;
  },
  array: function(v) {
    return !this.string(v) && typeOf.iterable(v);
  },
  null: function(v) {
    return v === null;
  },
  number: function(v) {
    return typeof v === 'number';
  },
  bool: function(v) {
    return typeof v === 'boolean';
  },
  function: function(v) {
    return typeof v === 'function';
  },
  string: function(v) {
    return typeof v === 'string';
  },
  undefined: function(v) {
    return  typeof v === 'undefined';
  },
  symbol: function(v) {
    return typeof v === 'symbol';
  },
  object: function(v) {
    return typeof v === 'object';
  },
  iterable: function(v) {
    return v == null ? false : typeof v[Symbol.iterator] === 'function';
  },
  class: function(i, c) {
    return this.function(c) ? i instanceof c : false;
  },
  rgb: (v) => {
    if(typeOf.string(v) && /^#[0-9A-Fa-f]{6}$/.test(v)) return true;
    if(typeOf.string(v) && /^#[0-9A-Fa-f]{3}$/.test(v)) return true;
    if(typeOf.number(v) && isWithinRange(0, v, 16777215)) return true;
    return false;
  },
};

export {
  clamp,
  isWithinRange,
  typeOf,
};