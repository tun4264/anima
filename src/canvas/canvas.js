import { typeOf } from '../utils';

const AnimaCanvas = (function() {
  const Class = class {
    #domElement;
    #objects;
    #currentTime = 0;
    #frameID = null;
    #fps;
    constructor(_canvas, _config) {
      const config = typeOf.object(_config) ? _config : {};
      this.#domElement = _canvas instanceof HTMLCanvasElement ? _canvas : document.createElement('canvas');
      this.#objects = [];
      this.#fps = typeof config.fps === 'number' ? config.fps : 60;
    }

    get add() { return this.#add; }
    get start() { return this.#start; }
    get stop() { return this.#stop; }
    get reset() { return this.#reset; }
    get seek() { return this.#seek; }
    
    set currentTime(v) { this.#currentTime = typeof v === 'number' ? v : 0; }
    get currentTime() { return this.#currentTime; }
    get domElement() { return this.#domElement; }
    get ctx() { return this.domElement.getContext('2d'); }
    set width(v) {
      if(typeof v !== 'number' && typeof v !== 'string') return;
      return this.domElement.setAttribute('width', `${v}`);
    }
    get width() { return this.domElement.getAttribute('width'); }
    set height(v) {
      if(typeof v !== 'number' && typeof v !== 'string') return;
      return this.domElement.setAttribute('height', `${v}`);
    }
    get height() { return this.domElement.getAttribute('height'); }

    #add(object) {
      return this.#objects.push(object);
    }

    #start(_stopTime=Infinity) {
      const classThis = this;
      const startTime = this.#currentTime;
      const maxFrames = this.#objects.map((v) => v.maxFrame);
      const stopTime = Math.min(_stopTime, ...maxFrames);
      let startTimestamp = null;
      let oldTimestamp = 0;
      let deltaTime = 0;
      const renderer = function(timestamp) {
        startTimestamp = startTimestamp == null ? timestamp : startTimestamp;
        deltaTime = timestamp - oldTimestamp;
        if(timestamp - oldTimestamp >= (1 / classThis.#fps)) {
          classThis.currentTime = startTime + (timestamp - startTimestamp);
          classThis.ctx.clearRect(0, 0, classThis.width, classThis.height);
          for(let i = 0; i < classThis.#objects.length; i++) {
            classThis.#objects[i].draw(classThis.ctx, classThis.currentTime, classThis.width, classThis.height);
          }
          oldTimestamp = timestamp;
        }
        if(classThis.currentTime < stopTime) {
          classThis.#frameID = requestAnimationFrame(renderer);
        } else {
          //console.log(stopTime, classThis.currentTime);
          classThis.#frameID = null;
        }
      };
      requestAnimationFrame(renderer);
    }

    #stop() {
      if(this.#frameID) {
        cancelAnimationFrame(this.#frameID);
        this.#frameID = null;
      }
    }

    #reset() {
      if(!this.#frameID) {
        this.currentTime = 0;
        this.start(0);
      }
    }

    #seek(_time) {
      this.currentTime = _time;
      this.start(0);
    }
  };
  return Class;
})();
export { AnimaCanvas };