const router = require("express").Router();
const axios = require('axios').default;
const moment = require('moment');

let POTENSUS = '/22751551271,22776608796';
let REKLAMUP = '/90851098,22776608796';
let ADSYIELD = '/21728129623,22776608796';
let A4G = '/60257202,22776608796';
let GRAVITE = '/57201580,22776608796';
let PREMIUMADS = '/75894840,22776608796';

let API_KEY_MAX_NERONS = process.env.API_KEY_MAX_NERONS;
if (!API_KEY_MAX_NERONS) {
    API_KEY_MAX_NERONS = require("../secrets.json").API_KEY_MAX_NERONS;
}

router.get("/:adunittype/:day", async (req, res) => {
    try {
        const day = req.params.day;
        let daybefore = moment(day).add(-1,'days').format('YYYY-MM-DD');
        let adUnitType = req.params.adunittype;
        let adUnitKey = '';

        switch (adUnitType) {
                        case 'and_int':
                            adUnitKey = '152d3aa13cf4afbf';
                            break;
                        case 'and_rw':
                            adUnitKey = '9bdf686de94042a3';
                            break;
                        case 'ios_int':
                            adUnitKey = '0c25880c3e93f50a';
                            break;
                        case 'ios_rw':
                            adUnitKey = '5e8c403407771dbd';
                            break;
                        case 'low_tier_int':
                            adUnitKey = '71c0e8b7e4034ff8';
                            break;
                        case 'low_tier_rw':
                            adUnitKey = '6ab7b0409a944e05';
        }

        let url = `https://r.applovin.com/maxReport?api_key=${API_KEY_MAX_NERONS}&columns=day,estimated_revenue,max_ad_unit_id,network,network_placement&format=json&start=${daybefore}&end=${day}&filter_network=GOOGLE_AD_MANAGER_NETWORK`;

        let result = await axios.get(url);

        let resultData = result.data.results.filter((e) => e.max_ad_unit_id === adUnitKey);

        const sortedData = resultData.map(item => {
            if (item.network_placement.includes(POTENSUS)) {
                item.adNetwork = 'POTENSUS';
            } else if (item.network_placement.includes(REKLAMUP)) {
                item.adNetwork = 'REKLAMUP';
            } else if (item.network_placement.includes(ADSYIELD)) {
                item.adNetwork = 'ADSYIELD';
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
