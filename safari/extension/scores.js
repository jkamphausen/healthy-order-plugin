// Gesundheits-Score je Kategorie: 0 = am gesündesten, 10 = am ungesündesten.
// Unbekannte Kategorien bekommen DEFAULT_SCORE.
// Hinweis: Grobe Einschätzung für den Prototyp, keine validierte Ernährungsskala.
window.HEALTH_SCORES = {
  "Healthy": 0, "Salads": 0.5, "Vegan": 1, "Poke": 1.5, "Smoothies": 2, "Soup": 2,
  "Sushi": 2.5, "Japanese": 2.5, "Grocery": 3, "Korean": 3.5, "Coffee": 4, "Asian": 4,
  "Indian": 4.5, "Halal": 4.5, "Mexican": 5, "Italian": 5, "Sandwiches": 5,
  "Chinese": 5.5, "Breakfast": 5.5, "Gifts": 6, "Bakery": 6.5, "Bubble tea": 7,
  "American": 7.5, "BBQ": 7.5, "Comfort food": 8, "Burgers": 8.5, "Wings": 8.5,
  "Ice cream": 8.5, "Fast food": 9, "Desserts": 9, "Pizza": 10
};
window.HEALTH_DEFAULT_SCORE = 5;
// Sättigungsverlust pro Score-Punkt (0.09 → Score 10 = 10 % Sättigung)
window.HEALTH_DESAT_PER_POINT = 0.09;
