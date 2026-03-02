import { z } from 'zod';

export const SkincareAssistantInputSchema = z.object({
  apiKey: z.string().optional().describe('The API key for the chatbot.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userMessage: z.string().optional().describe('Additional details or questions from the user.'),
  skinType: z.string().optional().describe("The user's reported skin type (e.g., Dry, Oily, etc.)."),
  concerns: z.array(z.string()).optional().describe("A list of the user's skin concerns."),
});
export type SkincareAssistantInput = z.infer<
  typeof SkincareAssistantInputSchema
>;

export const SkincareAssistantOutputSchema = z.object({
  analysis: z.string().describe("The AI's analysis of the user's skin concerns. Keep results non-medical and use confidence-building language."),
  recommendations: z.array(z.object({
    productName: z.string().describe('The name of the recommended product.'),
    reason: z.string().describe('A brief explanation of why this product is recommended for the user.'),
  })).describe('A list of recommended products available on the website.'),
  morningRoutine: z.array(z.string()).describe('A list of product names for a recommended morning routine.'),
  nightRoutine: z.array(z.string()).describe('A list of product names for a recommended night routine.'),
});
export type SkincareAssistantOutput = z.infer<
  typeof SkincareAssistantOutputSchema
>;
