export const COOKING_UNITS = [
  "count",
  "cups",
  "grams",
  "liters",
  "ounces",
  "pounds",
  "tablespoons",
  "teaspoons",
] as const;

export type CookingUnit = (typeof COOKING_UNITS)[number];
