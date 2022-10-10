
let myLatLng;
let latit;
let longit
const mainElem = document.querySelector('main');
const walkButton = document.getElementById("walkButton");
const cycleButton = document.getElementById("cycleButton");
const driveButton = document.getElementById("driveButton");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
    alert("Geolocation is not supported by this browser.");
}
//if get current position doesn't work user get error alert
function geoError() {
    alert("Geocoder failed.");
}
//when get current position works
function geoSuccess(position) {
    //gets user's position latitude and longitude
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //user's position
    myLatLng = {
        lat: latitude,
        lng: longitude
    };

    let mapProp = {
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
            });
        });







        $(function () {
            // add input listeners
            google.maps.event.addDomListener(window, "load", function () {
                var origin = new google.maps.places.Autocomplete(
                    origin = myLatLng
                )
                var destination = new google.maps.places.Autocomplete(
                    destination = {
                        lat: latit,
                        lng: longit
                    }
                );



                // calculate distance
                walkButton.addEventListener('click', function () {
                    origin = myLatLng;
                    destination = {
                        lat: latit,
                        lng: longit
                    };
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: google.maps.TravelMode.WALKING,
                            unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback
                    );
                })

                // calculate distance
                cycleButton.addEventListener('click', function () {
                    origin = myLatLng;
                    destination = {
                        lat: latit,
                        lng: longit
                    };
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: google.maps.TravelMode.BICYCLING,
                            unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback
                    );
                })

                // calculate distance
                driveButton.addEventListener('click', function () {
                    origin = myLatLng;
                    destination = {
                        lat: latit,
                        lng: longit
                    };
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: google.maps.TravelMode.DRIVING,
                            unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                            avoidHighways: false,
                            avoidTolls: false,
                        },
                        callback
                    );
                })

                // get distance results
                function callback(response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        $("#result").html(err);
                    } else {
                        var origin = response.originAddresses[0];
                        console.log(origin);
                        var destination = response.destinationAddresses[0];
                        console.log(destination);
                        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                            $("#result").html(
                                "Better get on a plane. There are no roads between " +
                                origin +
                                " and " +
                                destination
                            );
                        } else {
                            var distance = response.rows[0].elements[0].distance;
                            console.log(distance);
                            var duration = response.rows[0].elements[0].duration;
                            console.log(duration);
                            console.log(response.rows[0].elements[0].distance);
                            var distance_in_kilo = distance.value / 1000; // the kilom
                            console.log(distance_in_kilo);
                            var duration_text = duration.text;
                            $("#kilo").html(`Matka ${distance_in_kilo.toFixed(2)} km`);
                            $("#text").html(`Aika ${duration_text}`);
                        }
                    }
                }

                // print results on submit the form
                $("#distance_form").submit(function (e) {
                    e.preventDefault();
                    calculateDistance();
                })
            })
                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);

            })
        }
}
