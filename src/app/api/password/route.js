export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); 
    }
  
    const { password } = req.body;
    if (password === process.env.PASSWORD) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  }
  