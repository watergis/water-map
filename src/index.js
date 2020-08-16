import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import config from './config';

$(function(){
    mapboxgl.accessToken = config.accessToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: config.styles[0].uri,
        center: config.center,
        zoom: config.zoom,
        hash:true,
        attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    map.addControl(new mapboxgl.AttributionControl({compact: false,customAttribution: config.attribution}), 'bottom-right');

    map.on('load', function() {
        const getFeature = (lnglat, location, company, url) =>{
            return {
                // feature for Mapbox SF
                'type': 'Feature',
                'geometry': {'type': 'Point','coordinates': lnglat},
                'properties': {
                    'html': `
                    <table class="popup-table">
                    <tr><th>Location</th><td>${location}</td></tr>
                    <tr><th>Operator</th><td>${company}</td></tr>
                    <tr><th>Map</th><td>Open <a href="${url}" target="_blank">map</a></td></tr>
                    </table>`
                }
            }
        }
        const features = []
        config.wsps.forEach(wsp=>{
            if (wsp.geojson){
                $.ajaxSetup({ async: false });
                $.getJSON(wsp.geojson , data =>{
                    data.features.forEach(f=>{
                        features.push(getFeature(f.geometry.coordinates, f.properties.wss_name, f.properties.po_name, `${wsp.url}/${f.geometry.coordinates[1]}/${f.geometry.coordinates[0]}`))
                    })
                });
                $.ajaxSetup({ async: true });
            }else{
                features.push(getFeature(wsp.lnglat, wsp.location, wsp.company, wsp.url))
            }
        })
        map.addSource('wsps', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features':　features
            },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'wsps',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    100,
                    '#f1f075',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'wsps',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'wsps',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });
        
    })

    map.on('click', 'unclustered-point', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var html = e.features[0].properties.html;
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);
    })

    map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
    });
})