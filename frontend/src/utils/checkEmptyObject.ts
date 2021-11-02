export function checkEmptyObject(obj: any): boolean {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length === 0;
  }
  return false;
}
