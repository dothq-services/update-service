import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Cookies from 'cookie';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        state: req.query.state,
        redirect_uri: process.env.REDIRECT_URI
    }, {
        headers: {
            'Accept': 'application/json'
        }
    }).then((ghreq) => {
        // Get access token
        if (ghreq.data) {
            jwt.sign(
                {
                    token: ghreq.data.access_token
                },
                process.env.JWT_KEY,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    if (err) {
                        res.send('err')
                    }
                    res.redirect(`/id/callback?token=${token}`)
                }
            )
        } else {
            res.redirect('/')
        }
    }).catch((err) => {
        res.send('err')
    })
}