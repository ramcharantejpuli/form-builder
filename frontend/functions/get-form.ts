import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const formId = event.queryStringParameters?.formId;

    if (!formId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Form ID is required' }),
      };
    }

    // Forward the request to our backend API
    const response = await fetch(`${process.env.BACKEND_URL}/api/forms/${formId}`, {
      headers: {
        'Authorization': event.headers.authorization || '',
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    };
  } catch (error) {
    console.error('Error getting form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};