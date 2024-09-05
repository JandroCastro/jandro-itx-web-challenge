//babel-jest.config.js
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react", // Para transformar JSX
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src", // Alias @ para resolver a la carpeta src
        },
      },
    ],
  ],
};
