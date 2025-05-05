export default async function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "highbase123";

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("✅ Verified webhook");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('❌ Verification failed');
    }
  }

  if (req.method === 'POST') {
    console.log("✅ Webhook POST received:", JSON.stringify(req.body));
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method Not Allowed");
}
