import "normalize.css";

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
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "auto";
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.position = "absolute";
    wrapper.style.top = "100px";
    wrapper.style.left = "100px";
    // wrapper.style.width = "100%";
    // wrapper.style.height = "100vh";
    wrapper.style.width = "400px";
    wrapper.style.height = "300px";
    wrapper.style.backgroundColor = "lightgray";

    const story = StoryFn();
    wrapper.appendChild(story);

    return wrapper;
  }
];
