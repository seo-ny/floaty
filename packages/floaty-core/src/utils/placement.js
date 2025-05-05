const decomposePlacement = (placement = "bottom") => {
  const [direction = "bottom", alignment = "center"] = placement.split("-");

  return {
    direction,
    alignment
  };
};

export { decomposePlacement };
