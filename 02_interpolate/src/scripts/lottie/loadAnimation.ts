import Lottie from "lottie-web";

export const loadAnimation = (json: string, container: HTMLElement) => {
  const animation = Lottie.loadAnimation({
    container,
    renderer: "canvas",
    loop: true,
    autoplay: true,
    animationData: JSON.parse(json) as Record<string, unknown>
  });

  const canvas = container.querySelector<HTMLCanvasElement>("canvas");
  if (canvas == null) throw new Error("canvasが存在しません。");

  return { animation, canvas };
};
