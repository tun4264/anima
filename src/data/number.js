import { typeOf, clamp } from '../utils';
import { AnimaType } from './Base';
const AnimaTypeNumber = (function() {
  const Class = class extends AnimaType {
    constructor(init) {
      super(init);
    }
  
    set value(v) { this._value = typeOf.number(v) ? v : 0; }
    get value() { return this._value; }
    set from(v) { this._from = typeOf.number(v) ? v : 0; }
    get from() { return typeOf.number(this.value) ? this.value : this._from; }
    set to(v) { this._to = typeOf.number(v) ? v : 0; }
    get to() { return typeOf.number(this.value) ? this.value : this._to; }
  
    getValue(_frame) {
      if(typeOf.number(this.value)) return this.value;
      const frame = typeOf.number(_frame) ? _frame : 0;
      const halfAllowance = this.allowance / 2;
      const allowanceFrame = Math.round(halfAllowance * this.frame);
      if(frame <= allowanceFrame) return this.from;
      if(frame >= this.frame - allowanceFrame) return this.to;
      const delta = (this.to - this.from);
      const iAllowance = (1.0 - this.allowance);
      const trueFrame = Math.round(iAllowance * this.frame);
      const progress = this.easingFunc(clamp(0, frame - allowanceFrame, trueFrame) / trueFrame);
      return this.from + (delta * progress);
    }
  };
  return Class;
})();
export { AnimaTypeNumber };