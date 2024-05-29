const pool = require('../../DB/Database');

async function event(req, res) {
    try {
        const { id } = req.params;
  pool.query('SELECT * FROM events',(err,result)=>{
    if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    pool.query(`Select dob,name from employe`,(error,dob)=>{
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
       pool.query('Select start_date,leave_reason From leaves where id=?',[id],(errror,leaves)=>{
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        pool.query('Select * from announcements',(errrorr,anoucement)=>{

            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

        return res.status(200).json({status:200, events:result,employe:dob,leaves:leaves,anoucement:anoucement});

        })
        
       })

    })
  })
      

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = event ;
