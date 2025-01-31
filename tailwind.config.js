module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        "card-shine": "card-shine 6s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        shake: "shake 0.8s cubic-bezier(.36,.07,.19,.97) both",
        blob: "blob 7s infinite",
        "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
      },
      keyframes: {
        "card-shine": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(239,68,68,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(239,68,68,0.5)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            backgroundColor: "#3B82F6", // blue-500
          },
          "50%": {
            transform: "translateY(-12px)",
            backgroundColor: "#60A5FA", // blue-400
          },
        },
        topBounce: {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translateY(-20px) scale(1.1)",
            opacity: "1",
          },
        },
        sideBounce: {
          "0%, 100%": {
            transform: "translateX(0) scale(1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translateX(0) scale(1.1)",
            opacity: "1",
          },
        },
        bottomBounce: {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translateY(20px) scale(1.1)",
            opacity: "1",
          },
        },
        centerBounce: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "1",
          },
        },
        orbitBounce: {
          "0%, 100%": {
            transform: "scale(1) translateY(0)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(1.3) translateY(-4px)",
            opacity: "1",
          },
        },
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
      utilities: {
        ".animation-delay-2000": {
          "animation-delay": "2s",
        },
        ".animation-delay-4000": {
          "animation-delay": "4s",
        },
      },
    },
  },
};
