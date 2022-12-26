import { typeOf } from '../../utils';
import { AnimaObject } from '../../types/Object';
const AnimaCanvasSquare = (function() {
  const Class = class AnimaSquare extends AnimaObject {
    constructor(_config) {
      super(_config);
    }
  
    draw(_ctx, _time, _canvasWidth, _canvasHeight) {
      const prop = this.getProperties(_time);
      _ctx.fillStyle = prop.background;
      _ctx.fillRect(
        Math.round(prop.x * _canvasWidth) - Math.round(prop.width * _canvasWidth / 2),
        Math.round(prop.y * _canvasHeight) - Math.round(prop.width * _canvasHeight / 2),
        Math.round(prop.width * _canvasWidth),
        Math.round(prop.width * _canvasWidth),
      );
    }
  };
  return Class;
})();
export { AnimaCanvasSquare };