const pool = require('../../DB/Database');

async function deletesupport(req, res) {
    try {
        const { id } = req.params;
        console.log(id)
  pool.query('DELETE FROM supports Where id = ?',[id],(err,result)=>{
    if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({status:200, message:'Support Deleated Succefully'});
  })
      

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = deletesupport ;