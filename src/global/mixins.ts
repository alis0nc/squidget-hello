// Does not support grid layouts
// export const gap = (
//   type: "top" | "left" | "right" | "bottom",
//   size: string
// ) => {
//   const ignoreChild =
//     type === "top" || type === "left" ? "first-child" : "last-child";

//   return {
//     `& > :not(:${ignoreChild})`: {
//       `margin-${type}`: `${size}`,
//     },
//   }
// };

export const HostBlock = {
  ":host": {
    display: "block",
  },
  ":host([hidden])": {
    display: "none",
  },
};

export const text = (size?: string, color?: string) => {
  return {
    color: `${color || "var(--sl-color-gray-800)"}`,
    "font-size": `${size || "var(--sl-font-size-small)"}`,
  };
};

export const Column = {
  display: "flex",
  "flex-direction": "column",
};

export const SeparateContent = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
};

export const StarterMixin = {
  border: "1px solid grey",
  width: "300px",
  height: "300px",
  "place-self": "center",
  display: "grid",
};

export const StarterMixinInner = {
  position: "relative",
  "place-self": "center",
};
