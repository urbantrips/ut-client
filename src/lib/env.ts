import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
});

const envInput = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
};

export const env = envSchema.parse(envInput);

