import { Component, Prop, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { MyComponentView, MyComponentViewProps } from "./sqh-my-component-view";
import { useMyComponent } from "./useMyComponent";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";
import { getProps } from "../../utils/getProps";
@Component({
  tag: "sqh-my-component",
  shadow: true,
})
export class MyComponent {
  // required boilerplate
  @State()
  ignored = true;

  // text props
  // camel case props use dash-separated attributes: <sqh-my-component my-title="Hello" />
  /**
   * @uiName Text to display with user name
   */
  @Prop() myTitle: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<MyComponentViewProps>;

  constructor() {
    withHooks(this);
  }

  // required boilerplate
  disconnectedCallback() {}

  render() {
    const { states, data } = isDemo()
      ? useMyComponentDemo(getProps(this))
      : useMyComponent(getProps(this));
    return <MyComponentView states={states} data={data} />;
  }
}

function useMyComponentDemo(props: MyComponent) {
  return deepmerge(
    {
      states: {
        loading: false,
        content: props,
      },
      data: {
        firstName: "Bob",
        lastName: "Testerson",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
