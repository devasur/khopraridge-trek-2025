import { i } from '@instantdb/react';

export const schema = i.schema({
  entities: {
    // Trek participants
    trekMembers: i.entity({
      name: i.string(),
      email: i.string().optional(),
      phone: i.string().optional(),
      bloodGroup: i.string().optional(),
      emergencyContact: i.string().optional(),
      emergencyPhone: i.string().optional(),
      hasBookings: i.boolean(),
      bookingStatus: i.string(), // 'complete', 'partial', 'missing'
      medicalCertificate: i.boolean(),
      travelInsurance: i.boolean(),
      trekingGear: i.boolean(),
      emergencyContactsShared: i.boolean(),
      hasAccess: i.boolean(), // Whether trekker has site access
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Flight bookings for each member
    flightBookings: i.entity({
      flightNumber: i.string(),
      route: i.string(), // e.g., "Pune → Delhi"
      departureTime: i.string(),
      arrivalTime: i.string(),
      ticketNumber: i.string().optional(),
      layoverDuration: i.string().optional(),
      date: i.date(),
      bookingReference: i.string().optional(),
      createdAt: i.date(),
    }),

    // Hotel accommodations
    accommodations: i.entity({
      hotelName: i.string(),
      location: i.string(),
      checkIn: i.date(),
      checkOut: i.date(),
      bookingReference: i.string(),
      accessCode: i.string().optional(),
      contactInfo: i.string().optional(),
      createdAt: i.date(),
    }),

    // Packing list items
    packingItems: i.entity({
      name: i.string(),
      category: i.string(), // 'clothing', 'gear', 'electronics', 'personal'
      weight: i.number(), // in grams
      essential: i.boolean(),
      count: i.number(),
      isCustom: i.boolean(),
      createdAt: i.date(),
    }),

    // User-specific packing progress
    packingProgress: i.entity({
      userId: i.string(),
      packingItemId: i.string(), // Reference to packing item
      checked: i.boolean(),
      notes: i.string().optional(),
      checkedAt: i.date().optional(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Trek route waypoints
    routeWaypoints: i.entity({
      name: i.string(),
      type: i.string(), // 'village', 'camp', 'summit', 'lake', 'lodge'
      latitude: i.number(),
      longitude: i.number(),
      elevation: i.number(), // in meters
      description: i.string().optional(),
      dayNumber: i.number(),
      distanceFromPrevious: i.number().optional(), // in km
      estimatedDuration: i.string().optional(), // e.g., "6-7 hours"
      difficulty: i.string().optional(), // 'easy', 'moderate', 'difficult'
      accommodationType: i.string().optional(),
      createdAt: i.date(),
    }),

    // Documentary equipment
    documentaryEquipment: i.entity({
      name: i.string(),
      category: i.string(), // 'camera', 'audio', 'support', 'storage'
      description: i.string().optional(),
      owner: i.string().optional(),
      quantity: i.number(),
      weight: i.number().optional(),
      batteryLife: i.string().optional(),
      storageCapacity: i.string().optional(),
      weatherResistant: i.boolean(),
      priority: i.string(), // 'essential', 'important', 'optional'
      createdAt: i.date(),
    }),

    // Interview subjects and schedules
    interviewSubjects: i.entity({
      name: i.string(),
      role: i.string(), // 'participant', 'guide', 'local', 'expert'
      location: i.string().optional(),
      topics: i.string(), // JSON string of topics array
      duration: i.number(), // in minutes
      scheduledDay: i.number().optional(),
      scheduledTime: i.string().optional(),
      status: i.string(), // 'planned', 'scheduled', 'completed', 'cancelled'
      notes: i.string().optional(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Interview question templates
    interviewTemplates: i.entity({
      name: i.string(), // 'Pre-Trek Expectations', 'Post-Trek Reflections', etc.
      description: i.string().optional(),
      questions: i.string(), // JSON array of questions
      estimatedDuration: i.number(), // in minutes
      storyArcTags: i.string(), // JSON array of story elements this covers
      targetRoles: i.string(), // JSON array of roles this template is for
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Scheduled interviews (who interviews whom, when, with what questions)
    interviewSchedules: i.entity({
      intervieweeName: i.string(), // Who is being interviewed
      interviewerName: i.string(), // Who conducts the interview
      templateName: i.string(), // Which question template to use
      scheduledDate: i.date(),
      scheduledTime: i.string(),
      location: i.string(),
      estimatedDuration: i.number(), // in minutes
      phase: i.string(), // 'pre-trek', 'during-trek', 'post-trek'
      priority: i.string(), // 'high', 'medium', 'low'
      status: i.string(), // 'planned', 'confirmed', 'in-progress', 'completed', 'failed', 'rescheduled'
      actualStartTime: i.string().optional(),
      actualEndTime: i.string().optional(),
      actualDuration: i.number().optional(),
      completionNotes: i.string().optional(),
      failureReason: i.string().optional(),
      footageQuality: i.string().optional(), // 'excellent', 'good', 'poor', 'unusable'
      keyInsights: i.string().optional(), // Key points captured
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Story arc coverage tracking
    storyArcElements: i.entity({
      name: i.string(), // 'Journey Motivation', 'Physical Challenges', 'Group Dynamics', etc.
      description: i.string(),
      priority: i.string(), // 'critical', 'important', 'nice-to-have'
      targetCoverage: i.number(), // How many perspectives needed
      currentCoverage: i.number(), // How many we have
      coverageGap: i.number(), // Calculated: target - current
      lastUpdated: i.date(),
      createdAt: i.date(),
    }),

    // Daily interview plans
    dailyInterviewPlans: i.entity({
      date: i.date(),
      phase: i.string(), // 'pre-trek', 'trek-day-1', 'trek-day-2', ..., 'post-trek'
      location: i.string(),
      totalInterviews: i.number(),
      completedInterviews: i.number(),
      failedInterviews: i.number(),
      briefingSent: i.boolean(),
      briefingSentAt: i.date().optional(),
      dailyNotes: i.string().optional(),
      whatsappBrief: i.string().optional(), // Pre-generated WhatsApp message
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Documentary shots and scenes
    documentaryShots: i.entity({
      title: i.string(),
      type: i.string(), // 'establishing', 'interview', 'action', 'b-roll', 'landscape'
      location: i.string(),
      day: i.number(),
      timeOfDay: i.string(), // 'sunrise', 'morning', 'afternoon', 'sunset', 'night'
      description: i.string(),
      equipment: i.string(), // JSON string of equipment array
      duration: i.number().optional(), // estimated minutes
      priority: i.string(), // 'must-have', 'important', 'nice-to-have'
      status: i.string(), // 'planned', 'in-progress', 'completed', 'missed'
      notes: i.string().optional(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Emergency contacts and information
    emergencyContacts: i.entity({
      name: i.string(),
      role: i.string(), // 'local-guide', 'tour-operator', 'hospital', 'embassy', 'family'
      phone: i.string(),
      altPhone: i.string().optional(),
      email: i.string().optional(),
      address: i.string().optional(),
      location: i.string(), // 'pokhara', 'kathmandu', 'trek-route', 'india'
      available24x7: i.boolean(),
      language: i.string().optional(),
      notes: i.string().optional(),
      createdAt: i.date(),
    }),

    // Weather and conditions
    weatherUpdates: i.entity({
      date: i.date(),
      location: i.string(),
      temperature: i.string().optional(),
      conditions: i.string(), // 'clear', 'cloudy', 'rain', 'snow'
      visibility: i.string().optional(),
      windSpeed: i.string().optional(),
      precipitation: i.number().optional(), // percentage
      recommendation: i.string().optional(),
      source: i.string().optional(),
      createdAt: i.date(),
    }),

    // User progress tracking
    userProgress: i.entity({
      userId: i.string(),
      section: i.string(), // 'packing', 'documentation', 'preparation'
      itemId: i.string(),
      completed: i.boolean(),
      completedAt: i.date().optional(),
      notes: i.string().optional(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),

    // Allowed emails for access control
    allowedEmails: i.entity({
      email: i.string(),
      role: i.string(), // 'admin', 'leader', 'participant'
      addedBy: i.string(), // email of admin who added this
      addedAt: i.date(),
      isActive: i.boolean(),
      notes: i.string().optional(),
    }),
  },

  links: {
    // Trek member to flight bookings
    trekMemberFlights: {
      forward: {
        on: 'trekMembers',
        has: 'many',
        label: 'flights'
      },
      reverse: {
        on: 'flightBookings',
        has: 'one',
        label: 'trekMember'
      }
    },

    // Trek member to accommodations
    trekMemberAccommodations: {
      forward: {
        on: 'trekMembers',
        has: 'many',
        label: 'accommodations'
      },
      reverse: {
        on: 'accommodations',
        has: 'many',
        label: 'trekMembers'
      }
    },

    // Packing progress links
    packingItemProgress: {
      forward: {
        on: 'packingItems',
        has: 'many',
        label: 'userProgress'
      },
      reverse: {
        on: 'packingProgress',
        has: 'one',
        label: 'packingItem'
      }
    },

    // Documentary equipment links
    equipmentShots: {
      forward: {
        on: 'documentaryEquipment',
        has: 'many',
        label: 'shotsUsedIn'
      },
      reverse: {
        on: 'documentaryShots',
        has: 'many',
        label: 'equipmentNeeded'
      }
    },
  }
});

export type Schema = typeof schema;