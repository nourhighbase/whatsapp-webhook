export default async function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "fallback_token";

  try {
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
      let body = '';

      // Optional: Parse raw body stream for advanced security (e.g., signature checks)
      req.on('data', chunk => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          console.log("✅ Webhook event received:", JSON.stringify(parsedBody, null, 2));
          res.status(200).send("EVENT_RECEIVED");
        } catch (parseErr) {
          console.error("❌ JSON parse error:", parseErr);
          res.status(400).send("Invalid JSON");
        }
      });

      return; // prevent default execution
    }

    return res.status(405).send('Method Not Allowed');
  } catch (err) {
    console.error("🔥 Unexpected server error:", err);
    return res.status(500).send("Internal Server Error");
  }
}
