export default function handler(req, res) {
  try {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "fallback_token";

    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
      } else {
        return res.status(403).send('Forbidden');
      }
    }

    if (req.method === 'POST') {
      console.log("Received webhook event:", req.body || {});
      return res.status(200).send("POST received");
    }

    return res.status(405).send('Method Not Allowed');
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("Internal Server Error");
  }
}
