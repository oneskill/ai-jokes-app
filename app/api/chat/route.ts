import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, temperature } = await req.json();
  // console.log('Received messages:', messages); 
  console.log('Received temperature:', temperature); // Log the received temperature

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a person ultra funny who love making jokes, you have all time the right joke to make people laugh`,
      },
      ...messages,
    ],
    temperature: temperature,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}