module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        "card-shine": "card-shine 6s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
      },
      keyframes: {
        "card-shine": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(239,68,68,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(239,68,68,0.5)" },
        },
      },
    },
  },
};
