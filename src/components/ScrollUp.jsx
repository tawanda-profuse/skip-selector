import React, { useEffect } from "react";

const ScrollUp = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollUpButton = document.getElementById("scroll-up-btn");

      if (scrollY > 100) {
        scrollUpButton.classList.add("block");
        scrollUpButton.classList.remove("hidden");
      } else {
        scrollUpButton.classList.add("hidden");
        scrollUpButton.classList.remove("block");
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="scroll-up-btn"
      className="hidden fixed bottom-4 left-4 rounded-full w-[3.5rem] h-[3.5rem] bg-[var(--primary)] text-white text-2xl transition-all cursor-pointer hover:scale-[0.9]"
      title="Scroll up"
      onClick={() => window.scrollTo(0, 0)}
    >
      <i className="fas fa-arrow-up animate-bounce"></i>
    </button>
  );
};

export default ScrollUp;
