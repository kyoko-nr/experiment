export const interactP = {
  x: 1,
  y: 1
}

export const setupInteraction = () => {
  document.addEventListener("pointermove", (e: PointerEvent) => {
    const rect =(e.target as HTMLElement).getBoundingClientRect();
    const norm = normalizedP({x: e.clientX, y: e.clientY}, {x: rect.width, y: rect.height});
    interactP.x = norm.x;
    interactP.y = norm.y;
  })
}

const normalizedP = (current: {x: number, y: number}, max: {x: number, y: number}) => {
  return {x: current.x / max.x, y: current.y / max.y};
}