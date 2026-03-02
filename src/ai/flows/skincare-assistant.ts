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

// Prepare a clean list of products for the prompt context
const productContext = products.map(p => `- ${p.name}: ${p.benefit} (${p.description})`).join('\n');

export async function skincareAssistant(
  input: SkincareAssistantInput
): Promise<SkincareAssistantOutput> {
  return skincareAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skincareAssistantPrompt',
  input: { schema: SkincareAssistantInputSchema },
  output: { schema: SkincareAssistantOutputSchema },
  prompt: `You are the GlowNiva Skincare Expert, a friendly, professional, and knowledgeable digital consultant. Your goal is to analyze skin concerns and provide a personalized routine using ONLY GlowNiva products.

AVAILABLE GLOWNIVA PRODUCTS:
${productContext}

USER CONTEXT:
{{#if skinType}}Skin Type: {{{skinType}}}{{/if}}
{{#if concerns}}Concerns: {{#each concerns}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if userMessage}}Message: {{{userMessage}}}{{/if}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}

INSTRUCTIONS:
1. **Analyze:** Carefully evaluate the user's concerns based on their selected skin type, concerns, text, and optional photo. Focus on skin texture, hydration needs, and visible sensitivities. 
2. **Tone:** Be encouraging, calm, and trustworthy. Use "we" and "our" to represent the brand.
3. **Recommend:** Select 2-4 products that best address the concerns. Use the EXACT product names from the list above.
4. **Routine:** Create a Morning and Night routine using the recommended products. Explain the order clearly.
5. **Safety:** Do NOT provide medical diagnoses or claim to cure skin diseases. Use confident but non-medical language.

Provide the analysis, recommendations with reasons, and the routines in the specified JSON format.`,
});

const skincareAssistantFlow = ai.defineFlow(
  {
    name: 'skincareAssistantFlow',
    inputSchema: SkincareAssistantInputSchema,
    outputSchema: SkincareAssistantOutputSchema,
  },
  async (input) => {
    // Check for API Key if it's set in the environment
    const serverApiKey = process.env.SKINCARE_ASSISTANT_API_KEY;
    
    if (serverApiKey && input.apiKey !== serverApiKey) {
      throw new Error('Invalid API Key. Please update it in the settings.');
    }
    
    // If no server key is set, we allow the request for testing/demo purposes
    if (!serverApiKey) {
      console.warn('SKINCARE_ASSISTANT_API_KEY is not set in environment variables.');
    }

    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error('The assistant could not generate a response. Please try again.');
    }

    return output;
  }
);
