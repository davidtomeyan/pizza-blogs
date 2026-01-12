'use server';
import { z } from 'zod/v4';
import { sendEmail } from '@/lib/utils/send-email';
import { createData } from '@/lib/utils/create-data';

const schema = z.object({
  email: z.email('Please enter a valid email address'),
  name: z.string('Name is required').min(1, 'Name cannot be empty').max(50),
  message: z
    .string()
    .max(500, 'Message must be at most 500 characters')
    .optional(),
  confirm: z.literal('on', 'You must agree to the Privacy Policy'),
});

type State = {
  error?: Partial<Record<'email' | 'name' | 'message' | 'confirm', string>>;
  values?: Partial<Record<'email' | 'name' | 'message' | 'confirm', string>>;
  successMessage?: string;
};

export async function contactUsAction(
  state: State | null,
  formData: FormData,
): Promise<State> {
  const input = Object.fromEntries(formData.entries());
  const output = schema.safeParse(input);

  if (!output.success) {
    const error: State['error'] = {};
    output.error.issues.forEach((issue) => {
      const path = issue.path[0] as 'email' | 'name' | 'message';
      if (typeof path === 'string') {
        error[path] = issue.message;
      }
    });

    return {
      error,
      values: {
        name: input?.name as string,
        email: input?.email as string,
        message: input?.message as string,
        confirm: input?.confirm as string,
      },
    };
  }

  sendEmail({
    replyTo: output.data.email,
    subject: 'Best Pizza - New Contact Us Message 📩',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>New Contact Us Message</h2>

      <p><strong>Name:</strong> ${output.data.name}</p>
      <p><strong>Email:</strong> ${output.data.email}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line">
        ${output.data.message ?? '(no message)'}
      </p>
    </div>
  `,
  });

  await createData({
    collection: 'contact-messages',
    data: {
      name: output.data.name,
      email: output.data.email,
      message: output.data.message,
      confirm: true,
    },
  });

  return {
    successMessage:
      'Message sent! Our team will contact you as soon as possible.',
  };
}
