import OpenAI from 'openai';
const key = process.env.OPENAI_API_KEY || '';
export function hasOpenAIKey(){ return !!key; }
export function getClient(){ return key ? new OpenAI({ apiKey: key }) : null; }
