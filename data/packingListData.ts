export interface PackingItem {
  name: string
  weight: number
  essential: boolean
  count: number
  checked?: boolean
  isCustom?: boolean
}

export interface PackingCategory {
  [key: string]: PackingItem[]
}

export const packingListData: PackingCategory = {
  upperLayer: [
    { name: "Base layer (Thermals)", weight: 200, essential: true, count: 1 },
    { name: "Dry fit T-shirt (wearing)", weight: 150, essential: true, count: 1 },
    { name: "Dry fit T-shirt (spare)", weight: 150, essential: true, count: 2 },
    { name: "Fleece jacket", weight: 400, essential: true, count: 1 },
    { name: "Fleece/Light sweater", weight: 350, essential: false, count: 1 },
    { name: "Down jacket (-10°C)", weight: 600, essential: true, count: 1 },
    { name: "Neck warmer/Balaclava", weight: 80, essential: true, count: 1 },
    { name: "Woolen cap", weight: 60, essential: true, count: 1 },
    { name: "Woolen gloves", weight: 100, essential: true, count: 1 },
    { name: "Fleece liner gloves", weight: 50, essential: false, count: 1 },
    { name: "Sun cap", weight: 80, essential: true, count: 1 }
  ],
  bottomLayer: [
    { name: "Trek pants (wearing)", weight: 300, essential: true, count: 1 },
    { name: "Trek pants (spare)", weight: 300, essential: true, count: 2 },
    { name: "Undergarments", weight: 200, essential: true, count: 7 },
    { name: "Synthetic socks", weight: 350, essential: true, count: 7 },
    { name: "Woolen socks (night)", weight: 100, essential: true, count: 2 },
    { name: "Trek shoes (wearing)", weight: 0, essential: true, count: 1 },
    { name: "Strappy sandals", weight: 400, essential: true, count: 1 }
  ],
  rainGear: [
    { name: "Poncho/Rain jacket", weight: 300, essential: true, count: 1 },
    { name: "Rain pants", weight: 200, essential: true, count: 1 },
    { name: "Waterproof gloves", weight: 80, essential: true, count: 1 },
    { name: "Polythene bags", weight: 50, essential: true, count: 5 },
    { name: "Backpack rain cover", weight: 150, essential: true, count: 1 }
  ],
  accessories: [
    { name: "Headlamp", weight: 150, essential: true, count: 1 },
    { name: "Power bank", weight: 300, essential: true, count: 1 },
    { name: "Sunscreen + Moisturizer", weight: 150, essential: true, count: 1 },
    { name: "Trekking poles", weight: 500, essential: true, count: 2 },
    { name: "Sunglasses", weight: 50, essential: true, count: 1 },
    { name: "Small towel", weight: 100, essential: true, count: 1 },
    { name: "Toilet roll", weight: 80, essential: true, count: 1 },
    { name: "Cutlery set (spoon, mug, tiffin)", weight: 300, essential: true, count: 1 },
    { name: "Personal medication + ORS", weight: 100, essential: true, count: 1 },
    { name: "Day pack (15-20L)", weight: 400, essential: true, count: 1 },
    { name: "Toiletry kit", weight: 200, essential: true, count: 1 },
    { name: "Knee cap (Optional)", weight: 150, essential: false, count: 1 },
    { name: "Water bottles", weight: 200, essential: true, count: 2 }
  ]
}

export const categoryNames = {
  upperLayer: 'Upper Layer',
  bottomLayer: 'Bottom Layer',
  rainGear: 'Rain Gear',
  accessories: 'Accessories'
}

export const categoryIcons = {
  upperLayer: '🧥',
  bottomLayer: '👖',
  rainGear: '☔',
  accessories: '🎒'
}

export const weightOptimizationTips = [
  "Choose merino wool base layers - lighter and odor-resistant",
  "Replace one fleece with a lightweight down vest",
  "Use ultralight trekking poles (carbon fiber)",
  "Pack only 1 spare trek pants instead of 2",
  "Choose a lightweight titanium cutlery set",
  "Use a compact power bank (10,000mAh max)",
  "Replace heavy boots with lightweight trail shoes",
  "Use compression sacks for clothes",
  "Choose a 15L daypack instead of 20L",
  "Pack only essential medications in small containers"
]

export const targetWeights = {
  total: 12, // kg excluding backpack
  backpack: 1.7, // kg
  upperLayer: 3.0, // kg
  bottomLayer: 2.5, // kg
  rainGear: 1.0, // kg
  accessories: 3.0 // kg
}