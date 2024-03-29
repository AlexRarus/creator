export function getStyleLockHorizontalDrag(style: any, snapshot: any) {
  if (style.transform) {
    const axisLockY = `translate(0px${style.transform.slice(
      style?.transform?.indexOf(','),
      style.transform.length
    )}`;
    return {
      ...style,
      transform: axisLockY,
    };
  }
  return style;
}
