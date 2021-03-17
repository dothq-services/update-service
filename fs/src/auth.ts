import jwt from 'jsonwebtoken'
import axios from 'axios'

const authenticate = (req: any, res: any, callback: any) => {
    const token: any = jwt.verify(
        req.body.token,
        process.env.JWT_KEY
    )
    axios.get('https://api.github.com/user/orgs', {
        headers: {
            'Authorization': `Bearer ${token.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    }).then((ghreq) => {
        var i
        for (i=0; i < (ghreq as any).data.length; ++i) { 
            if (ghreq.data[i].login === 'dothq') { 
                callback()
            } 
        }
    }).catch((err) => {
        res.status(400).send({
            error: 'authError',
            message: `Something went wrong attempting authentication: ${err}. NOTE: If the error is ENOENT, try switching the order of your parameters.`
        })
        return console.log(`❌ Authentication Error: ${err}`)
    })
}

export default authenticate;