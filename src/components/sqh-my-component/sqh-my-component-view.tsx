import { h } from "@stencil/core";
import { LoadingState } from "../../functional-components/LoadingState";
import jss from "jss";
import preset from "jss-preset-default";
import { StarterMixin, StarterMixinInner } from "../../global/mixins";
export interface MyComponentViewProps {
  states: {
    loading: boolean;
    content: {
      myTitle: string;
    };
  };
  data: {
    firstName: string;
    lastName: string;
  };
}

const style = {
  StarterMixin: StarterMixin,
  StarterMixinInner: StarterMixinInner,
  ":host": {
    display: "grid",
    position: "relative",
    margin: "0 auto",
    height: "100vh",
    width: "100%",
  },
  Ugly: {
    fontSize: "42px",
    color: "#ff00ff",
  },
};

// JSS config
jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function MyComponentView(props: MyComponentViewProps) {
  const { states, data } = props;

  if (states.loading)
    return (
      <div class={sheet.classes.StarterMixin}>
        <style type="text/css">{styleString}</style>
        <div class={sheet.classes.Ugly}>
          <LoadingState />
        </div>
      </div>
    );

  return (
    // StarterMixin defined in ./global/mixins.ts
    <div class={sheet.classes.StarterMixin}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.Ugly}>
        {states.content.myTitle}{" "}
        <b>
          {data.firstName} {data.lastName}
        </b>
      </div>
    </div>
  );
}
