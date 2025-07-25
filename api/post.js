export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;

  if (!body.name || !body.wallet || !body.nominal || !body.jam || !body.tanggal) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  // In-memory list (akan reset setiap restart karena ini stateless)
  global.dataList = global.dataList || [];

  // Tambahkan data baru ke list
  global.dataList.push({
    name: body.name,
    wallet: body.wallet,
    nominal: body.nominal,
    jam: body.jam,
    tanggal: body.tanggal
  });

  return res.status(200).json({ success: true, total: global.dataList.length });
}
