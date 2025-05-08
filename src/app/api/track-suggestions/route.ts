import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { trackTitle, artist, senderName } = await request.json();

    if (!trackTitle || !artist || !senderName) {
      return NextResponse.json(
        { error: 'Track title, artist, and sender name are required' },
        { status: 400 }
      );
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) {
      throw new Error('NOTIFICATION_EMAIL environment variable is not set');
    }

    const { data, error } = await resend.emails.send({
      from: 'Track Suggestions <onboarding@resend.dev>',
      to: notificationEmail,
      subject: 'New Track Suggestion',
      html: `
        <h2>New Track Suggestion</h2>
        <p><strong>Track:</strong> ${trackTitle}</p>
        <p><strong>Artist:</strong> ${artist}</p>
        <p><strong>From:</strong> ${senderName}</p>
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing track suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to process track suggestion' },
      { status: 500 }
    );
  }
} 