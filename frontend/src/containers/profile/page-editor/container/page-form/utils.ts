export function getStyleLockHorizontalDrag(style: any, snapshot: any) {
  if (style.transform) {
    const axisLockY = `translate(0px${style.transform.slice(
      style?.transform?.indexOf(','),
      style.transform.length
    )}`;
    return {
      ...style,
      transform: `${axisLockY} rotate(${snapshot?.isDragging ? -2 : 0}deg)`,
    };
  }
  return style;
}
