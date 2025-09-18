export interface TrekMember {
  id: string
  name: string
  arrivalDate: string
  arrivalTime: string
  arrivalFlight: string
  arrivalFrom: string
  ktmToPokharaFlight?: string
  ktmToPokharaTime?: string
  pokharaToKtmFlight: string
  pokharaToKtmTime: string
  departureDate: string
  departureFlight?: string
  departureTime?: string
  departureTo?: string
  status: 'complete' | 'partial' | 'missing'
  missingItems: string[]
}

export const trekMembers: TrekMember[] = [
  {
    id: 'boni',
    name: 'Boni',
    arrivalDate: '2025-10-06',
    arrivalTime: '9:50 AM',
    arrivalFlight: '6E 1151',
    arrivalFrom: 'Delhi',
    ktmToPokharaFlight: 'YT 679',
    ktmToPokharaTime: '12:10 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: '6E 1154',
    departureTime: '2:00 PM',
    departureTo: 'Delhi',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'george',
    name: 'George',
    arrivalDate: '2025-10-07',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'QR 648',
    arrivalFrom: 'Doha',
    ktmToPokharaFlight: 'YT 687',
    ktmToPokharaTime: '6:20 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: 'AI 2232',
    departureTime: '6:30 AM',
    departureTo: 'Mumbai',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'ann',
    name: 'Ann',
    arrivalDate: '2025-10-07',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'QR 648',
    arrivalFrom: 'Doha',
    ktmToPokharaFlight: 'YT 687',
    ktmToPokharaTime: '6:20 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: 'AI 2232',
    departureTime: '6:30 AM',
    departureTo: 'Mumbai',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'roshni',
    name: 'Roshni',
    arrivalDate: '2025-10-07',
    arrivalTime: '8:05 PM',
    arrivalFlight: 'AI 211',
    arrivalFrom: 'Delhi',
    ktmToPokharaFlight: 'U4 613',
    ktmToPokharaTime: '12:50 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'AI 2232',
    departureTime: '6:30 AM',
    departureTo: 'Mumbai',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'tinku',
    name: 'Tinku',
    arrivalDate: '2025-10-07',
    arrivalTime: '8:05 PM',
    arrivalFlight: 'AI 211',
    arrivalFrom: 'Delhi',
    ktmToPokharaFlight: 'U4 613',
    ktmToPokharaTime: '12:50 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'IX 883',
    departureTime: '9:30 AM',
    departureTo: 'Bangalore',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'deepu',
    name: 'Deepu',
    arrivalDate: '2025-10-08',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'IX 884',
    arrivalFrom: 'Bangalore',
    ktmToPokharaFlight: 'U4 613',
    ktmToPokharaTime: '12:50 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'IX 883',
    departureTime: '9:30 AM',
    departureTo: 'Bangalore',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'simon',
    name: 'Simon',
    arrivalDate: '2025-10-08',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'IX 884',
    arrivalFrom: 'Bangalore',
    ktmToPokharaFlight: 'U4 613',
    ktmToPokharaTime: '12:50 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: 'RA 225',
    departureTime: '1:45 PM',
    departureTo: 'Bangalore',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'vandana',
    name: 'Vandana',
    arrivalDate: '2025-10-08',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'IX 884',
    arrivalFrom: 'Bangalore',
    ktmToPokharaFlight: 'U4 613',
    ktmToPokharaTime: '12:50 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: 'RA 225',
    departureTime: '1:45 PM',
    departureTo: 'Bangalore',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'bushra',
    name: 'Bushra',
    arrivalDate: '2025-10-08',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'IX 884',
    arrivalFrom: 'Bangalore',
    ktmToPokharaFlight: 'U4 617',
    ktmToPokharaTime: '2:40 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'IX 883',
    departureTime: '9:30 AM',
    departureTo: 'Bangalore',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'alima',
    name: 'Alima',
    arrivalDate: '2025-10-08',
    arrivalTime: '12:25 PM',
    arrivalFlight: 'TG 319',
    arrivalFrom: 'Bangkok',
    ktmToPokharaFlight: 'U4 617',
    ktmToPokharaTime: '2:40 PM',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'TG 320',
    departureTime: '1:20 PM',
    departureTo: 'Bangkok',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'renjith',
    name: 'Renjith',
    arrivalDate: '2025-10-02',
    arrivalTime: '8:45 PM',
    arrivalFlight: 'RA 226',
    arrivalFrom: 'Bangalore',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '',
    status: 'partial',
    missingItems: ['KTM-PKR flight', 'Departure flight']
  },
  {
    id: 'prakash',
    name: 'Prakash',
    arrivalDate: '2025-10-08',
    arrivalTime: '6:30 AM',
    arrivalFlight: 'AI 215',
    arrivalFrom: 'Delhi',
    pokharaToKtmFlight: 'U4 608',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-19',
    departureFlight: 'IX 883',
    departureTime: '9:30 AM',
    departureTo: 'Bangalore',
    status: 'partial',
    missingItems: ['KTM-PKR flight']
  },
  {
    id: 'soby',
    name: 'Soby',
    arrivalDate: '',
    arrivalTime: '',
    arrivalFlight: '',
    arrivalFrom: '',
    pokharaToKtmFlight: '',
    pokharaToKtmTime: '',
    departureDate: '',
    status: 'missing',
    missingItems: ['All bookings needed']
  },
  {
    id: 'rajesh',
    name: 'Rajesh',
    arrivalDate: '',
    arrivalTime: '',
    arrivalFlight: '',
    arrivalFrom: '',
    pokharaToKtmFlight: '',
    pokharaToKtmTime: '',
    departureDate: '',
    status: 'missing',
    missingItems: ['All bookings needed']
  },
  {
    id: 'indu',
    name: 'Indu',
    arrivalDate: '',
    arrivalTime: '',
    arrivalFlight: '',
    arrivalFrom: '',
    pokharaToKtmFlight: '',
    pokharaToKtmTime: '',
    departureDate: '',
    status: 'missing',
    missingItems: ['All bookings needed']
  }
]

export const personalItinerary = {
  name: 'Boni',
  outboundFlights: [
    {
      date: '2025-10-06',
      flight: '6E 2418',
      route: 'Pune → Delhi',
      time: '02:00 - 04:15',
      duration: '3h 45m layover'
    },
    {
      date: '2025-10-06',
      flight: '6E 1151',
      route: 'Delhi → Kathmandu',
      time: '07:50 - 09:50',
      duration: '2h 20m transit'
    },
    {
      date: '2025-10-06',
      flight: 'YT 679',
      route: 'Kathmandu → Pokhara',
      time: '12:10 - 13:10',
      ticket: '9992109782978'
    }
  ],
  returnFlights: [
    {
      date: '2025-10-17',
      flight: 'YT 676',
      route: 'Pokhara → Kathmandu',
      time: '09:50 - 10:50',
      ticket: '9992109782979'
    },
    {
      date: '2025-10-18',
      flight: '6E 1154',
      route: 'Kathmandu → Delhi',
      time: '13:45 - 15:45',
      duration: '4h 25m layover'
    },
    {
      date: '2025-10-18',
      flight: '6E 2273',
      route: 'Delhi → Pune',
      time: '20:10 - 22:30'
    }
  ],
  accommodations: [
    {
      dates: '2025-10-06 to 2025-10-08',
      hotel: 'Hotel Dashain',
      location: 'Lakeside Pokhara',
      booking: '20251006-509060-1237692920',
      access: 'SQD9578'
    },
    {
      dates: '2025-10-16 to 2025-10-17',
      hotel: 'Hotel Dashain',
      location: 'Lakeside Pokhara',
      booking: '20251016-509060-1236523785',
      access: 'L414L9S'
    },
    {
      dates: '2025-10-17 to 2025-10-18',
      hotel: 'Hotel Thamel Park',
      location: 'Kathmandu',
      booking: '#7236',
      access: '7238'
    }
  ]
}