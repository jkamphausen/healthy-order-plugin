// Health score per category: 0 = healthiest, 10 = least healthy.
// Keyed by a canonical category ID. Unknown categories get HEALTH_DEFAULT_SCORE.
// Note: rough estimate for the prototype, not a validated nutrition scale.
window.HEALTH_SCORES = {
  "healthy": 0, "salads": 0.5, "vegan": 1, "poke": 1.5, "smoothies": 2, "soup": 2,
  "sushi": 2.5, "japanese": 2.5, "grocery": 3, "korean": 3.5, "coffee": 4, "asian": 4,
  "greek": 4, "indian": 4.5, "halal": 4.5, "mexican": 5, "italian": 5, "sandwiches": 5,
  "chinese": 5.5, "breakfast": 5.5, "gifts": 6, "bakery": 6.5, "bubble-tea": 7,
  "street-food": 7, "american": 7.5, "bbq": 7.5, "comfort-food": 8, "soul-food": 8,
  "burgers": 8.5, "wings": 8.5, "ice-cream": 8.5, "fast-food": 9, "desserts": 9, "pizza": 10
};

// Aliases per category ID. Matching is case-insensitive and trimmed.
// Each list holds: the icon file name (language-independent, preferred; e.g. "Salad" for
// .../cuisine-filters/v1/Salad.png), then the English label, then the German label.
window.HEALTH_ALIASES = {
  "healthy":      ["Healthy", "Gesunde Küche"],
  "salads":       ["Salad", "Salads", "Salate"],
  "vegan":        ["Vegan"],
  "poke":         ["Poke"],
  "smoothies":    ["Smoothie", "Smoothies"],
  "soup":         ["Soup", "Suppe"],
  "sushi":        ["Sushi"],
  "japanese":     ["Japanese", "Japanisch"],
  "grocery":      ["Groceryv3", "Grocery", "Lebensmittel"],
  "korean":       ["Korean", "Koreanisch"],
  "coffee":       ["Coffee", "Kaffee"],
  "asian":        ["Asian", "Asiatisch"],
  "greek":        ["Greek", "Griechisch"],
  "indian":       ["Indian", "Indisch"],
  "halal":        ["Halal"],
  "mexican":      ["Mexican", "Mexikanisch"],
  "italian":      ["Italian", "Italienisch"],
  "sandwiches":   ["Sandwich", "Sandwiches"],
  "chinese":      ["Chinese", "Chinesisch"],
  "breakfast":    ["Breakfast", "Frühstück"],
  "gifts":        ["Entry_point_Gifts_x2", "Gifts", "Geschenke"],
  "bakery":       ["Bakery", "Backwaren"],
  "bubble-tea":   ["BubbleTea", "Bubble tea"],
  "street-food":  ["StreetFood", "Street Food"],
  "american":     ["American", "Amerikanisch"],
  "bbq":          ["BBQ"],
  "comfort-food": ["Comfort", "Comfort food"],
  "soul-food":    ["SoulFood", "Soul Food"],
  "burgers":      ["Burgers", "Burger"],
  "wings":        ["Wings", "Hühnerflügel"],
  "ice-cream":    ["IceCream", "Ice cream", "Eiscreme"],
  "fast-food":    ["FastFood", "Fast food"],
  "desserts":     ["Dessert", "Desserts"],
  "pizza":        ["Pizza"]
};
window.HEALTH_DEFAULT_SCORE = 5;
// Saturation loss per score point (0.09 → score 10 = 10% saturation)
window.HEALTH_DESAT_PER_POINT = 0.09;
