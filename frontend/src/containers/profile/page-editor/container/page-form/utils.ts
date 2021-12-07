export function getStyleLockHorizontalGrag(style: any, snapshot: any) {
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

export function getDropAnimationStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation;

  // move to the right spot
  // lock horizontal dragging - не работает, а в методе выше - работает
  let axisLockY = `translate(0px, ${moveTo.y}px)`;
  if (style.transform) {
    axisLockY = `translate(0px${style.transform.slice(
      style?.transform?.indexOf(','),
      style.transform.length
    )}`;
  }

  const scale = 'scale(1.02)';

  console.log(`${axisLockY} ${scale} ${duration} ${curve}`);
  console.log('style ', style);
  // patching the existing style
  return {
    ...style,
    transform: `${scale} ${axisLockY}`,
    transition: `all ${curve} ${duration - 0.1}s`,
  };
}
