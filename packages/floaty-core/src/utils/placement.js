const decomposePlacement = (placement = "bottom") => {
  const [direction = "bottom", align = "center"] = placement.split("-");

  return {
    direction,
    align
  };
};

export { decomposePlacement };
