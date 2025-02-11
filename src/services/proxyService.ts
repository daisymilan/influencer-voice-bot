
interface ProxyResponse {
  status: number;
  data: any;
}

export async function proxyRequest(data: any): Promise<ProxyResponse> {
  try {
    const response = await fetch('https://n8n.servenorobot.com/webhook/trigger-influencer-chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error('Proxy error:', error);
    throw new Error('Failed to process request');
  }
}
