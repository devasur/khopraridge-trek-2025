import { init, id as instantId } from '@instantdb/react';
import { schema } from './schema';

const APP_ID = 'b824ac46-3f04-48e4-9573-bcc970bbb0ce';

export const db = init({
  appId: APP_ID,
  schema
});

// Export types for use throughout the app
export type { Schema } from './schema';

// Export InstantDB's ID generator
export const id = instantId;

// Query helpers for common operations
export const queries = {
  // Get all trek members (simple query first)
  trekMembers: {
    trekMembers: {}
  },

  // Get all flight bookings (simple query first)
  flightBookings: {
    flightBookings: {}
  },

  // Get current trekker by email with linked flights
  currentTrekker: (email: string) => ({
    trekMembers: {
      $: {
        where: { email: email.toLowerCase() }
      },
      flights: {}
    }
  }),

  // Get all packing items with user progress
  packingListWithProgress: (userId: string) => ({
    packingItems: {
      userProgress: {
        $: {
          where: { userId }
        }
      }
    }
  }),

  // Get route waypoints ordered by day
  routeWaypoints: {
    routeWaypoints: {
      $: {
        order: {
          serverCreatedAt: 'asc'
        }
      }
    }
  },

  // Get documentary equipment by category
  documentaryEquipmentByCategory: {
    documentaryEquipment: {
      $: {
        order: {
          category: 'asc',
          priority: 'desc'
        }
      }
    }
  },

  // Get emergency contacts by location
  emergencyContactsByLocation: {
    emergencyContacts: {
      $: {
        order: {
          location: 'asc',
          role: 'asc'
        }
      }
    }
  },

  // Get interview subjects with scheduling info
  interviewSchedule: {
    interviewSubjects: {
      $: {
        order: {
          scheduledDay: 'asc',
          scheduledTime: 'asc'
        }
      }
    }
  },

  // Get documentary shots by day and priority
  documentaryShotsByDay: {
    documentaryShots: {
      $: {
        order: {
          day: 'asc',
          priority: 'desc'
        }
      }
    }
  }
};

// Mutation helpers for common operations
export const mutations = {
  // Create a new trek member
  createTrekMember: (memberData: {
    name: string;
    email?: string;
    phone?: string;
    emergencyContact?: string;
    emergencyPhone?: string;
  }) => {
    return db.transact(
      db.tx.trekMembers[id()].update({
        ...memberData,
        hasBookings: false,
        bookingStatus: 'missing',
        medicalCertificate: false,
        travelInsurance: false,
        trekingGear: false,
        emergencyContactsShared: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
  },

  // Update packing item progress (without link for now)
  updatePackingProgress: (userId: string, packingItemId: string, checked: boolean, notes?: string) => {
    return db.transact(
      db.tx.packingProgress[id()].update({
        userId,
        packingItemId, // Store as regular field instead of link
        checked,
        notes,
        checkedAt: checked ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
  },

  // Add weather update
  addWeatherUpdate: (weatherData: {
    date: Date;
    location: string;
    conditions: string;
    temperature?: string;
    recommendation?: string;
  }) => {
    return db.transact(
      db.tx.weatherUpdates[id()].update({
        ...weatherData,
        createdAt: new Date(),
      })
    );
  },

  // Update documentary shot status
  updateShotStatus: (shotId: string, status: string, notes?: string) => {
    return db.transact(
      db.tx.documentaryShots[shotId].update({
        status,
        notes,
        updatedAt: new Date(),
      })
    );
  },

  // Complete interview
  completeInterview: (interviewId: string, notes?: string) => {
    return db.transact(
      db.tx.interviewSubjects[interviewId].update({
        status: 'completed',
        notes,
        updatedAt: new Date(),
      })
    );
  }
};