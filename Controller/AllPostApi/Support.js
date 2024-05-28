const pool = require('../../DB/Database');

async function support(req, res) {
    const {
        subject,
        ticket_created,
        user,
        priority,
        end_date,
        ticket_code,
        status,
        attachment,
        created_by,
        description
    } = req.body;

    try {
        if(!subject || !description || !priority || !status){
            return res.status(200).json({ status: 400, message: 'Please Field All Fields' });
        }
        const date = new Date();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const code =  hours + minutes + seconds ;
        pool.query(
            `INSERT INTO supports (subject, 
                ticket_created, user, 
                priority,end_date,ticket_code,status,attachment,description, created_by)
             VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`,
            [
                subject,
                ticket_created,
                user,
                priority,
                end_date,
                code,
                status,
                attachment,
                description,
                created_by,
            ],
            (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ status: 200, message: 'Support Created Successfully' });
            }
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = support;
