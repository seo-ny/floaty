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
