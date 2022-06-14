// pass through api via nextjs server
import { serverApi } from "../../lib/api.js";

export default async function handler(req, res) {
  const { query } = req.query;
  await serverApi(query)
    .then((result) => {
      res.status(200).send(result);
      res.end();
    })
    .catch(({ error }) => {
      res.status(400).json({ error });
      res.end();
    });
}
