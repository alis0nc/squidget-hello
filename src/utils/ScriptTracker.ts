import { useEffect, useState } from "@saasquatch/universal-hooks";
import { useHost } from "@saasquatch/component-boilerplate";

export type ScriptTrackerProps = {
  element: HTMLElement;
  updater: (value: unknown) => unknown;
  onError?: (e: Error) => unknown;
  selector?: string;
};

export class ScriptTracker {
  /**
   * Listens to subchanges
   */
  observer: MutationObserver;

  static connect(element: HTMLElement, updater: (value: unknown) => unknown) {
    const t = new ScriptTracker({
      element,
      updater,
    });
    t.connect();
    return t;
  }

  constructor(private props: ScriptTrackerProps) {}

  connect() {
    if (this.observer) {
      this.observer.disconnect();
    }
    const selector = this.props.selector || `[type="application/json"]`;
    const scriptEl: HTMLScriptElement = this.props.element.querySelector(
      selector
    );

    if (!scriptEl) {
      throw new Error("Script element not found");
    }

    const updateFromScript = () => {
      let config: unknown;
      try {
        config = JSON.parse(scriptEl.textContent);
        this.props.updater(config);
      } catch (e) {
        this.props.onError(e);
      }
    };
    // Options for the observer (which mutations to observe)
    const config = {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    };

    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver(updateFromScript);

    // Start observing the target node for configured mutations
    this.observer.observe(scriptEl, config);
    updateFromScript();
  }

  disconnect() {
    this.observer.disconnect();
  }
}

/**
 * Uses script value
 *
 */
export function useScriptTracker<T>(
  element = useHost(),
  selector?: string
): { error: unknown; loading: boolean; value: T } {
  const [state, setState] = useState({
    error: undefined,
    loading: true,
    value: undefined,
  });

  useEffect(() => {
    const tracker = new ScriptTracker({
      selector,
      element,
      updater: (v) =>
        setState({
          loading: false,
          value: v,
          error: undefined,
        }),
      onError: (e: Error) =>
        setState({
          loading: false,
          value: undefined,
          error: e,
        }),
    });
    tracker.connect();
    return () => tracker.disconnect();
  }, []);

  return state;
}
