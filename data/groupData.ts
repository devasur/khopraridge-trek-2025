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

// PLACEHOLDER DATA for build purposes only
// Real trek member data comes from InstantDB database
// This file contains NO personal information - all names, flights, and details are fictional
export const trekMembers: TrekMember[] = [
  {
    id: 'sample-member-1',
    name: 'Sample Member 1',
    arrivalDate: '2025-10-06',
    arrivalTime: '10:00 AM',
    arrivalFlight: 'XX 1234',
    arrivalFrom: 'Sample City',
    ktmToPokharaFlight: 'YY 567',
    ktmToPokharaTime: '12:00 PM',
    pokharaToKtmFlight: 'ZZ 890',
    pokharaToKtmTime: '11:00 AM',
    departureDate: '2025-10-18',
    departureFlight: 'AA 5678',
    departureTime: '2:00 PM',
    departureTo: 'Sample Destination',
    status: 'complete',
    missingItems: []
  },
  {
    id: 'sample-member-2',
    name: 'Sample Member 2',
    arrivalDate: '2025-10-07',
    arrivalTime: '8:30 AM',
    arrivalFlight: 'BB 9999',
    arrivalFrom: 'Example City',
    ktmToPokharaFlight: 'CC 111',
    ktmToPokharaTime: '6:20 PM',
    pokharaToKtmFlight: 'DD 222',
    pokharaToKtmTime: '10:45 AM',
    departureDate: '2025-10-18',
    departureFlight: 'EE 3333',
    departureTime: '6:30 AM',
    departureTo: 'Example Destination',
    status: 'partial',
    missingItems: ['flight confirmation']
  },
  {
    id: 'sample-member-3',
    name: 'Sample Member 3',
    arrivalDate: '2025-10-07',
    arrivalTime: '3:00 PM',
    arrivalFlight: 'FF 4444',
    arrivalFrom: 'Demo City',
    pokharaToKtmFlight: 'GG 555',
    pokharaToKtmTime: '2:00 PM',
    departureDate: '2025-10-18',
    departureFlight: 'HH 6666',
    departureTime: '4:00 PM',
    departureTo: 'Demo Destination',
    status: 'missing',
    missingItems: ['arrival details', 'departure confirmation']
  }
]

export const emergencyContacts = [
  {
    id: 'emergency-1',
    name: 'Sample Emergency Contact 1',
    phone: '+XX-XXXXXXXXXX',
    relation: 'Family',
    memberId: 'sample-member-1'
  },
  {
    id: 'emergency-2',
    name: 'Sample Emergency Contact 2',
    phone: '+XX-XXXXXXXXXX',
    relation: 'Friend',
    memberId: 'sample-member-2'
  }
]

// Status calculations
export const getGroupStatus = () => {
  const total = trekMembers.length
  const complete = trekMembers.filter(m => m.status === 'complete').length
  const partial = trekMembers.filter(m => m.status === 'partial').length
  const missing = trekMembers.filter(m => m.status === 'missing').length

  return {
    total,
    complete,
    partial,
    missing,
    completionPercentage: Math.round((complete / total) * 100)
  }
}