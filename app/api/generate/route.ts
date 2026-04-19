import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy',
      baseURL: 'https://api.deepseek.com/v1',
    });
  }
  return _client;
}

export async function POST(req: NextRequest) {
  try {
    const { annualIncome, monthlyDebt, downPayment, creditScore, targetCity, homePrice, loanTerm } = await req.json();

    const prompt = `You are an AI housing affordability advisor. Analyze the following inputs to determine truly affordable home price range:

- Annual gross income: $${annualIncome}
- Monthly debt payments: $${monthlyDebt}
- Available down payment: $${downPayment}
- Credit score: ${creditScore}
- Target city: ${targetCity}
- Target home price: $${homePrice}
- Loan term: ${loanTerm} years

Provide:
1. Standard 28/36 rule assessment
2. AI lifestyle-adjusted affordability range (accounting for transportation, utilities, maintenance, HOA, PMI)
3. PITI breakdown (Principal, Interest, Taxes, Insurance) for the target home
4. Regional cost comparison for the target city
5. Rent vs. buy analysis with AI recommendation
6. A "truly affordable" price range recommendation
7. Hidden costs checklist specific to the target city/area

Format with clear dollar figures and a final recommendation.`;

    const completion = await getClient().chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error: unknown) {
    console.error('DeepSeek API error:', error);
    return NextResponse.json({ error: 'Failed to generate housing analysis' }, { status: 500 });
  }
}
