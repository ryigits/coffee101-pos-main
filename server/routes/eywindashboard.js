const router = require("express").Router();
const axios = require('axios').default;
const moment=require('moment');

let POTENSUS = '/22751551271,22598630004';
let REKLAMUP = '/90851098,22598630004';
let A4G = '/60257202,22598630004';
let MAKROO='/324749355,22598630004';
let PREMIUMADS='/75894840,22598630004';
let GRAVITE = '/57201580,22598630004';

let API_KEY_MAX_EYWIN = process.env.API_KEY_MAX_EYWIN;
if (!API_KEY_MAX_EYWIN) {
    API_KEY_MAX_EYWIN = require("../secrets.json").API_KEY_MAX_EYWIN;
}

router.get("/:adunittype/:day", async (req, res) => {
    try {
        const day = req.params.day;
        let daybefore = moment(day).add(-1,'days').format('YYYY-MM-DD');
        let adUnitType = req.params.adunittype;
        let adUnitKey = '';

        switch (adUnitType) {
                        case 'and_int':
                            adUnitKey = '7a921e4f304e0119';
                            break;
                        case 'and_mrect':
                            adUnitKey = 'e983fd2f6b6c9683';
                            break;
        }

        let url = `https://r.applovin.com/maxReport?api_key=${API_KEY_MAX_EYWIN}&columns=day,estimated_revenue,max_ad_unit_id,network,network_placement&format=json&start=${daybefore}&end=${day}&filter_network=GOOGLE_AD_MANAGER_NETWORK`;

        let result = await axios.get(url);

        let resultData = result.data.results.filter((e) => e.max_ad_unit_id === adUnitKey);

        const sortedData = resultData.map(item => {
            if (item.network_placement.includes(POTENSUS)) {
                item.adNetwork = 'POTENSUS';
            } else if (item.network_placement.includes(REKLAMUP)) {
                item.adNetwork = 'REKLAMUP';
            } else if (item.network_placement.includes(MAKROO)) {
                item.adNetwork = 'MAKROO';
            } else if (item.network_placement.includes(A4G)) {
                item.adNetwork = 'A4G';
            } else if (item.network_placement.includes(GRAVITE)) {
                item.adNetwork = 'GRAVITE';
            } else if (item.network_placement.includes(PREMIUMADS)) {
                item.adNetwork = 'PREMIUMADS';
            }
            return item;
        });

        res.status(200).json(sortedData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
