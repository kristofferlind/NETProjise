//Map
(function(TrafficInfo) {
'use strict';

    TrafficInfo.Map = {
        _map: null,
        _markers: [],
        init: function () {
	        var mapOptions = {
	            center: { lat: 61.4484346, lng: 16.072931 },
	            zoom: 6
	        };
            TrafficInfo.Map._map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			TrafficInfo.Main();
        },
        setAllMap: function (map) {
            TrafficInfo.Map._markers.forEach(function (marker) {
                marker.setMap(map);
            })
        },
        clearMarkers: function() {
            TrafficInfo.Map.setAllMap(null);
        },
        deleteMarkers: function() {
            TrafficInfo.Map.clearMarkers();
            TrafficInfo.Map._markers = [];
        },
        showMarkers: function () {
            TrafficInfo.Map.setAllMap(TrafficInfo.Map._map);
        },
        animateMarker: function(markerId) {
            var marker = TrafficInfo.Map._markers[markerId];

            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1400)

        },
	    loadData: function (filterOptions) {
	        TrafficInfo.TrafficData.all(function (err, data) {
	            var map = TrafficInfo.Map._map;
		        if (err) {
		            throw err;
		        }
		        data = JSON.parse(data);
		        if (filterOptions) {
		            data = data.filter(function (item) {
		                return item.Category == filterOptions.showOnly;
		            })
		        }
		        TrafficInfo.Map.deleteMarkers();
		        TrafficInfo.Logger.clearLog();
		        var infoWindow = null;
		        data.forEach(function (info) {
		            //http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/7686977#7686977
		            var pinColor;
		            switch (info.Priority) {
		                case 1:
		                    pinColor = "FF0000";
		                    break;
		                case 2:
		                    pinColor = "FF4444";
		                    break;
		                case 3:
		                    pinColor = "FF8888";
		                    break;
                        case 4:
                            pinColor = "FFFF00";
                            break
		                case 5:
		                    pinColor = "00FF00";
		                    break;
                        default:
                            pinColor = "FE7569";
                            break;
		            }
		            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                        new google.maps.Size(21, 34),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(10, 34));

		            var content = '<div><div class="markerWindow"><h4>' + info.Title + ' <small>' + info.CreatedDate + '</small></h4><b>' + info.SubCategory + '</b> - '+ info.Description + '</div></div>';
		            var position = new google.maps.LatLng(info.Latitude, info.Longitude);
		            var marker = new google.maps.Marker({
		                position: position,
		                icon: pinImage,
                        title: info.Title
		            })
		            google.maps.event.addListener(marker, 'click', function () {
		                if (infoWindow) {
		                    infoWindow.close();
		                }
		                infoWindow = new google.maps.InfoWindow({
		                    content: content,
		                    maxWidth: 600
		                });
		                infoWindow.open(map, marker);
		            });
		            var markerId = TrafficInfo.Map._markers.push(marker);
		            TrafficInfo.Logger.renderLogItem(info, markerId);
		        })
		        TrafficInfo.Map.showMarkers();
		    });
	    }
	}
}(window.TrafficInfo = window.TrafficInfo || {}));



//TrafficData
(function(TrafficInfo) {
'use strict';

var _all = [],
	lastFetched;

	TrafficInfo.TrafficData = {
		all: function(callback) {
			if(_all.length === 0 || !lastFetched || (Date.now() - lastFetched > 1000*60*5)) {
				TrafficInfo.Fetch('http://localhost:48272/Api/TrafficInfo', function(err, data) {
					if (err) {
					    callback(err, null);
					}
					_all = data;
					lastFetched = Date.now();
					callback(null, _all)
				})
			} else {
			    callback(null, _all);
			}
		}
	}
}(window.TrafficInfo = window.TrafficInfo || {}));


//Fetch
(function(TrafficInfo) {
'use strict';

	TrafficInfo.Fetch = function (url, callback) {
	    var xhr = new XMLHttpRequest();
	    
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	            if ((xhr.status >= 200 && xhr.status) < 300 || xhr.status === 304) {
	                callback(null, xhr.response);
	            } else {
	                callback('Error: ' + xhr.status, null);
	            }
	        }
	    };
	    
	    xhr.open("get", url, true);
	    xhr.send();
	};
}(window.TrafficInfo = window.TrafficInfo || {}));

//Render
(function (TrafficInfo) {
    'use strict';

    var _log = document.querySelector("#sidebar-info");

    TrafficInfo.Logger = {
        clearLog: function () {
            _log.innerHTML = '';
        },
        renderLogItem: function(item, id) {
            //render log item
            var div = document.createElement("div");
            div.className = "log-item";
            div.innerHTML = '<h4>' + item.Title + ' <small>' + item.CreatedDate + '</small></h4><p>' + item.Description + '</p>';
            div.addEventListener('click', function () {
                TrafficInfo.Map.animateMarker(id);
            })
            _log.appendChild(div);
        }
    }

}(window.TrafficInfo = window.TrafficInfo || {}));

//Main
(function(TrafficInfo) {
    'use strict';

    TrafficInfo.Main = function () {
        TrafficInfo.Map.loadData();
    }

}(window.TrafficInfo = window.TrafficInfo || {}));

google.maps.event.addDomListener(window, 'load', window.TrafficInfo.Map.init);