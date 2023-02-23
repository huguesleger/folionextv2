// Map number x from range [a, b] to [c, d]
const map = (x: any, a: any, b: any, c: any, d: any) =>
  ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a: any, b: any, n: any): any => (1 - n) * a + n * b;

const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (ev: any) => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

export { map, lerp, clamp, getMousePos };
