const pool = require('../../DB/Database');

async function award(req, res) {
    try {
        const { id } = req.params;
  pool.query('SELECT * FROM complaints Where complaint_from = ?',[id],(err,result)=>{
    if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({status:200, data: result});
  })
      

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = award ;