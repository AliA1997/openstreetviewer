
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const { xlat, ylat, xlong, ylong } = req.body;
    const query = `[out:json];(way[building](${xlat},${ylat},${xlong},${ylong}););out;`;
    const url = `http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    res.status(200).json({ name: 'John Doe' })
  }
  