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
    container.innerHTML = `
      <div class="wrapper">
        <div class="box"></div>
      </div>
    `;

    const story = StoryFn();
    container.querySelector(".box").appendChild(story);

    const bottomBox = document.createElement("div");
    bottomBox.classList.add("box", "bottom");
    document.body.appendChild(bottomBox);

    return container;
  }
];
