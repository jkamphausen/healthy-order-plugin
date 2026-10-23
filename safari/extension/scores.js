// Health score per category: 0 = healthiest, 10 = least healthy.
// Unknown categories get HEALTH_DEFAULT_SCORE.
// Note: rough estimate for the prototype, not a validated nutrition scale.
window.HEALTH_SCORES = {
  "Healthy": 0, "Salads": 0.5, "Vegan": 1, "Poke": 1.5, "Smoothies": 2, "Soup": 2,
  "Sushi": 2.5, "Japanese": 2.5, "Grocery": 3, "Korean": 3.5, "Coffee": 4, "Asian": 4,
  "Indian": 4.5, "Halal": 4.5, "Mexican": 5, "Italian": 5, "Sandwiches": 5,
  "Chinese": 5.5, "Breakfast": 5.5, "Gifts": 6, "Bakery": 6.5, "Bubble tea": 7,
  "American": 7.5, "BBQ": 7.5, "Comfort food": 8, "Burgers": 8.5, "Wings": 8.5,
  "Ice cream": 8.5, "Fast food": 9, "Desserts": 9, "Pizza": 10
};
window.HEALTH_DEFAULT_SCORE = 5;
// Saturation loss per score point (0.09 → score 10 = 10% saturation)
window.HEALTH_DESAT_PER_POINT = 0.09;
