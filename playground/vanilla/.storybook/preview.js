import "normalize.css";
import "./preview.css";

export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*"
  },
  controls: {
    expanded: false
  },
  options: {
    showPanel: true,
    panelPosition: "right"
  },
  layout: "fullscreen" // storybook 자체적 body padding style 없애기 위한 옵션
};

export const decorators = [
  (StoryFn) => {
    const container = document.createElement("div");
    container.classList.add("container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const box = document.createElement("div");
    box.classList.add("box");

    const story = StoryFn();
    box.appendChild(story);
    wrapper.appendChild(box);
    container.appendChild(wrapper);

    return container;
  }
];
