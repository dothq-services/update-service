import { tryDBConnection, Targets } from '../../../lib/database';
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
        const targets = await Targets.findAll();
        res.status(200).json(JSON.stringify(targets, null, 2));
}