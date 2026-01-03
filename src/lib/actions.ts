'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  // In a real application, you would process the data here:
  // - Send an email
  // - Save to a database
  console.log('Form data received:', parsed.data);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: 'Form submitted successfully!' };
}
