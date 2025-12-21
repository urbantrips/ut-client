import { z } from 'zod';

export const travelersInfoSchema = z.object({
  departureCity: z
    .string()
    .min(1, 'Departure city is required')
    .min(2, 'Departure city must be at least 2 characters')
    .max(100, 'Departure city must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Departure city can only contain letters, spaces, hyphens, and apostrophes'),
  
  travelStyle: z.enum(['Couple', 'Friends', 'Family', 'Solo'], {
    required_error: 'Travel style is required',
    invalid_type_error: 'Please select a valid travel style',
  }),
  
  startDate: z
    .date({
      required_error: 'Start date is required',
      invalid_type_error: 'Please select a valid start date',
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: 'Start date must be today or in the future',
      }
    ),
  
  endDate: z
    .date({
      required_error: 'End date is required',
      invalid_type_error: 'Please select a valid end date',
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: 'End date must be today or in the future',
      }
    ),
  
  travelerCounts: z.object({
    adults: z
      .number()
      .int('Adults must be a whole number')
      .min(1, 'At least 1 adult is required')
      .max(20, 'Maximum 20 adults allowed'),
    children: z
      .number()
      .int('Children must be a whole number')
      .min(0, 'Children cannot be negative')
      .max(20, 'Maximum 20 children allowed'),
    infants: z
      .number()
      .int('Infants must be a whole number')
      .min(0, 'Infants cannot be negative')
      .max(10, 'Maximum 10 infants allowed'),
  }),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    message: 'End date must be on or after the start date',
    path: ['endDate'],
  }
);

export type TravelersInfoFormInput = z.infer<typeof travelersInfoSchema>;

