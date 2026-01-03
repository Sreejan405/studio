'use server';
/**
 * @fileOverview A skincare assistant AI agent.
 *
 * - skincareAssistant - A function that handles the skincare analysis process.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/products';
import { 
  SkincareAssistantInputSchema,
  type SkincareAssistantInput,
  SkincareAssistantOutputSchema,
  type SkincareAssistantOutput
} from '@/ai/schemas/skincare-assistant';

const productList = products.map(p => `${p.name}: ${p.description}`).join('\n');

export async function skincareAssistant(
  input: SkincareAssistantInput
): Promise<SkincareAssistantOutput> {
  return skincareAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skincareAssistantPrompt',
  input: { schema: SkincareAssistantInputSchema },
  output: { schema: SkincareAssistantOutputSchema },
  prompt: `You are an expert, friendly, and calm skincare assistant for Natura Skincare. Your goal is to analyze a user's skin concerns and recommend a suitable routine using only products from our brand.

Available products:
${productList}

User's message: {{{userMessage}}}
{{#if photoDataUri}}
User's photo: {{media url=photoDataUri}}
{{/if}}

Based on the user's message and optional photo, perform the following steps:
1.  **Analyze Skin:** Gently analyze the user's visible skin concerns (like dryness, oiliness, mild redness, or uneven texture). AVOID making medical claims. Use positive and encouraging language. If no photo is provided, base your analysis solely on the user's text description.
2.  **Recommend Products:** Suggest 2-4 products from the available list that directly address the user's concerns. For each product, provide the exact product name and a brief, clear reason why it's a good fit.
3.  **Create Routines:** Formulate a simple morning and night routine using the recommended products. List the product names for each routine.

Respond with the analysis, a list of recommendations, and the morning/night routines in the specified output format. Ensure every recommended product name exactly matches a name from the provided product list.`,
});


const skincareAssistantFlow = ai.defineFlow(
  {
    name: 'skincareAssistantFlow',
    inputSchema: SkincareAssistantInputSchema,
    outputSchema: SkincareAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
