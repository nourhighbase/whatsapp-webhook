export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === 'POST') {
    // Make sure it won't crash if body is undefined
    try {
      console.log("Received webhook event:", req.body || "No body received");
      return res.sendStatus(200);
    } catch (err) {
      console.error("POST error:", err);
      return res.sendStatus(500);
    }
  }

  res.sendStatus(405); // method not allowed
}
