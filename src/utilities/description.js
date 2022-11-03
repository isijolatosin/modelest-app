export function descriptionFunc(singleProducts, avesizes) {
  const texture = ["Straight", "Bodywave", "Curly", "Wavy"];
  return [
    { key: "Brand", value: `Raw ${singleProducts?.brand} hair` },
    {
      key: "Hair Texture",
      value:
        (singleProducts?.type &&
          singleProducts?.type.toLowerCase() === "frontal") ||
        (singleProducts?.type &&
          singleProducts?.type.toLowerCase() === "closure")
          ? texture.join(", ")
          : singleProducts?.name,
    },
    { key: "Hair Color", value: singleProducts?.color },
    {
      key: "Hair Length",
      value:
        avesizes &&
        `Available from ${avesizes[0]}" - ${
          avesizes?.[avesizes.length - 1]
        }" inches`,
    },
    { key: "Material", value: "100% Human Hair" },
    {
      key: "Cap Size",
      value: "Average Size(Head circumference: 54cm - 58cm",
    },
    { key: "Can be bleached.dyed", value: "Yes" },
    {
      key: "Return policy",
      value:
        "We accept 10-days no reason return exchange with hair not been used",
    },
    {
      key: "Delivery time",
      value:
        "We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)",
    },
  ];
}
