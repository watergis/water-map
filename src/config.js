const version = 0.1;

module.exports = {
    accessToken : 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA',
    attribution : '<a href="https://github.com/watergis/awesome-vector-tiles" target="_blank">©Jin IGARASHI, Visit Github to host your vectortiles!</a>',
    styles : [
        { title: 'Street', uri: 'mapbox://styles/mapbox/streets-v11',}, 
    ],
    center: [34.888,-0.736],
    zoom: 5,
    popup: {
        target: ['wsps']
    },
    wsps: [
        {
            location : 'Narok',
            company: 'Narok Water and Sewerage Services Co., ltd.',
            url: 'https://narok.water-gis.com/#13.22/-1.08865/35.85804',
            lnglat: [35.85804,-1.08865]
        },
        {
            location : 'Ololulunga',
            company: 'Narok Water and Sewerage Services Co., ltd.',
            url: 'https://narok.water-gis.com/#12/-1.00641/35.65479',
            lnglat: [35.65479,-1.00641]
        },
        {
            location : 'Suswa',
            company: 'Narok Water and Sewerage Services Co., ltd.',
            url: 'https://narok.water-gis.com/#11.24/-1.05025/36.33058',
            lnglat: [36.33058,-1.05025]
        },
        {
            location : 'Kilgoris',
            company: 'Narok Water and Sewerage Services Co., ltd.',
            url: 'https://narok.water-gis.com/#14.54/-1.00304/34.87584',
            lnglat: [34.87584,-1.00304]
        },
        {
            location : 'Nakuru',
            company: 'Nakuru Water and Sanitation Services Co., ltd.',
            url: 'https://nakuru.water-gis.com/#11/-0.299/36.1015',
            lnglat: [36.07409,-0.28945]
        },
        {
            location : 'Nanyuki',
            company: 'Nanyuki Water and Sewerage Co., ltd.',
            url: 'https://nawasco.github.io/mapboxgljs/#13/-0.02449/37.11904',
            lnglat: [37.119039,-0.024493]
        },
        {
            location : 'Rwanda',
            company: 'Water and Sanitation Corporation, ltd.',
            url: 'https://rural.water-gis.com/#12',
            lnglat: [30.060006,-1.946608],
            geojson: 'https://wasac.github.io/vt/wss.geojson'
        }
    ]
}