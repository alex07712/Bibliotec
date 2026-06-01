import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Card({ imageUrl, title, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) offset -= totalCards;
  else if (offset < -totalCards / 2) offset += totalCards;

  const isVisible = Math.abs(offset) <= 1;
  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring", stiffness: 260, damping: 30 }
  };

  return (
    <motion.div
      className="absolute w-1/2 md:w-1/3 h-[95%]"
      style={{ transformStyle: "preserve-3d" }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-3xl shadow-lg overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x600/e2e8f0/64748b?text=Imagen+no+disponible";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h4 className="text-white text-lg font-semibold">{title}</h4>
        </div>
      </div>
    </motion.div>
  );
}

export function Carrusel({ libros, autoplayDelay = 3000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);

  React.useEffect(() => {
    if (!isPaused && libros.length > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % libros.length);
      }, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [isPaused, activeIndex, libros.length, autoplayDelay]);

  const changeSlide = (newIndex) => {
    if (libros.length === 0) return;
    const newSafeIndex = (newIndex + libros.length) % libros.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      if (!isPaused) {
        autoplayIntervalRef.current = setInterval(() => {
          setActiveIndex(prev => (prev + 1) % libros.length);
        }, autoplayDelay);
      }
    }
  };

  const onDragEnd = (event, info) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  if (!libros.length) return null;

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {libros.map((libro, index) => (
            <Card
              key={libro._id}
              imageUrl={libro.imagen || "https://placehold.co/400x600/e2e8f0/64748b?text=Sin+portada"}
              title={libro.titulo}
              index={index}
              activeIndex={activeIndex}
              totalCards={libros.length}
            />
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => changeSlide(activeIndex - 1)}
          className="p-2 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center gap-2">
          {libros.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-6 bg-amber-500" : "w-2 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => changeSlide(activeIndex + 1)}
          className="p-2 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}