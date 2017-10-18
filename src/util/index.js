export function overlap(x1, x2, y1, y2, detectEqual) {
  if (detectEqual) {
    return x1 <= y2 && y1 <= x2;
  }
  return x1 < y2 && y1 < x2;
}

export function foo() {
  return 'bar';
}
