import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TravelStyle = 'Couple' | 'Friends' | 'Family' | 'Solo';

export interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

export type HotelCategory = 'Budget' | 'Mid' | 'Luxury';
export type TravelMode = 'Flight' | 'Train' | 'Bus' | 'Self-drive';
export type RoomType = 'Single Room' | 'Double Room' | 'Twin Room' | 'Suite' | 'Family Room';

export interface TravelersInfoFormData {
  departureCity: string;
  travelStyle: TravelStyle;
  startDate: Date | null;
  endDate: Date | null;
  travelerCounts: TravelerCounts;
}

export interface HotelTravelModeFormData {
  hotelCategory: HotelCategory;
  roomType: RoomType;
  preferredTravelMode: TravelMode | null;
  needReturnTicket: boolean;
}

export interface TravelStylePreferences {
  relaxation: number;
  nightlife: number;
  heritage: number;
  adventure: number;
}

export interface TravelStyleActivitiesFormData {
  travelStylePreferences: TravelStylePreferences;
  selectedActivities: string[];
}

interface TravelersInfoStore {
  // Current step
  currentStep: number;

  // Selected destination
  selectedDestination: string;

  // Step 1: Travelers Info Form data
  departureCity: string;
  travelStyle: TravelStyle;
  startDate: Date | null;
  endDate: Date | null;
  travelerCounts: TravelerCounts;

  // Step 2: Hotel & Travel Mode Form data
  hotelCategory: HotelCategory;
  roomType: RoomType;
  preferredTravelMode: TravelMode | null;
  needReturnTicket: boolean;

  // Step 3: Travel Style & Activities Form data
  travelStylePreferences: TravelStylePreferences;
  selectedActivities: string[];

  // Step 4: OTP Verification data
  verificationName: string;
  verificationPhone: string;
  verificationCountryCode: string;

  // Step navigation actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Destination actions
  setSelectedDestination: (destination: string) => void;

  // Step 1 Actions
  setDepartureCity: (city: string) => void;
  setTravelStyle: (style: TravelStyle) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setTravelerCounts: (counts: TravelerCounts) => void;
  updateTravelerCount: (type: keyof TravelerCounts, increment: boolean) => void;
  getFormData: () => TravelersInfoFormData;

  // Step 2 Actions
  setHotelCategory: (category: HotelCategory) => void;
  setRoomType: (type: RoomType) => void;
  setPreferredTravelMode: (mode: TravelMode) => void;
  setNeedReturnTicket: (need: boolean) => void;
  getHotelTravelModeData: () => HotelTravelModeFormData;

  // Step 3 Actions
  setTravelStylePreference: (key: keyof TravelStylePreferences, value: number) => void;
  toggleActivity: (activity: string) => void;
  getTravelStyleActivitiesData: () => TravelStyleActivitiesFormData;

  // Step 4 Actions
  setVerificationName: (name: string) => void;
  setVerificationPhone: (phone: string) => void;
  setVerificationCountryCode: (code: string) => void;

  // Reset
  resetForm: () => void;
}

const initialTravelerCounts: TravelerCounts = {
  adults: 0,
  children: 0,
  infants: 0,
};

export const useTravelersInfoStore = create<TravelersInfoStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentStep: 1,
        selectedDestination: '',
        departureCity: '',
        travelStyle: 'Couple',
        startDate: null,
        endDate: null,
        travelerCounts: initialTravelerCounts,
        hotelCategory: 'Mid',
        roomType: 'Double Room',
        preferredTravelMode: null,
        needReturnTicket: true,
        travelStylePreferences: {
          relaxation: 0,
          nightlife: 0,
          heritage: 0,
          adventure: 0,
        },
        selectedActivities: [],
        verificationName: '',
        verificationPhone: '',
        verificationCountryCode: 'IN',

        // Step navigation actions
        setCurrentStep: (step) => set({ currentStep: step }),
        nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
        previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

        // Destination actions
        setSelectedDestination: (destination) => set({ selectedDestination: destination }),

        // Step 1 Actions
        setDepartureCity: (city) => set({ departureCity: city }),
        setTravelStyle: (style) => set({ travelStyle: style }),
        setStartDate: (date) => set({ startDate: date }),
        setEndDate: (date) => set({ endDate: date }),
        setTravelerCounts: (counts) => set({ travelerCounts: counts }),
        updateTravelerCount: (type, increment) =>
          set((state) => ({
            travelerCounts: {
              ...state.travelerCounts,
              [type]: Math.max(0, state.travelerCounts[type] + (increment ? 1 : -1)),
            },
          })),
        getFormData: () => {
          const state = get();
          return {
            departureCity: state.departureCity,
            travelStyle: state.travelStyle,
            startDate: state.startDate,
            endDate: state.endDate,
            travelerCounts: state.travelerCounts,
          };
        },

        // Step 2 Actions
        setHotelCategory: (category) => set({ hotelCategory: category }),
        setRoomType: (type) => set({ roomType: type }),
        setPreferredTravelMode: (mode) => set({ preferredTravelMode: mode }),
        setNeedReturnTicket: (need) => set({ needReturnTicket: need }),
        getHotelTravelModeData: () => {
          const state = get();
          return {
            hotelCategory: state.hotelCategory,
            roomType: state.roomType,
            preferredTravelMode: state.preferredTravelMode,
            needReturnTicket: state.needReturnTicket,
          };
        },

        // Step 3 Actions
        setTravelStylePreference: (key, value) =>
          set((state) => ({
            travelStylePreferences: {
              ...state.travelStylePreferences,
              [key]: Math.max(0, Math.min(100, value)),
            },
          })),
        toggleActivity: (activity) =>
          set((state) => ({
            selectedActivities: state.selectedActivities.includes(activity)
              ? state.selectedActivities.filter((a) => a !== activity)
              : [...state.selectedActivities, activity],
          })),
        getTravelStyleActivitiesData: () => {
          const state = get();
          return {
            travelStylePreferences: state.travelStylePreferences,
            selectedActivities: state.selectedActivities,
          };
        },

        // Step 4 Actions
        setVerificationName: (name) => set({ verificationName: name }),
        setVerificationPhone: (phone) => set({ verificationPhone: phone }),
        setVerificationCountryCode: (code) => set({ verificationCountryCode: code }),

        // Reset
        resetForm: () =>
          set({
            currentStep: 1,
            selectedDestination: '',
            departureCity: '',
            travelStyle: 'Couple',
            startDate: null,
            endDate: null,
            travelerCounts: initialTravelerCounts,
            hotelCategory: 'Mid',
            roomType: 'Double Room',
            preferredTravelMode: null,
            needReturnTicket: true,
            travelStylePreferences: {
              relaxation: 0,
              nightlife: 0,
              heritage: 0,
              adventure: 0,
            },
            selectedActivities: [],
            verificationName: '',
            verificationPhone: '',
            verificationCountryCode: 'IN',
          }),
      }),
      {
        name: 'travelers-info-storage',
        // Custom serialization for Date objects
        partialize: (state) => ({
          currentStep: state.currentStep,
          selectedDestination: state.selectedDestination,
          departureCity: state.departureCity,
          travelStyle: state.travelStyle,
          startDate: state.startDate?.toISOString() || null,
          endDate: state.endDate?.toISOString() || null,
          travelerCounts: state.travelerCounts,
          hotelCategory: state.hotelCategory,
          roomType: state.roomType,
          preferredTravelMode: state.preferredTravelMode,
          needReturnTicket: state.needReturnTicket,
          travelStylePreferences: state.travelStylePreferences,
          selectedActivities: state.selectedActivities,
          verificationName: state.verificationName,
          verificationPhone: state.verificationPhone,
          verificationCountryCode: state.verificationCountryCode,
        }),
        // Custom storage with Date deserialization
        storage: {
          getItem: (name: string) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            try {
              const parsed = JSON.parse(str);
              if (parsed?.state) {
                parsed.state = {
                  ...parsed.state,
                  startDate: parsed.state.startDate ? new Date(parsed.state.startDate) : null,
                  endDate: parsed.state.endDate ? new Date(parsed.state.endDate) : null,
                };
              }
              return JSON.stringify(parsed) as any;
            } catch {
              return str as any;
            }
          },
          setItem: (name: string, value: any) => {
            localStorage.setItem(name, value as string);
          },
          removeItem: (name: string) => {
            localStorage.removeItem(name);
          },
        },
      }
    )
  )
);

