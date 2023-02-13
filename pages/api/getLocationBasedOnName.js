import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const { location } = req.body;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
    const { data } = await axios.get(url);
    if(data && data.length) {
      return res.status(200).json(data[0]);
    }
    return res.status(200).json({ success: false });
  }
  