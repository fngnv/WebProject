let myLatLng;
let latit;
let longit
const mainElem = document.querySelector('main');
const walkButton = document.getElementById("walkButton");
const cycleButton = document.getElementById("cycleButton");
const driveButton = document.getElementById("driveButton")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
    alert("Geolocation is not supported by this browser.");
}

function geoError() {
    alert("Geocoder failed.");
}

function geoSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    myLatLng = {
        lat: latitude,
        lng: longitude
    };

    let mapProp = {
        center: new google.maps.LatLng(latitude, longitude), // puts your current location at the centre of the map
        zoom: 11,
        mapTypeId: 'roadmap',
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    //call renderer to display directions
    directionsDisplay.setMap(map);

    let bounds = new google.maps.LatLngBounds();

    let markers = [
        ['', 60.217821, 24.810242],
        ['', 60.163547, 24.910032],
        ['', 60.260206, 24.853760],
        ['', 60.198639, 24.930450],
        ['', 60.161709, 24.737455],
        ['', 60.290531, 24.965503],
        ['', 60.169910, 24.932461],
        ['', 60.187574, 24.979532],
        ['', 60.209790, 25.085690],
        ['', 60.476656, 25.103494],
        ['Sijaintisi', latitude, longitude]
    ];

    // Info Window Content
    let infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>K-Citymarket Espoo Sello</h3>' +
        '<p>Leppävaarankatu 3, 02600 Espoo</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Helsinki Ruoholahti</h3>' +
        '<p>Itämerenkatu 21, 00180 Helsinki</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Vantaa Myyrmäki</h3>' +
        '<p>Iskoskuja 3, 01600 Vantaa</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Supermarket Tripla</h3>' +
        '<p>Firdonkatu 2B 1016, 00520 Helsinki</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Espoo Iso Omena</h3>' +
        '<p>Piispansilta 11, 02230 Espoo</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Vantaa Jumbo</h3>' +
        '<p>Vantaanportinkatu 3, 01510 Vantaa</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Supermarket Kamppi</h3>' +
        '<p>Urho Kekkosen katu 1, 00100 Helsinki</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K‑Supermarket Redi</h3>' +
        '<p>Hermannin rantatie 5, 00580 Helsinki</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Helsinki Easton</h3>' +
        '<p>Gotlanninkatu 13, 00930 Helsinki</p>' +
        '</div>'
        ],
        ['<div class="info_content">' +
        '<h3>K-Citymarket Järvenpää</h3>' +
        '<p>Helsingintie 41, 04410 Järvenpää</p>' +
        '</div>'
        ]
    ];

    // Display multiple markers on a map
    let infoWindow = new google.maps.InfoWindow(),
        marker, i;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        let position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);

                latit = marker.getPosition().lat();
                longit = marker.getPosition().lng();
            }
        })(marker, i));

        driveButton.addEventListener('click', function () {
            directionsService.route({
                origin: myLatLng,

                // destination: marker.getPosition(),
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                }
            });
        });

        walkButton.addEventListener('click', function () {
            directionsService.route({
                origin: myLatLng,

                // destination: marker.getPosition(),
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'WALKING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                }
            });
        });

        cycleButton.addEventListener('click', function () {
            calculateDistance();
            directionsService.route({
                origin: myLatLng,

                // destination: marker.getPosition(),
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'BICYCLING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                }
            })

            function calculateDistance() {
                let service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        unitSystem: google.maps.UnitSystem.metric,
                        avoidHighways: false,
                        avoidTolls: false
                    }, callback);
            }
            //get distance results
            function callback(response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    $('#result').html(err);
                }
                else {
                    origin = response.originAddress[0];
                    destination = response.destinationAddress[0];
                    if (response.rows[0].elements[0].status === "ZERO RESULTS") {
                        $('#result').html("Ei mahdollista reittiä näillä kulkuvälineillä");
                    }
                    else {
                        let distance = response.rows[0].elements[0].distance;
                        let duration = response.rows[0].elements[0].duration;
                        let distance_in_kilo = distance.value / 1000;
                        let duration_text = duration.text;
                        $('#in_kilo').text(distance_in_kilo.toFixed(2));
                        $('#duration_text').text(duration_text);
                        let html = `
                        <p></p>
                        <p></p>
                        `;
                        mainElem.innerHTML += html;
                    }
                }
            }
        });
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}