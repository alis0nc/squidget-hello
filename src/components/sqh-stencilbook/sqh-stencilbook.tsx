import { h, Component, Host, State } from "@stencil/core";
import { useStencilbook } from "@saasquatch/stencilbook";
import { withHooks } from "@saasquatch/stencil-hooks";

import * as MyComponent from "../../stories/MyComponent.stories";

import { CucumberAddon } from "./CucumberAddon";
import { ShadowViewAddon } from "../../utils/ShadowViewAddon";
import { HookStoryAddon } from "./HookStoryAddon";

// Import and add all stories to this array
const stories = [MyComponent];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: "sqh-stencilbook",
})
export class SQHStencilbook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: "My Theme",
      addons: [CucumberAddon, ShadowViewAddon, HookStoryAddon],
    });
    return <Host class={Style} onClick={{}}>{children}</Host>;
  }
}
