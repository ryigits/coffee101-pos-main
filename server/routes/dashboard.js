const router = require("express").Router();
const axios = require('axios').default;
const moment = require('moment');

// API anahtarları
const apiKeyMaxNerons = process.env.API_KEY_MAX_NERONS || require("../secrets.json").API_KEY_MAX_NERONS;
const apiKeyMaxEywin = process.env.API_KEY_MAX_EYWIN || require("../secrets.json").API_KEY_MAX_EYWIN;

// Reklam birimleri
const adUnits = [
    {
        adUnitType: 'and_int',
        adUnitKey: '152d3aa13cf4afbf',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'and_rw',
        adUnitKey: '9bdf686de94042a3',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'ios_int',
        adUnitKey: '0c25880c3e93f50a',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'ios_rw',
        adUnitKey: '5e8c403407771dbd',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'low_tier_int',
        adUnitKey: '71c0e8b7e4034ff8',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'low_tier_rw',
        adUnitKey: '6ab7b0409a944e05',
        customer: 'nerons',
        adNetworks: [
            { networkId: '/22751551271,22776608796', name: 'POTENSUS' },
            { networkId: '/90851098,22776608796', name: 'REKLAMUP' },
            { networkId: '/21728129623,22776608796', name: 'ADSYIELD' },
            { networkId: '/60257202,22776608796', name: 'A4G' },
            { networkId: '/57201580,22776608796', name: 'GRAVITE' },
            { networkId: '/75894840,22776608796', name: 'PREMIUMADS' }
        ]
    },
    {
        adUnitType: 'and_mrect',
        adUnitKey: 'e983fd2f6b6c9683',
        customer: 'eywin',
        adNetworks: [
            { networkId: '/22751551271,22598630004', name: 'POTENSUS' },
            { networkId: '/90851098,22598630004', name: 'REKLAMUP' },
            { networkId: '/21728129623,22598630004', name: 'ADSYIELD' },
            { networkId: '/60257202,22598630004', name: 'A4G' },
            { networkId: '/57201580,22598630004', name: 'GRAVITE' },
            { networkId: '/75894840,22598630004', name: 'PREMIUMADS' },
            { networkId: '/324749355,22598630004', name: 'MAKROO' }
        ]
    },{
        adUnitType: 'and_int',
        adUnitKey: '7a921e4f304e0119',
        customer: 'eywin',
        adNetworks: [
            { networkId: '/22751551271,22598630004', name: 'POTENSUS' },
            { networkId: '/90851098,22598630004', name: 'REKLAMUP' },
            { networkId: '/21728129623,22598630004', name: 'ADSYIELD' },
            { networkId: '/60257202,22598630004', name: 'A4G' },
            { networkId: '/57201580,22598630004', name: 'GRAVITE' },
            { networkId: '/75894840,22598630004', name: 'PREMIUMADS' },
            { networkId: '/324749355,22598630004', name: 'MAKROO' }
        ]
    }
    // Diğer ad birimlerini ekleyin
];

router.get("/:adunittype/:day", async (req, res) => {
    try {
        const day = req.params.day;
        let daybefore = moment(day).add(-1, 'days').format('YYYY-MM-DD');
        let adUnitType = req.params.adunittype;
        // Müşteri belirleme
        let customer;
        if (req.session && req.session.id) {
            if (req.session.id === 'nerons') {
                customer = 'nerons';
            } else if (req.session.id === 'eywin') {
                customer = 'eywin';
            }
        }
        
        // İlgili reklam birimini bulma
        const adUnit = adUnits.find(unit => unit.adUnitType === adUnitType && unit.customer === customer);

        if (!adUnit) {
            return res.status(404).json({ error: 'Ad unit not found' });
        }

        const { adUnitKey, adNetworks } = adUnit;

        // API anahtarını seçme
        const apiKey = customer === 'nerons' ? apiKeyMaxNerons : apiKeyMaxEywin;

        let url = `https://r.applovin.com/maxReport?api_key=${apiKey}&columns=day,estimated_revenue,max_ad_unit_id,network,network_placement&format=json&start=${daybefore}&end=${day}&filter_network=GOOGLE_AD_MANAGER_NETWORK`;

        let result = await axios.get(url);
        
        let resultData = result.data.results.filter((e) => e.max_ad_unit_id === adUnitKey);
        
        const sortedData = resultData.map(item => {
            const adNetwork = adNetworks.find(network => item.network_placement.includes(network.networkId));
            if (adNetwork) {
                item.adNetwork = adNetwork.name;
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
