import { tryDBConnection, Targets } from '../../../lib/database';
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse)  => {
    if (req.method === 'POST') {
        const target = Targets.create({ 
            name: req.body.name,
            displayname: req.body.displayname
        }).then(() => {
            res.status(200).json({ success: 'Target Added'})
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
  