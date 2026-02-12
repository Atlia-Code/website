import { useState, useEffect, useRef } from "react";

function Cursor() {
  const cursorDotOutline = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorVisible = useRef(false);
  const cursorEnlarged = useRef(false);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { pageX: x, pageY: y } = event;
      setMousePosition({ x, y });
      positionDot(event);
    };
    const onMouseEnter = () => {
      cursorVisible.current = true;
      toggleCursorVisibility();
    };
    const onMouseLeave = () => {
      cursorVisible.current = false;
      toggleCursorVisibility();
    };
    const onMouseDown = () => {
      cursorEnlarged.current = true;
      toggleCursorSize();
    };
    const onMouseUp = () => {
      cursorEnlarged.current = false;
      toggleCursorSize();
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    requestRef.current = requestAnimationFrame(animateDotOutline);

    handleLinks();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  function positionDot(e: MouseEvent) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    endX.current = e.pageX;
    endY.current = e.pageY;
    if (cursorDot.current) {
      cursorDot.current.style.top = endY.current + "px";
      cursorDot.current.style.left = endX.current + "px";
    }
  }

  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      if (cursorDot.current) cursorDot.current.style.opacity = "1";
      if (cursorDotOutline.current) cursorDotOutline.current.style.opacity = "1";
    } else {
      if (cursorDot.current) cursorDot.current.style.opacity = "0";
      if (cursorDotOutline.current) cursorDotOutline.current.style.opacity = "0";
    }
  }

  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      if (cursorDot.current)
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(0.7)";
      if (cursorDotOutline.current)
        cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(1.67)";
    } else {
      if (cursorDot.current)
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (cursorDotOutline.current)
        cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }

  function handleLinks() {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => {
        (el as HTMLElement).style.color = "#F26522";
      });
      el.addEventListener("mouseout", () => {
        (el as HTMLElement).style.color = "";
      });
    });
  }

  const animateDotOutline = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      mousePosition.x += (endX.current - mousePosition.x) / 8;
      mousePosition.y += (endY.current - mousePosition.y) / 8;
      if (cursorDotOutline.current) {
        cursorDotOutline.current.style.top = mousePosition.y + "px";
        cursorDotOutline.current.style.left = mousePosition.x + "px";
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
}

export default Cursor;
