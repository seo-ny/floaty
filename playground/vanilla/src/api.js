export const getColorList = async (USE_API = true) => {
  try {
    if (!USE_API) {
      return [
        {
          value: "red",
          label: "빨간색"
        },
        {
          value: "blue",
          label: "파란색"
        },
        {
          value: "green",
          label: "초록색"
        },
        {
          value: "yellow",
          label: "노란색"
        },
        {
          value: "purple",
          label: "보라색"
        },
        {
          value: "orange",
          label: "주황색"
        },
        {
          value: "pink",
          label: "분홍색"
        },
        {
          value: "brown",
          label: "갈색"
        },
        {
          value: "gray",
          label: "회색"
        },
        {
          value: "black",
          label: "검은색"
        },
        {
          value: "white",
          label: "흰색"
        }
      ];
    }

    const colorList = await fetch(
      `https://mocki.io/v1/443cf9d8-d7bf-4f98-a365-3ed96a608cd7`
    ).then((res) => res.json());

    return colorList || [];
  } catch (err) {
    console.error("[getColorList]", { err });
    throw err;
  }
};
