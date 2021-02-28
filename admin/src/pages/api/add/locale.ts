import { tryDBConnection, Locales } from '../../../lib/database';
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse)  => {
    // Add the Locale to the Database
    //
    //res.status(200).json({ name: 'John Doe' })
    if (req.method === 'POST') {
        const locale = Locales.create({ 
            locale: req.body.locale 
        }).then(() => {
            res.status(200).json({ success: 'Locale Added'})
        }).catch((e) => {
            res.status(400).json({ error: e })
        });
    } else {
        // Handle any other HTTP method
        res.status(400).json({ error: 'Invalid Request Type' })
    }
}
  