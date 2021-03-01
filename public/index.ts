import express from 'express'
import { Releases } from './lib/database'
import { Sequelize } from 'sequelize'

const app = express();
const port = 9020;

app.get("/", (req, res) => {
    res.send('Hello World!');
});

const {
    DB_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    DB_PORT
} = process.env

const db = new Sequelize(
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD,
	{
		host: DB_HOST,
        port: +DB_PORT,
		dialect: "mysql",
		logging: false
	}
);

app.get('/update/1/:product/:version/:buildID/:buildTarget/:locale/:channel/update.xml', async (req, res) => {
    
    const rel = await Releases.findAll({
        where: {
            product: req.params.product,
            target: req.params.buildTarget,
            locale: req.params.locale,
            channel: req.params.channel
        }
    })
    const top = rel.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
    const data = (top[0] as any).dataValues;
    if (data.id) {
        res.header("Content-Type", "text/xml");
        res.end(`<?xml version="1.0"?>
<updates>
        <update actions="showURL" appVersion="${data.version}" buildID="${data.buildID}" detailsURL="${data.releasenotesurl}" displayVersion="${data.displayversion}" openURL="${data.whatsnewurl}" type="${data.releasetype}">
            <patch type="complete" URL="${data.releaseurl}" hashFunction="sha512" hashValue="${data.releasesha512}" size="${data.releasesize}" />
        </update>
</updates>`);
    }
    //res.header("Content-Type", "text/xml");
    //res.end(`<?xml version="1.0"?>
    //<updates></updates>`)
})

app.listen(port, () => {
    console.log(`DotUpdate Server Started at http://localhost:${port}`)
});