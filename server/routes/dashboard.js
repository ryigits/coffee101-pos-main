const router = require("express").Router();

const axios = require('axios');


let API_KEY_MAX_EYWIN = process.env.API_KEY_MAX_EYWIN;
if (!API_KEY_MAX_EYWIN) {
    API_KEY_MAX_EYWIN = require("../secrets.json").API_KEY_MAX_EYWIN;
}
let API_KEY_MAX_NERONS = process.env.API_KEY_MAX_NERONS;
if (!API_KEY_MAX_NERONS) {
    API_KEY_MAX_NERONS = require("../secrets.json").API_KEY_MAX_NERONS;
}

router.get("/:selectedday/:adunittype", async (req, res) => {
    try {
        const adUnitType = req.params.adunittype;
        // const musteri = req.session.dashboard;
        const musteri = 'nerons';
        const selectedday = req.params.selectedday;
        const API_KEY = musteri === 'nerons' ? API_KEY_MAX_NERONS : API_KEY_MAX_EYWIN;
        const MAX_AD_UNIT_ID_MAP = {
            'nerons': {
                'and_int': '152d3aa13cf4afbf',
                'and_rw': '9bdf686de94042a3',
                'ios_int': '0c25880c3e93f50a',
                // Diğer ad unit tipleri için gerekli olan ID'leri ekleyin
            },
            'eywin': {
                'and_int': '7a921e4f304e0119',
                'and_mrect': 'e983fd2f6b6c9683',
                // Diğer ad unit tipleri için gerekli olan ID'leri ekleyin
            }
        };
        
        // Diğer kodlar...
        
        const adUnitKey = MAX_AD_UNIT_ID_MAP[musteri][adUnitType];


        let queryParams = new URLSearchParams({
            api_key: API_KEY,
            columns: 'day,estimated_revenue,max_ad_unit_id,network,network_placement',
            format: 'json',
            start: selectedday.toUpperCase(),
            end: selectedday.toUpperCase(),
            filter_network: 'GOOGLE_AD_MANAGER_NETWORK',
        });

        let url = `https://r.applovin.com/maxReport?${queryParams.toString()}`;

        const result = await axios.get(url);

        const result2 = result.data.results.filter((e) => e.max_ad_unit_id === adUnitKey);  // ad unit tipine gore olan butun aktif tagleri cekiyor

        res.status(200).json(result2);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
