import { tryDBConnection, Targets } from '../../../lib/database';
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse)  => {
    // Delete the Target from the DB
    if (req.method === 'POST') {
        const target = Targets.destroy({ 
            where: {
                name: req.body.name
            }
        }).then(() => {
            res.status(200).json({ success: 'Target Deleted'})
        }).catch((e) => {
            console.log(e)
            res.status(400).json({ error: e })
        });
        target;
    } else {
        // Handle any other HTTP method
        res.status(400).json({ error: 'Invalid Request Type' })
    }
}
  