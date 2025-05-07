import { Template } from "@/components/select/select.template.js";
import { getColorList } from "@/api.js";

export default {
  title: "components/select",
  args: {
    placement: "bottom",
    // strategy: "absolute",
    boundary: "clippingAncestors",
    rootBoundary: "viewport",
    padding: 0,
    behaviors: [],
    onAfterComputePosition: null
  },
  argTypes: {
    placement: {
      description:
        "floatingEl을 referenceEl을 기준으로 어느 쪽에 배치하고 정렬시킬 것인가",
      control: "select",
      options: [
        "bottom",
        "bottoms-start",
        "bottom-end",
        "top",
        "top-start",
        "top-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end"
      ]
    },
    // strategy: {
    //   description: "floatingEl의 포지셔닝 방식",
    //   control: "inline-radio",
    //   options: ["absolute", "fixed"]
    // },
    boundary: {
      description:
        "(개발자가 설정할) floatingEl이 넘치는지 판단할 기준이 되는 경계 (여길 넘으면 안돼!)",
      control: "inline-radio",
      options: ["clippingAncestors", "Element"]
    },
    rootBoundary: {
      description:
        "(boundary와 별도로) floatingEl이 무조건 넘칠 수밖에 없는 시스템적 경계 (여기 넘으면 안 보여!)",
      control: "inline-radio",
      options: ["viewport", "document"]
    },
    padding: {
      description: "floatingEl이 넘치는지 판단하는 경계(교집합 영역)의 padding",
      control: "inline-radio",
      options: [0, 10, 30, 50, 100]
    },
    behaviors: {
      description:
        "floatingEl이 넘칠 경우 취할 동작들 정의 (순서 중요, 동작별 상세 옵션은 문서 참고)",
      control: "object"
    },
    onAfterComputePosition: {
      description:
        "위치 계산 직후 실행될 사용자 정의 로직 (ex. 스타일 업데이트)",
      control: "object"
    }
  }
};

const colorList = await getColorList();

const getDefaultArgsWithStrategy = (strategy = "absolute") => {
  return {
    select: {
      options: colorList,
      placeholder: "선택하시오.",
      maxVisibleItems: 8
    },
    placement: "right-start",
    strategy,
    onAfterComputePosition: ({ elements, position }) => {
      requestAnimationFrame(() => {
        Object.assign(elements.floating.style, {
          position: strategy,
          left: `${position.x}px`,
          top: `${position.y}px`
        });
      });
    }
  };
};

export const Absolute = Template.bind({});
Absolute.args = getDefaultArgsWithStrategy("absolute");

export const Fixed = Template.bind({});
Fixed.args = getDefaultArgsWithStrategy("fixed");
