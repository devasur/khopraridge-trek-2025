export interface TeamRole {
  id: string
  title: string
  assignee?: string
  responsibilities: string[]
  isEssential: boolean
}

export interface Equipment {
  id: string
  item: string
  assignee?: string
  status: 'available' | 'in-use' | 'charging' | 'missing'
  location?: string
  batteryLevel?: number
}

export interface DailyShot {
  id: string
  day: number
  location: string
  shots: string[]
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  notes?: string
}

export interface Interview {
  id: string
  subject: string
  questions: string[]
  duration: string
  location: string
  completed: boolean
  assignedTo?: string
  scheduledTime?: string
}

export const teamRoles: TeamRole[] = [
  {
    id: 'director',
    title: 'Director/Creative Lead',
    responsibilities: [
      'Overall vision and final creative decisions',
      'Daily shot list approval',
      'Interview coordination',
      'Story arc management'
    ],
    isEssential: true
  },
  {
    id: 'camera1',
    title: 'Primary Camera Operator',
    responsibilities: [
      'Main filming and shot composition',
      'Equipment maintenance',
      'Technical quality control',
      'Backup footage management'
    ],
    isEssential: true
  },
  {
    id: 'camera2',
    title: 'Secondary Camera Operator',
    responsibilities: [
      'B-roll footage capture',
      'Alternative angles',
      'Candid moment documentation',
      'Equipment backup'
    ],
    isEssential: true
  },
  {
    id: 'audio',
    title: 'Audio Manager',
    responsibilities: [
      'Interview audio quality',
      'Ambient sound recording',
      'Equipment setup and monitoring',
      'Audio file organization'
    ],
    isEssential: true
  },
  {
    id: 'logistics',
    title: 'Logistics Manager',
    responsibilities: [
      'Storage and backup systems',
      'Charging schedule management',
      'Memory card rotation',
      'Equipment inventory tracking'
    ],
    isEssential: true
  },
  {
    id: 'coordinator',
    title: 'Interview Coordinator',
    responsibilities: [
      'Subject scheduling and comfort',
      'Question preparation',
      'Setup coordination',
      'Release form management'
    ],
    isEssential: false
  }
]

export const equipmentList: Equipment[] = [
  {
    id: 'phone1',
    item: 'Primary Smartphone (Person 1)',
    status: 'available',
    batteryLevel: 100
  },
  {
    id: 'phone2',
    item: 'Primary Smartphone (Person 2)',
    status: 'available',
    batteryLevel: 100
  },
  {
    id: 'phone3',
    item: 'Primary Smartphone (Person 3)',
    status: 'available',
    batteryLevel: 100
  },
  {
    id: 'dslr',
    item: 'Primary DSLR/Mirrorless Camera',
    status: 'available'
  },
  {
    id: 'mic1',
    item: 'External Microphone',
    status: 'available'
  },
  {
    id: 'tripod1',
    item: 'Phone Tripod #1',
    status: 'available'
  },
  {
    id: 'tripod2',
    item: 'Phone Tripod #2',
    status: 'available'
  },
  {
    id: 'powerbank1',
    item: 'Power Bank #1 (20,000mAh)',
    status: 'available',
    batteryLevel: 100
  },
  {
    id: 'powerbank2',
    item: 'Power Bank #2 (20,000mAh)',
    status: 'available',
    batteryLevel: 100
  },
  {
    id: 'memory1',
    item: 'Memory Card #1 (128GB)',
    status: 'available'
  },
  {
    id: 'memory2',
    item: 'Memory Card #2 (128GB)',
    status: 'available'
  }
]

export const dailyShots: DailyShot[] = [
  {
    id: 'day1',
    day: 1,
    location: 'Pokhara Pre-Trek',
    shots: [
      'Group arrival at Hotel Top&Top',
      'Gear inspection and organization',
      'Trek briefing session',
      'Team introductions',
      'Last-minute preparations'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day2',
    day: 2,
    location: 'Pokhara → Ghandruk',
    shots: [
      'Morning departure from hotel',
      'Drive to Kimche trailhead',
      'First steps on trek trail',
      'Terraced field landscapes',
      'Arrival at Ghandruk village'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day3',
    day: 3,
    location: 'Ghandruk → Tadapani',
    shots: [
      'Mountain sunrise from Ghandruk',
      'Trail through rhododendron forest',
      'Group interactions and conversations',
      'First mountain views',
      'Camp setup at Tadapani'
    ],
    priority: 'medium',
    completed: false
  },
  {
    id: 'day4',
    day: 4,
    location: 'Tadapani → Dobato',
    shots: [
      'Altitude gain documentation',
      'Changing landscape and vegetation',
      'Team support and encouragement',
      'Panoramic mountain views',
      'Sunset at Dobato camp'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day5',
    day: 5,
    location: 'Dobato → Chistibang',
    shots: [
      'Crossing Muldai Top (highest point)',
      '360-degree mountain panorama',
      'Physical and emotional challenges',
      'Team celebration at summit',
      'Descent to Chistibang'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day6',
    day: 6,
    location: 'Chistibang → Khopra Ridge',
    shots: [
      'Ridge walking sequences',
      'Dhaulagiri and Annapurna ranges',
      'Group dynamics and bonding',
      'Arrival at main destination',
      'Celebration and reflection'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day7',
    day: 7,
    location: 'Khayar Lake Day Trip',
    shots: [
      'Pre-dawn preparation',
      'Challenging ascent to sacred lake',
      'Sacred lake at 15,300 ft',
      'Spiritual/emotional moments',
      'Return journey and exhaustion'
    ],
    priority: 'high',
    completed: false
  },
  {
    id: 'day8',
    day: 8,
    location: 'Khopra Ridge → Paudwar',
    shots: [
      'Final sunrise from Khopra',
      'Beginning of descent',
      'Changing ecosystems',
      'Team reflection on achievement',
      'Lower altitude celebrations'
    ],
    priority: 'medium',
    completed: false
  },
  {
    id: 'day9',
    day: 9,
    location: 'Paudwar → Pokhara',
    shots: [
      'Final trekking moments',
      'Arrival at road head',
      'Vehicle journey back',
      'Return to civilization',
      'Group celebration in Pokhara'
    ],
    priority: 'high',
    completed: false
  }
]

export const interviewQuestions: Interview[] = [
  {
    id: 'pre-trek',
    subject: 'Pre-Trek Expectations & Motivations',
    questions: [
      'What initially drew you to this specific trek?',
      'What are you most excited about?',
      'What are your biggest concerns or fears?',
      'How have you prepared physically and mentally?',
      'What do you hope to learn about yourself?',
      'What would make this trek a success in your mind?',
      'Who did you tell about this trek and what was their reaction?',
      'What story do you hope to tell when you return?',
      'How long have you been planning this adventure?',
      'What gear are you most excited/nervous about?',
      'What previous trekking experience do you have?',
      'How do you think this experience will change you?'
    ],
    duration: '7-10 minutes per person',
    location: 'Hotel Top&Top, Pokhara (Oct 8 evening)',
    completed: false,
    assignedTo: '',
    scheduledTime: '16:30-20:30 (multiple slots)'
  },
  {
    id: 'mid-trek',
    subject: 'Mid-Trek Reality Check & Challenges',
    questions: [
      'How is this different from what you imagined?',
      'What has surprised you most so far?',
      'Describe the most challenging moment so far',
      'How has your body responded to the altitude?',
      'What thoughts keep you motivated when it gets tough?',
      'How has the group supported each other?',
      'What moment will you remember forever?',
      'Describe the most beautiful thing you\'ve seen',
      'How has the landscape affected your mood?',
      'Which part has been harder/easier than expected?',
      'How are you feeling about the group dynamic?',
      'Tell me about a conversation that stuck with you'
    ],
    duration: '5-8 minutes per person',
    location: 'Khopra Ridge Camp (Oct 13 evening)',
    completed: false,
    assignedTo: '',
    scheduledTime: 'After dinner, before sleep'
  },
  {
    id: 'post-trek',
    subject: 'Transformation & Legacy Reflections',
    questions: [
      'How do you feel different now than when you started?',
      'What did you discover about yourself?',
      'Which moment tested you the most?',
      'What surprised you about your own capabilities?',
      'How did the group dynamic evolve over the trek?',
      'Who inspired you the most and why?',
      'What will you miss most about this group?',
      'How did strangers become friends?',
      'What advice would you give someone considering this trek?',
      'How will this experience influence your future decisions?',
      'What will you tell people when they ask about this?',
      'Would you do it again? What would you do differently?'
    ],
    duration: '8-12 minutes per person',
    location: 'Pokhara Hotel (Oct 16-17)',
    completed: false,
    assignedTo: '',
    scheduledTime: 'After trek completion, before departure'
  }
]

export const technicalStandards = {
  video: {
    resolution: '1080p',
    frameRate: '30fps',
    format: 'MP4',
    storage: 'Minimum 128GB per device'
  },
  audio: {
    format: 'WAV or high-quality MP3',
    external: 'Use external mic for interviews',
    backup: 'Record on multiple devices'
  },
  photos: {
    resolution: 'Highest available',
    format: 'RAW + JPEG if possible',
    backup: 'Daily transfer to multiple devices'
  }
}