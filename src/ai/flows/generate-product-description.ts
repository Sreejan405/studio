'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate compelling product descriptions from keywords.
 *
 * generateProductDescription - A function that takes keywords and generates a product description.
 * GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  keywords: z.string().describe('Keywords describing the product.'),
});

export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling product description generated from the keywords.'),
});

export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert for a natural skincare brand.
  Generate a compelling product description based on the following keywords:
  {{{keywords}}}
  The brand focuses on clean, natural, minimal, trustworthy skincare products for daily use and has a calm, premium, honest, nature-inspired, modern brand personality.
  No flashy or over-designed UI. The site should feel safe, soothing, and confidence-building.
  Use soft, earthy, natural tones: Sage Green / Olive Green, Warm Beige / Off-White / Cream, Soft Brown / Muted Gold (very subtle).
  Body text font should be Simple and highly readable sans-serif.
  Focus on:
  * Natural philosophy
  * Transparency
  * Trust
  Conversion-focused UI. Build this as if it were a real brand launching tomorrow, not a demo or concept site.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
