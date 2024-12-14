import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { formId, formData } = JSON.parse(event.body || '{}');

    // Forward the request to our backend API
    const response = await fetch(`${process.env.BACKEND_URL}/api/forms/${formId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': event.headers.authorization || '',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
