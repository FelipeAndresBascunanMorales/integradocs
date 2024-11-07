import OpenAI from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, log, res }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  if (req.method === 'GET') {
    return res.text("hi mom!", 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }


  try {
    throwIfMissing(req.body, ['prompt']);
  } catch (err) {
    return res.json({ ok: false, error: err.message }, 400);
  }

  const openai = new OpenAI();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
      messages: [{ role: 'user', content: req.bodyJson.prompt }],
    });
    const completion = response.choices[0].message.content;
    log(completion);
    return res.json({ ok: true, completion }, 200);
  } catch {
    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  }
};
