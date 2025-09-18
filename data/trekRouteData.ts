export interface TrekWaypoint {
  id: string
  name: string
  day: number
  latitude: number
  longitude: number
  elevation: number
  elevationFt: number
  duration?: string
  distance?: string
  difficulty: 'easy' | 'moderate' | 'difficult'
  highlights: string[]
  description: string
  type: 'start' | 'camp' | 'summit' | 'lake' | 'village'
}

export interface DailyTrekSegment {
  day: number
  title: string
  startPoint: string
  endPoint: string
  distance: string
  duration: string
  elevationGain: string
  elevationLoss: string
  difficulty: 'easy' | 'moderate' | 'difficult'
  highlights: string[]
  waterSources: string[]
  challenges: string[]
  photography: string[]
}

export const trekWaypoints: TrekWaypoint[] = [
  {
    id: 'ghandruk-day2',
    name: 'Ghandruk Village',
    day: 2,
    latitude: 28.376564,
    longitude: 83.807208,
    elevation: 2041,
    elevationFt: 6696,
    duration: '4-5 hours',
    distance: '3-4 km',
    difficulty: 'easy',
    highlights: [
      'Traditional Gurung village',
      'Mountain museum',
      'Cultural immersion',
      'First trek accommodation'
    ],
    description: 'Beautiful Gurung village with traditional stone houses and mountain views. First overnight stop of the trek.',
    type: 'village'
  },
  {
    id: 'dobato-day4',
    name: 'Dobato Camp',
    day: 4,
    latitude: 28.423367,
    longitude: 83.736967,
    elevation: 3451,
    elevationFt: 11322,
    duration: '6.5 hours',
    distance: '6.2 km',
    difficulty: 'difficult',
    highlights: [
      'Above tree line camping',
      'Majestic mountain lineup',
      'Rhododendron forests',
      'Altitude acclimatization'
    ],
    description: 'High altitude camp above tree line with panoramic mountain views. Last hour of trail is above tree line.',
    type: 'camp'
  },
  {
    id: 'muldai-top-day5',
    name: 'Muldai Top',
    day: 5,
    latitude: 28.420507,
    longitude: 83.733165,
    elevation: 3636,
    elevationFt: 11929,
    duration: '30 minutes from Dobato',
    distance: '1 km',
    difficulty: 'moderate',
    highlights: [
      'Trail junction to Khayar Lake',
      'Last Annapurna range views',
      'First Dhaulagiri range views',
      'Strategic photography point'
    ],
    description: 'Critical trail junction with spectacular views. Last chance to see Annapurna range before Dhaulagiri takes over.',
    type: 'summit'
  },
  {
    id: 'chhiasti-bang-day5',
    name: 'Chhiasti Bang',
    day: 5,
    latitude: 28.458149,
    longitude: 83.713225,
    elevation: 2994,
    elevationFt: 9823,
    duration: '6-7 hours total',
    distance: '9.2 km',
    difficulty: 'difficult',
    highlights: [
      'Complete ridge walk',
      'Steep ascents and descents',
      'Water refill opportunities',
      'Tea houses on route'
    ],
    description: 'Long challenging day with complete ridge walking. Steep ascents and descents with beautiful mountain scenery.',
    type: 'camp'
  },
  {
    id: 'khopra-ridge-day6',
    name: 'Khopra Ridge',
    day: 6,
    latitude: 28.472176,
    longitude: 83.70815,
    elevation: 3651,
    elevationFt: 11978,
    duration: '3 hours',
    distance: '3.5 km',
    difficulty: 'moderate',
    highlights: [
      'Main destination arrival',
      'Dhaulagiri and Annapurna views',
      'Ridge camping',
      'Celebration point'
    ],
    description: 'Main destination of the trek with spectacular 360-degree mountain views. Primary base camp for Khayar Lake day trip.',
    type: 'camp'
  },
  {
    id: 'khayar-lake-day7',
    name: 'Khayar Lake (Sacred Lake)',
    day: 7,
    latitude: 28.476341,
    longitude: 83.737293,
    elevation: 4663,
    elevationFt: 15300,
    duration: '8-9 hours return',
    distance: '16 km return',
    difficulty: 'difficult',
    highlights: [
      'Sacred alpine lake',
      'Highest point of trek',
      'Foothills of Mt Annapurna South',
      'Spiritual experience'
    ],
    description: 'Sacred alpine lake at highest altitude. Challenging day trip requiring early start and no water sources after 3 hours.',
    type: 'lake'
  }
]

export const dailyTrekSegments: DailyTrekSegment[] = [
  {
    day: 1,
    title: 'Arrival & Preparation',
    startPoint: 'Pokhara',
    endPoint: 'Pokhara (Hotel Top&Top)',
    distance: '0 km',
    duration: 'Full day',
    elevationGain: '0 ft',
    elevationLoss: '0 ft',
    difficulty: 'easy',
    highlights: ['Gear check', 'Trek briefing', 'Group introductions', 'Last-minute preparations'],
    waterSources: ['Hotel facilities'],
    challenges: ['Final preparations', 'Gear organization'],
    photography: ['Group photos', 'Gear layouts', 'Pokhara city']
  },
  {
    day: 2,
    title: 'Pokhara to Ghandruk',
    startPoint: 'Pokhara',
    endPoint: 'Ghandruk Village',
    distance: '3-4 km trek + drive',
    duration: '4-5 hours',
    elevationGain: '2,041 ft',
    elevationLoss: '0 ft',
    difficulty: 'easy',
    highlights: ['Drive to Kimche trailhead', 'First trek steps', 'Terraced fields', 'Gurung village arrival'],
    waterSources: ['Ghandruk tea houses', 'Village facilities'],
    challenges: ['First day adjustment', 'Trail familiarity'],
    photography: ['Terraced landscapes', 'Village architecture', 'Traditional culture']
  },
  {
    day: 3,
    title: 'Ghandruk to Tadapani',
    startPoint: 'Ghandruk Village',
    endPoint: 'Tadapani',
    distance: '5-6 km',
    duration: '4-5 hours',
    elevationGain: '2,664 ft',
    elevationLoss: '0 ft',
    difficulty: 'moderate',
    highlights: ['Mountain sunrise', 'Rhododendron forest', 'First mountain views', 'Group dynamics'],
    waterSources: ['Trail streams', 'Tadapani tea houses'],
    challenges: ['Altitude gain', 'Forest navigation'],
    photography: ['Sunrise views', 'Forest trails', 'Mountain glimpses']
  },
  {
    day: 4,
    title: 'Tadapani to Dobato',
    startPoint: 'Tadapani',
    endPoint: 'Dobato Camp',
    distance: '6.2 km',
    duration: '6.5 hours',
    elevationGain: '2,520 ft',
    elevationLoss: '0 ft',
    difficulty: 'difficult',
    highlights: ['Above tree line', 'Majestic mountain lineup', 'Gradual forest ascent', 'High altitude camping'],
    waterSources: ['Limited - carry extra water'],
    challenges: ['Altitude effects', 'Tree line crossing', 'Long duration'],
    photography: ['Mountain panoramas', 'Alpine landscapes', 'Above tree line shots']
  },
  {
    day: 5,
    title: 'Dobato to Chhiasti Bang via Muldai Top',
    startPoint: 'Dobato Camp',
    endPoint: 'Chhiasti Bang',
    distance: '9.2 km',
    duration: '6-7 hours',
    elevationGain: '586 ft to Muldai Top',
    elevationLoss: '642 ft from Muldai',
    difficulty: 'difficult',
    highlights: ['Ridge walking', 'Trail junction views', 'Annapurna farewell', 'Dhaulagiri introduction'],
    waterSources: ['Streams en route', 'Tea houses'],
    challenges: ['Long distance', 'Ridge exposure', 'Navigation junction'],
    photography: ['Ridge walks', 'Mountain transitions', 'Trail junctions']
  },
  {
    day: 6,
    title: 'Chhiasti Bang to Khopra Ridge',
    startPoint: 'Chhiasti Bang',
    endPoint: 'Khopra Ridge',
    distance: '3.5 km',
    duration: '3 hours',
    elevationGain: '657 ft',
    elevationLoss: '0 ft',
    difficulty: 'moderate',
    highlights: ['Main destination arrival', '360-degree views', 'Dhaulagiri and Annapurna', 'Celebration'],
    waterSources: ['Khopra Ridge facilities'],
    challenges: ['Final approach', 'Celebration management'],
    photography: ['Destination arrival', '360 panoramas', 'Group celebrations']
  },
  {
    day: 7,
    title: 'Khayar Lake Day Trip',
    startPoint: 'Khopra Ridge',
    endPoint: 'Khopra Ridge (return)',
    distance: '16 km return',
    duration: '8-9 hours',
    elevationGain: '3,322 ft',
    elevationLoss: '3,322 ft',
    difficulty: 'difficult',
    highlights: ['Sacred alpine lake', 'Highest trek point', 'Mt Annapurna South foothills', 'Spiritual experience'],
    waterSources: ['None after 3 hours - carry 2L minimum'],
    challenges: ['Altitude sickness risk', 'No water sources', 'Long day', 'Early start required'],
    photography: ['Sacred lake', 'Highest altitude shots', 'Alpine landscapes', 'Spiritual moments']
  },
  {
    day: 8,
    title: 'Khopra Ridge to Paudwar',
    startPoint: 'Khopra Ridge',
    endPoint: 'Paudwar',
    distance: '8-9 km',
    duration: '5-6 hours',
    elevationGain: '0 ft',
    elevationLoss: '4,978 ft',
    difficulty: 'moderate',
    highlights: ['Final sunrise', 'Descent begins', 'Ecosystem changes', 'Achievement reflection'],
    waterSources: ['Paudwar facilities', 'Descent streams'],
    challenges: ['Knee strain', 'Emotional transition'],
    photography: ['Final sunrise', 'Descent views', 'Team reflections']
  },
  {
    day: 9,
    title: 'Paudwar to Pokhara',
    startPoint: 'Paudwar',
    endPoint: 'Pokhara',
    distance: '2-3 km + drive',
    duration: '2-3 hours + drive',
    elevationGain: '0 ft',
    elevationLoss: '2,000+ ft',
    difficulty: 'easy',
    highlights: ['Trek completion', 'Return to civilization', 'Group celebration', 'Achievement recognition'],
    waterSources: ['Road facilities', 'Hotel return'],
    challenges: ['Transition back', 'Celebration management'],
    photography: ['Completion shots', 'Group celebrations', 'Return journey']
  }
]

export const trekStatistics = {
  totalDays: 9,
  totalDistance: '50+ km',
  highestPoint: {
    name: 'Khayar Lake',
    elevation: 4663,
    elevationFt: 15300
  },
  totalElevationGain: '13,300+ ft',
  totalElevationLoss: '10,300+ ft',
  difficulty: 'Moderate to Difficult',
  bestSeason: 'October-November, March-May',
  permits: ['ACAP (Annapurna Conservation Area Project)', 'TIMS Card'],
  baseLocation: 'Pokhara, Nepal'
}