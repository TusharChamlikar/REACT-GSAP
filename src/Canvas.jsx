import canvasimage from "./canvasimage";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const gsapAnimation = gsap.to(
      { value: startIndex },
      {
        value: startIndex + numImages - 1,
        duration,
        repeat: -1,
        ease: "linear",
        onUpdate() {
          setIndex(Math.round(this.targets()[0].value));
        },
      }
    );

    return () => {
      gsapAnimation.kill();
    };
  }, [startIndex, numImages, duration]);

  useEffect(() => {
    const scale = window.devicePixelRatio
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (canvasimage[index]) {
      img.src = canvasimage[index];
      img.onload = () => {
        canvas.width = canvas.offsetWidth*scale;
        canvas.height = canvas.offsetHeight*scale;
        canvas.style.width=canvas.offsetWidth+"px";
        canvas.style.height=canvas.offsetHeight+"px";
        ctx.scale(scale,scale);
        ctx.drawImage(img, 0, 0,canvas.offsetWidth,canvas.offsetHeight);
      };
      img.onerror = () => {
        console.error(`Failed to load image at index ${index}`);
      };
    }
  }, [index]);

  return (
    <canvas
    data-scroll 
    data-scroll-speed={0.5}
    className="absolute"
      ref={canvasRef}
      style={{ width: `${size*1.4}px`, height: `${size*1.4}px`, top :`${top}%`,left:`${left}%`,zIndex:`${zIndex}` }}
      id="canvas"
    ></canvas>
  );
}

Canvas.defaultProps = {
  details: {
    startIndex: 0,
    numImages: 10,
    duration: 5,
    size: 300,
    top: 0,
    left: 0,
    zIndex: 1,
  },
};

export default Canvas;
