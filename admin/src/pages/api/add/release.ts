import { Releases } from '../../../lib/database';
import Sequelize from 'sequelize'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let id = 0;
        const rel = await Releases.findAll({
            order: Sequelize.literal('id DESC'),
        })
        console.log(rel[0])
        // Next, verify that all the columns have valid info to add
        // then we submit it to the DB, which sends it to the public server :)
        const target = Releases.create({ 
            name: req.body.name,
            product: req.body.product,
            locale: req.body.locale,
            target: req.body.target,
            version: req.body.version,
            displayversion: req.body.displayversion,
            buildID: req.body.buildID,
            whatsnewurl: req.body.whatsnewurl,
            releasenotesurl: req.body.releasenotesurl,
            releaseurl: req.body.releaseurl, // Gonna need to do some work here
            releasesha512: req.body.releasesha512,
            releasetype: req.body.releasetype,
            channel: req.body.channel,
            id: 0,
        }).then(() => {
            res.status(200).json({ success: 'Release Added'})
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
  