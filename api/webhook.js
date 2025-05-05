export default async function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "highbase123";

  try {
    if (req.method === "GET") {
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified.");
        return res.status(200).send(challenge);
      } else {
        return res.status(403).send("Forbidden");
      }
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);
          console.log("Webhook received:", JSON.stringify(data, null, 2));
          res.status(200).send("EVENT_RECEIVED");
        } catch (err) {
          console.error("Parse error:", err);
          res.status(400).send("Invalid JSON");
        }
      });

      return; // stop further execution
    }

    return res.status(405).send("Method Not Allowed");
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).send("Internal Server Error");
  }
}
