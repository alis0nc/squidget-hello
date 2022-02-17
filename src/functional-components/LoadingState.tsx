import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

interface ILoadingStateProps {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  color?: string;
  lightColor?: string;
}

// NOTE: Loading animation is not working correctly with JSS yet.

export const LoadingState = ({
  minHeight = "100%",
  minWidth = "100%",
  maxWidth = "100%",
  color = "#ccc",
  lightColor = "#eee",
}: ILoadingStateProps) => {
  const style = {
    "@global": {
      "@keyframes dotFlashing": {
        "0%": {
          "background-color": color,
        },
        "50%": {},
        "100%": {
          "background-color": lightColor,
        },
      },
    },
    LoadingCSS: {
      position: "absolute",
      "margin-top": "64px",
      margin: "auto",
      width: "10px",
      height: "10px",
      "border-radius": "5px",
      "background-color": color,
      color: color,
      animation: "$dotFlashing 1s infinite linear alternate",
      "animation-delay": "0.5s",

      "&:before": {
        left: "-15px",
        width: "10px",
        height: "10px",
        "border-radius": "5px",
        "background-color": color,
        color: color,
        animation: "$dotFlashing 1s infinite alternate",
        "animation-delay": "0s",
        content: '""',
        position: "absolute",
      },

      "&:after": {
        left: "15px",
        width: "10px",
        height: "10px",
        "border-radius": "5px",
        "background-color": color,
        color: color,
        animation: "$dotFlashing 1s infinite alternate",
        "animation-delay": "1s",
        content: '""',
        display: "inline-block",
        position: "absolute",
        top: "0",
      },
    },

    Wrapper: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      "min-width": minWidth,
      "max-width": maxWidth,
      "min-height": minHeight,
      right: "0",
      left: "0",
      position: "absolute",
    },
  };

  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.LoadingCSS}></div>
    </div>
  );
};
