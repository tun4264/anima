import { typeOf, clamp } from '../utils';
import { AnimaType } from './Base';
import { AnimaTypeNumber } from './Number';
import { AnimaTypeColor } from './Color';
const value2AnimaType = function(_value) {
  if(typeOf.number(_value)) {
    return new AnimaTypeNumber({value: _value});
  }
  if(typeOf.string(_value)) {
    const c = AnimaTypeColor.reRGB.test(_value) || AnimaTypeColor.reRRGGBB.test(_value) ? _value : '#000000';
    return new AnimaTypeColor({value: c});
  }
  if(typeOf.object(_value)) {
    const v = _value.from || _value.value;
    if(typeOf.number(v)) {
      return new AnimaTypeNumber(_value);
    }
    if(typeOf.string(v) && (AnimaTypeColor.reRGB.test(v) || AnimaTypeColor.reRRGGBB.test(v))) {
      return new AnimaTypeColor(_value);
    }
  }
  if(_value instanceof AnimaType) {
    return _value;
  }
  throw new TypeError('type conversion failed');
};
const AnimaObject = (function() {
  const Class = class {
    #properties;
    constructor(variables) {
      const vars = typeOf.object(variables) ? variables : {};
      this.#properties = {};
      Object.entries(vars).forEach((v) => {
        const [pn, pv] = v;
        const npv = typeOf.array(pv) ? pv.map((v) => value2AnimaType(v)) : [value2AnimaType(pv)];
        this.#properties[pn] = npv;
        Object.defineProperty(this, pn, {configurable: false, enumerable: true, get: () => npv});
      });
    }
  
    get properties() { return this.#properties; }
  
    get maxFrame() {
      const frames = Object.values(this.properties).map((v) => {
        if(!typeOf.string(v) && typeOf.iterable(v)) {
          return v.reduce((pre, cur) => { return {frame: pre.frame + cur.frame};}).frame;
        } else {
          return v.frame;
        }
      });
      return Math.max(...frames);
    }
  
    getProperties(_tick) {
      const tick = typeOf.number(_tick) ? clamp(0, _tick, Infinity) : 0;
      const result = {};
      Object.entries(this.properties).forEach((v) => {
        const [pn, pv] = v;
        if(!typeOf.array(pv)) throw new TypeError('value is not Array');
        let playing = -1;
        let delay = 0;
        const end = pv.every((v, i, a) => {
          const sum = a.reduce((pre, cur, index) => {
            // AnimaVariable or number
            const p = typeOf.number(pre) ? pre : pre.frame;
            const c = typeOf.number(cur) ? cur : cur.frame;
            return (index - 1) < i ? p + c : p;
          });
          if(sum > tick) {
            playing = i;
            delay = sum - v.frame;
            return false;
          }
          return true;
        });
        if(end) playing = pv.length - 1;
        result[pn] = pv[playing].getValue(tick - delay);
      });
      return result;
    }
  };
  return Class;
})();
export { AnimaObject };