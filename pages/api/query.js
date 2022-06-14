// pass through api via nextjs server
const API_URL = process.env.API_URL;

export default async function handler(req, res) {
  const { query } = req.query;
  const result = await fetch(`${API_URL}/sql?query=${query}`);
  if (result.ok) {
    const data = await result.text();
    res.status(200).send(data);
    res.end();
  } else {
    const data = await result.json();
    res.status(404).json(data);
    res.end();
  }
}
