export const easingFunctions = {
  // Quad
  easeInQuad: (p) => p * p,
  easeOutQuad: (p) => 1 - (1 - p) * (1 - p),
  easeInOutQuad: (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
  // Quart
  easeInQuart: (p) => p * p * p * p,
  easeOutQuart: (p) => 1 - Math.pow(1 - p, 4),
  easeInOutQuart: (p) => p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2,
  // Expo
  easeInExpo: (p) => p === 0 ? 0 : Math.pow(2, 10 * p - 10),
  easeOutExpo: (p) => p === 1 ? 1 : 1 - Math.pow(2, -10 * p),
  easeInOutExpo: (p) => {
    return p === 0 ? 0 : p === 1 ? 1 : p < 0.5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2;
  },
  // Back
  easeInBack: (p) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * p * p * p - c1 * p * p;
  },
  easeOutBack: (p) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  },
  easeInOutBack: (p) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return p < 0.5 ? (Math.pow(2 * p, 2) * ((c2 + 1) * 2 * p - c2)) / 2 : (Math.pow(2 * p - 2, 2) * ((c2 + 1) * (p * 2 - 2) + c2) + 2) / 2;
  },
  // Sine
  easeInSine: (p) => 1 - Math.cos((p * Math.PI) / 2),
  easeOutSine: (p) => Math.sin((p * Math.PI) / 2),
  easeInOutSine: (p) => -1 * (Math.cos(Math.PI * p) - 1) / 2,
  // Cubic
  easeInCubic: (p) => p * p * p,
  easeOutCubic: (p) => 1 - Math.pow(1 - p, 3),
  easeInOutCubic: (p) => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  // Quint
  easeInQuint: (p) => p * p * p * p * p,
  easeOutQuint: (p) => 1 - Math.pow(1 - p, 5),
  easeInOutQuint: (p) => p < 0.5 ? 16 * p * p * p * p * p : 1 - Math.pow(-2 * p + 2, 5) / 2,
  // Circ
  easeInCirc: (p) => 1 - Math.sqrt(1 - Math.pow(p, 2)),
  easeOutCirc: (p) => Math.sqrt(1 - Math.pow(p - 1, 2)),
  easeInOutCirc: (p) => p < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * p, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * p + 2, 2)) + 1) / 2,
};