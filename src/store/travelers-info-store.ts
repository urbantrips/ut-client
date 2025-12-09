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
  preferredTravelMode: TravelMode;
  needReturnTicket: boolean;
}

interface TravelersInfoStore {
  // Current step
  currentStep: number;

  // Step 1: Travelers Info Form data
  departureCity: string;
  travelStyle: TravelStyle;
  startDate: Date | null;
  endDate: Date | null;
  travelerCounts: TravelerCounts;

  // Step 2: Hotel & Travel Mode Form data
  hotelCategory: HotelCategory;
  roomType: RoomType;
  preferredTravelMode: TravelMode;
  needReturnTicket: boolean;

  // Step navigation actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

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

  // Reset
  resetForm: () => void;
}

const initialTravelerCounts: TravelerCounts = {
  adults: 2,
  children: 1,
  infants: 0,
};

export const useTravelersInfoStore = create<TravelersInfoStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentStep: 1,
        departureCity: '',
        travelStyle: 'Couple',
        startDate: null,
        endDate: null,
        travelerCounts: initialTravelerCounts,
        hotelCategory: 'Mid',
        roomType: 'Double Room',
        preferredTravelMode: 'Flight',
        needReturnTicket: true,

        // Step navigation actions
        setCurrentStep: (step) => set({ currentStep: step }),
        nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
        previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

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

        // Reset
        resetForm: () =>
          set({
            currentStep: 1,
            departureCity: '',
            travelStyle: 'Couple',
            startDate: null,
            endDate: null,
            travelerCounts: initialTravelerCounts,
            hotelCategory: 'Mid',
            roomType: 'Double Room',
            preferredTravelMode: 'Flight',
            needReturnTicket: true,
          }),
      }),
      {
        name: 'travelers-info-storage',
        // Custom serialization for Date objects
        partialize: (state) => ({
          currentStep: state.currentStep,
          departureCity: state.departureCity,
          travelStyle: state.travelStyle,
          startDate: state.startDate?.toISOString() || null,
          endDate: state.endDate?.toISOString() || null,
          travelerCounts: state.travelerCounts,
          hotelCategory: state.hotelCategory,
          roomType: state.roomType,
          preferredTravelMode: state.preferredTravelMode,
          needReturnTicket: state.needReturnTicket,
        }),
        // Custom storage with Date deserialization
        storage: {
          getItem: (name) => {
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
              return JSON.stringify(parsed);
            } catch {
              return str;
            }
          },
          setItem: (name, value) => {
            localStorage.setItem(name, value);
          },
          removeItem: (name) => {
            localStorage.removeItem(name);
          },
        },
      }
    )
  )
);

