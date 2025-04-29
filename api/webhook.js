export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // now using your env variable

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    console.log("Received webhook event:", req.body);
    res.sendStatus(200);
  }
}
