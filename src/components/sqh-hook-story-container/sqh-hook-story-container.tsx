import { withHooks } from "@saasquatch/stencil-hooks";
import { h, Component, State, Prop, FunctionalComponent } from "@stencil/core";

@Component({
  tag: "sqh-hook-story-container",
})
export class SqhHookStoryContainer {
  @State()
  ignored = true;

  @Prop()
  hookStory: FunctionalComponent;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const Story = this.hookStory;
    return <Story />;
  }
}
