import { h } from "@stencil/core";
import { MyComponentView } from "../components/sqh-my-component/sqh-my-component-view";
import { createHookStory } from "../components/sqh-stencilbook/HookStoryAddon";
import scenario from "./MyComponent.feature";
export default {
  title: "1 - My Component",
  parameters: {
    scenario,
  },
};

function setupGraphQL() {
  window.widgetIdent = undefined;
}

export const MyComponent = () => {
  const props = {
    states: {
      loading: false,
      content: {
        myTitle: "Hello",
      },
    },
    data: {
      firstName: "Bob",
      lastName: "Testerson",
      referralCount: 69,
    },
  };
  return <MyComponentView {...props}></MyComponentView>;
};

export const MyComponentLoading = () => {
  const props = {
    states: {
      loading: true,
      content: {
        myTitle: "Hello",
      },
    },
    data: {
      firstName: "Bob",
      lastName: "Testerson",
      referralCount: 69,
    },
  };
  return <MyComponentView {...props}></MyComponentView>;
};

export const MyComponentWithHook = createHookStory(() => {
  setupGraphQL();
  return <sqh-my-component myTitle="Hello"></sqh-my-component>;
});
