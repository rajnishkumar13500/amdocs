module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        "card-shine": "card-shine 6s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
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
      },
    },
  },
};
