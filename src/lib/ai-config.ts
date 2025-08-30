export const AI_CONFIG = {
  endpoint: 'https://oi-server.onrender.com/chat/completions',
  headers: {
    'customerId': 'minaatefsedkey@gmail.com',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xxx',
  },
  model: 'openrouter/anthropic/claude-sonnet-4',
  maxTokens: 1000,
  temperature: 0.7,
};

export async function sendAIMessage(messages: Array<{role: string, content: string}>) {
  try {
    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: AI_CONFIG.headers,
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages,
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'عذراً، لم أتمكن من الرد في الوقت الحالي.';
  } catch (error) {
    console.error('AI API Error:', error);
    return 'عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.';
  }
}