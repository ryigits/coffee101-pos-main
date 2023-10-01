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

router.get("/adunits/:adunittype/:network", async (req, res) => {
    try {
        const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');
        let adUnitType = req.params.adunittype;
        let network = req.params.network;
        let matchTag='';
        let adUnitKey = '';
        switch(adUnitType){
                        case 'and_int':
                            adUnitKey = '7a921e4f304e0119';
                            break;
                        case 'and_mrect':
                            adUnitKey = 'e983fd2f6b6c9683';
                            break;
        }
        switch(network){
                        case 'reklamup':
                            matchTag=REKLAMUP;
                            break;
                        case 'potensus':
                            matchTag=POTENSUS;
                            break;
                        case 'makroo':
                            matchTag=MAKROO;
                            break;
                        case 'a4g':
                            matchTag=A4G;
                            break;
                        case 'premiumads':
                            matchTag=PREMIUMADS;
                            break;
                        case 'gravite':
                            matchTag=GRAVITE;
        }
        let url=
`https://r.applovin.com/maxReport?api_key=${API_KEY_MAX_EYWIN}&columns=day,estimated_revenue,max_ad_unit_id,network,network_placement&format=json&start=${yesterday}&end=${yesterday}&filter_network=GOOGLE_AD_MANAGER_NETWORK`;
        let result = await axios.get(url);
        
        let result2 = result.data.results.filter((e)=>e.network_placement.includes(matchTag)&&e.max_ad_unit_id===adUnitKey);
        
        res.status(200).json(result2);

    } catch (err) {
        console.log(err);
    }
});

router.get("/adunits/:adunittype/:network/daybefore", async (req, res) => {
    try {
        const dayBefore = moment().add(-2, 'days').format('YYYY-MM-DD');
        let adUnitType = req.params.adunittype;
        let network = req.params.network;
        let matchTag='';
        let adUnitKey = '';
        switch(adUnitType){
                        case 'and_int':
                            adUnitKey = '7a921e4f304e0119';
                            break;
                        case 'and_mrect':
                            adUnitKey = 'e983fd2f6b6c9683';
                            break;
        }
        switch(network){
                        case 'reklamup':
                            matchTag=REKLAMUP;
                            break;
                        case 'potensus':
                            matchTag=POTENSUS;
                            break;
                        case 'makroo':
                            matchTag=MAKROO;
                            break;
                        case 'a4g':
                            matchTag=A4G;
                            break;
                        case 'premiumads':
                            matchTag=PREMIUMADS;
                            break;
                        case 'gravite':
                            matchTag=GRAVITE;
        }
        let url=
`https://r.applovin.com/maxReport?api_key=${API_KEY_MAX_EYWIN}&columns=day,estimated_revenue,max_ad_unit_id,network,network_placement&format=json&start=${dayBefore}&end=${dayBefore}&filter_network=GOOGLE_AD_MANAGER_NETWORK`;
        let result = await axios.get(url);
        
        let result2 = result.data.results.filter((e)=>e.network_placement.includes(matchTag)&&e.max_ad_unit_id===adUnitKey);
        
        res.status(200).json(result2);

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;