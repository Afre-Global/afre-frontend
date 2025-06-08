export function isDecimal(num: number): boolean {
  return !Number.isInteger(num);
}

export function isInteger(num: number): boolean {
  return Number.isInteger(num);
}
