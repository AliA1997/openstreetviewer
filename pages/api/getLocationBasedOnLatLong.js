import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const { lat, long } = req.body;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
    const { data } = await axios.get(url);
    if(data && data.boundingbox) {
      return res.status(200).json(data);
    }
    return res.status(200).json({ success: false });
  }