import { typeOf, clamp } from '../utils';
import { easingFunctions } from '../constants';
const AnimaType = (function() {
  const Class = class {
    #frame;
    #allowance;
    #easingFunc;
    constructor(_config) {
      const config = typeOf.object(_config) ? _config : {};
      this._value = config.value;
      this._from = typeOf.none(this.value) ? config.from : this.value;
      this._to = typeOf.none(this.value) ? config.to : this.value;
      if(typeOf.none(this._value) && (typeOf.none(this._from) || typeOf.none(this._to))) this._value = 0;
      this.#frame = typeOf.number(config.frame) ? clamp(1, config.frame, Infinity) : 1000;
      this.#easingFunc = typeOf.function(config.easingFunc) ? config.easingFunc : easingFunctions.easeOutCubic;
      this.#allowance = typeOf.number(config.allowance) ? clamp(0.0, config.allowance, 1.0) : 0.2;
    }
    set value(v) { this._value = v; }
    get value() { return this._value; }
    set from(v) { this._from = v; }
    get from() { return this._from || this._value; }
    set to(v) { this._to = v; }
    get to() { return this._to || this._value; }
    set frame(v) { this.#frame = typeOf.number(v) ? clamp(1, v, Infinity) : 1000; }
    get frame() { return this.#frame; }
    set easingFunc(v) { this.#easingFunc = typeOf.function(v) ? v : easingFunctions.easeOutCubic; }
    get easingFunc() { return this.#easingFunc; }
    set allowance(v) { this.#allowance = typeOf.number(v) ? clamp(0.0, v, 1.0) : 0.2; }
    get allowance() { return this.#allowance; }

    getValue(_frame) {
      return this.from;
    }
  };
  return Class;
})();
export { AnimaType };