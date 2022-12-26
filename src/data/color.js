import { typeOf, clamp } from '../utils';
import { AnimaType } from './Base';
const AnimaTypeColor = (function() {
  const Class = class extends AnimaType {
    static reRGB = /^#(?<r>[0-9A-Fa-f])(?<g>[0-9A-Fa-f])(?<b>[0-9A-Fa-f])$/;
    static reRRGGBB = /^#(?<r>[0-9A-Fa-f]{2})(?<g>[0-9A-Fa-f]{2})(?<b>[0-9A-Fa-f]{2})$/;
    constructor(init) {
      super(init);
    }

    set value(v) { this._value = typeOf.number(v) ? v : 0; }
    get value() { return this._value; }
    set from(v) { this._from = typeOf.number(v) ? v : 0; }
    get from() { return typeOf.number(this.value) ? this.value : this._from; }
    set to(v) { this._to = typeOf.number(v) ? v : 0; }
    get to() { return typeOf.number(this.value) ? this.value : this._to; }
    
    static get24BitColorByRGB(_red, _green, _blue) {
      const red = clamp(0, _red, 255);
      const green = clamp(0, _green, 255);
      const blue = clamp(0, _blue, 255);
      return ((red << 16) | (green << 8) | (blue << 0));
    }

    static getStringColorByRGB(_red, _green, _blue) {
      const number = clamp(0, Class.get24BitColorByRGB(_red, _green, _blue), 16777215);
      const strColor = number.toString(16);
      const zeroPadding = new Array(...'000000').map((v, i) => i >= strColor.length ? '0' : '').join('');
      return `#${zeroPadding}${strColor}`;
    }

    static getRGBBy24BitColor(_color) {
      const color = typeOf.number(_color) ? clamp(0, _color, 16777215) : 0;
      return [(color >> 16 & 0xff), (color >> 8 & 0xff), (color >> 0 & 0xff)];
    }

    static getRGBByStringColor(_color) {
      const stringColor = typeOf.string(_color) ? typeOf.rgb(_color) ? _color : '#000000' : '#000000';
      let mColor = {groups: {r: 0, g: 0, b: 0}};
      if(Class.reRGB.test(stringColor)) {
        mColor = stringColor.match(Class.reRGB);
      } else if(Class.reRRGGBB.test(stringColor)) {
        mColor = stringColor.match(Class.reRRGGBB);
      } else {
        // 想定外
      }
      return [parseInt(mColor.groups.r, 16), parseInt(mColor.groups.g, 16), parseInt(mColor.groups.b, 16)];
    }

    getValue(_frame) {
      const frame = typeOf.number(_frame) ? _frame : 0;
      const halfAllowance = this.allowance / 2;
      const allowanceFrame = Math.round(halfAllowance * this.frame);
      if(frame <= allowanceFrame) return this.from;
      if(frame >= this.frame - allowanceFrame) return this.to;
      const [redA, greenA, blueA] = Class.getRGBByStringColor(this.from);
      const [redB, greenB, blueB] = Class.getRGBByStringColor(this.to);
      const iAllowance = (1.0 - this.allowance);
      const trueFrame = Math.round(iAllowance * this.frame);
      const progress = this.easingFunc(clamp(0, (frame - allowanceFrame), trueFrame) / trueFrame);
      const red = redA + Math.round((redB - redA) * progress);
      const green = greenA + Math.round((greenB - greenA) * progress);
      const blue = blueA + Math.round((blueB - blueA) * progress);
      return Class.getStringColorByRGB(red, green, blue);
    }
  };
  return Class;
})();
export { AnimaTypeColor };