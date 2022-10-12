/*
*
* Tekijä: Silja
* 10.10.2022
* */
let myLatLng;
let latit;
let longit;
let map;
let bounds;
const walkButton = document.getElementById("walkButton");
const cycleButton = document.getElementById("cycleButton");
const driveButton = document.getElementById("driveButton");

//get users current position
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError); //starts one of the functions depending if it gets users current location or not
} else {
    alert("Geolocation is not supported by this browser."); //if the browser doesn't support geolocation
}
//if get current position doesn't work user get error alert
function geoError() {
    alert("Geocoder failed.");
}
//when get current position works
function geoSuccess(position) {
    //get user's position latitude and longitude
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //user's location
    myLatLng = {
        lat: latitude,
        lng: longitude
    };

    //set how the map is shown
    let mapProp = {
        zoom: 11,
        mapTypeId: 'roadmap',
    };
    //shows the map with given settings
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    //call renderer to display directions
    directionsDisplay.setMap(map);

    bounds = new google.maps.LatLngBounds();
    //sets the markers to the map
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

    //info window content for the markers
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

    //loop through our array of markers & place each one on the map
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

        //when the button is pressed map shows route from users location to destination by driving
        driveButton.addEventListener('click', function () {
            directionsService.route({
                origin: myLatLng,   // the start point for the route from users location
                destination: {  //destination coords of the route which is chosen by user from the markers
                    lat: latit,
                    lng: longit
                },
                travelMode: 'DRIVING'
                //shows the response for route
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);  //shows the route if there is possible one
                }
            });
        });

        //when the button is pressed map shows route from users location to destination by walking
        walkButton.addEventListener('click', function () {
            directionsService.route({
                origin: myLatLng,
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

        //when the button is pressed map shows route from users location to destination by bicycling
        cycleButton.addEventListener('click', function () {
            directionsService.route({
                origin: myLatLng,
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'BICYCLING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                }
            });
        });

                // calculate walking distance when user chooses walking
                walkButton.addEventListener('click', function () {
                    let origin = myLatLng;  // the start point for the route from users location
                    let destination = {     //destination coords of the route which is chosen by user from the markers
                        lat: latit,
                        lng: longit
                    };
                    let service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'WALKING', //by walking
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback //start callback function
                    );
                })

                // calculate distance when user chooses bicycling
                cycleButton.addEventListener('click', function () {
                    let origin = myLatLng;
                    let destination = {
                        lat: latit,
                        lng: longit
                    };
                    let service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'BICYCLING',
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback
                    );
                })

                // calculate distance when user chooses driving
                driveButton.addEventListener('click', function () {
                    let origin = myLatLng;
                    let destination = {
                        lat: latit,
                        lng: longit
                    };
                    let service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'DRIVING',
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback
                    );
                })

                // get distance results
                function callback(response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        $("#result").html(err); //gives error if calculating distance doesn't work
                    } else {
                        let origin = response.originAddresses[0];
                        console.log(origin);
                        let destination = response.destinationAddresses[0];
                        console.log(destination);
                        if (response.rows[0].elements[0].status === "ZERO_RESULTS") { //if there isn't possible routes between the points with given transit
                            $("#result").html(
                                "Ei mahdollista reittiä näillä vaihtoehdoilla."
                            );
                        } else {
                            let distance = response.rows[0].elements[0].distance;   //distance of the points
                            console.log(distance);
                            let duration = response.rows[0].elements[0].duration;   //duration between the points
                            console.log(duration);
                            console.log(response.rows[0].elements[0].distance);
                            let distance_in_kilo = distance.value / 1000; //distance in km
                            console.log(distance_in_kilo);
                            let duration_text = duration.text;  //duration in hours and mins
                            $("#kilo").html(`Matka ${distance_in_kilo.toFixed(2)} km`);
                            $("#text").html(`Aika ${duration_text}`);
                        }
                    }
                }

                //print results
                $("#distance_form").submit(function (e) {
                    e.preventDefault();
                    calculateDistance();
                })
            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
    }
}