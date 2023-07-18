var _sat_active = false;
var _sat_withPass = false;
var _sat_workingLayer = null;
var _sat_firstPoint = null;
var _sat_zone;
var _sat_tooltip = L.tooltip({
    direction: 'right'
});
var _sat_mapType = 's';

var escapeHandler = function(e) {
    if (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) {
        e.preventDefault();
        toggleSelectArea();
    }
};

var clickHandler = function(e) {
    if (_sat_firstPoint == null) {
        // first point
        _sat_firstPoint = e.latlng;
        _sat_workingLayer = L.rectangle([_sat_firstPoint, _sat_firstPoint], {
            color: 'white',
            fillOpacity: 0,
            dashArray: '8, 8',
        }).addTo(map);
    } else {
        // second point
        var bounds = _sat_workingLayer.getBounds();
        var northWest = bounds.getNorthWest();
        var southEast = bounds.getSouthEast();
        var area = polygonArea([
            proj4('WGS84', currentProjection).forward([northWest.lng, northWest.lat]),
            proj4('WGS84', currentProjection).forward([northWest.lng, southEast.lat]),
            proj4('WGS84', currentProjection).forward([southEast.lng, southEast.lat]),
            proj4('WGS84', currentProjection).forward([southEast.lng, northWest.lat]),
        ]);
        var widthAndHeight = getWidthAndHeight(18, currentProjection, northWest, southEast);
        if (widthAndHeight[0] <= 13000 && widthAndHeight[1] <= 13000) {
            var _sat_zoom = 18;
            if (widthAndHeight[0] <= 6500 && widthAndHeight[1] <= 6500) {
                _sat_zoom = 19;
            }
            if (!_sat_withPass) {
                showDialog(
                    '<div class="alert alert-primary" role="alert">Voulez-vous télécharger cette image de ' +
                    (Math.ceil(area * 100) / 100).toLocaleString('en').split(',').join(' ') +
                    " m²?<br><b>Coût de l'opération : " +
                    (area < remainingArea ? 0 : (Math.ceil(((area - remainingArea) * 100) / 250000) / 100).toLocaleString('en').split(',').join(' ') + ' DH</b></div>'),
                    function() {
                        $('#loadingModal').modal('show');

                        var ajaxRequest = $.ajax({
                            contentType: 'application/json',
                            url: '/sim',
                            type: 'post',
                            data: JSON.stringify({
                                keys: keys,
                                northWest: northWest,
                                southEast: southEast,
                                projection: currentProjection,
                                zoom: _sat_zoom,
                                mapType: _sat_mapType,
                            }),
                            timeout: 3000,
                        });
                        ajaxRequest.done(function(response) {
                            if (response.message == 'success') {
                                _sat_workingLayer.removeFrom(map);
                                toggleSelectArea();
                                window.open('./sim?id=' + response.id, '_blank');
                            } else if (response.message == 'insuf-credit') {
                                showMessage('<div class="alert alert-danger" role="alert">Votre solde est insuffisant.</div>');
                            } else if (response.message == 'session-expired') {
                                showMessage('<div class="alert alert-danger" role="alert">La session PRO est expirée.</div>');
                            }
                        });
                        ajaxRequest.fail(function() {
                            alert("Une erreur s'est produite.");
                        });
                        ajaxRequest.always(function() {
                            closeLoadingModal();
                        });
                    },
                    function() {}
                );
            } else {
                $('#loadingModal').modal('show');

                var ajaxRequestWithPass = $.ajax({
                    contentType: 'application/json',
                    url: '/simWithPass',
                    type: 'post',
                    data: JSON.stringify({
                        key1: keys.key1,
                        northWest: northWest,
                        southEast: southEast,
                        projection: currentProjection,
                        zoom: _sat_zoom,
                        mapType: _sat_mapType,
                    }),
                    timeout: 3000,
                });
                ajaxRequestWithPass.done(function(response) {
                    if (response.message == 'success') {
                        _sat_workingLayer.removeFrom(map);
                        toggleSelectArea();
                        window.open('./sim?id=' + response.id, '_blank');
                    } else if (response.message == 'pass-expired') {
                        showMessage('<div class="alert alert-danger" role="alert">Le pass est expiré.</div>');
                        toggleSelectArea();
                    }
                });
                ajaxRequestWithPass.fail(function() {
                    alert("Une erreur s'est produite.");
                });
                ajaxRequestWithPass.always(function() {
                    closeLoadingModal();
                });
            }
        }
    }
};

var mouseMoveHandler = function(e) {
    var tooltipMessage = '';
    if (_sat_firstPoint == null) {
        tooltipMessage = '<span style="font-weight: bold;">Choisissez le premier coin de l\'image.</span>';
    } else {
        var bounds = _sat_workingLayer.getBounds();
        var northWest = bounds.getNorthWest();
        var southEast = bounds.getSouthEast();
        var widthAndHeight = getWidthAndHeight(18, currentProjection, northWest, southEast);

        //console.log(widthAndHeight);

        _sat_workingLayer.setBounds([_sat_firstPoint, e.latlng]);
        var area = polygonArea([
            proj4('WGS84', currentProjection).forward([northWest.lng, northWest.lat]),
            proj4('WGS84', currentProjection).forward([northWest.lng, southEast.lat]),
            proj4('WGS84', currentProjection).forward([southEast.lng, southEast.lat]),
            proj4('WGS84', currentProjection).forward([southEast.lng, northWest.lat]),
        ]);

        var selectionColor;

        if (widthAndHeight[0] > 13000 || widthAndHeight[1] > 13000) {
            selectionColor = 'red';
            tooltipMessage = '<span style="font-weight: bold;">Image trop grande</span>';
        } else if (area < remainingArea || _sat_withPass) {
            selectionColor = 'white';
            tooltipMessage = '<span style="font-weight: bold;">Surface : ' + (Math.ceil(area * 100) / 100).toLocaleString('en').split(',').join(' ') + ' m²</span>';
        } else {
            selectionColor = '#edff00';
            var additionalCost = (Math.ceil(((area - remainingArea) * 100) / 250000) / 100).toLocaleString('en').split(',').join(' ');
            tooltipMessage = '<span style="font-weight: bold;">Surface : ' + (Math.ceil(area * 100) / 100).toLocaleString('en').split(',').join(' ') + ' m² - Côut additionnel : ' + additionalCost + ' DH</span>';
        }

        _sat_workingLayer.setStyle({
            color: selectionColor,
        });
    }

    _sat_tooltip.setLatLng(e.latlng).setContent(tooltipMessage).addTo(map);
};

function toggleSelectArea() {
    if (!_sat_active) {
        if (!keys.key1) return;

        $('.modal').modal('hide');

        switch (currentProjection) {
            case 'N':
                zone = 'Zone 1 - Maroc.';
                break;
            case 'S':
                zone = 'Zone 2 - Maroc.';
                break;
            case 'SN':
                zone = 'Zone 3 - Maroc.';
                break;
            case 'SS':
                zone = 'Zone 4 - Maroc.';
                break;
            default:
                break;
        }

        cancelDraw();
        _sat_zone = currentProjection;
        $('#sat-image-btn-container a').css('color', 'white').css('background-color', 'orange');
        $('#map').css('cursor', 'crosshair');

        map.on('click', clickHandler);
        map.on('mousemove', mouseMoveHandler);
        window.addEventListener('keyup', escapeHandler);
        _sat_active = true;
    } else {
        $('.modal').modal('hide');

        $('#sat-image-btn-container a').removeAttr('style');
        $('#map').removeAttr('style');
        _sat_tooltip.setContent('').removeFrom(map);

        map.off('click', clickHandler);
        map.off('mousemove', mouseMoveHandler);
        window.removeEventListener('keyup', escapeHandler);

        _sat_active = false;
        if (_sat_workingLayer) {
            _sat_workingLayer.removeFrom(map);
        }
        _sat_workingLayer = null;
        _sat_firstPoint = null;
    }
}

function polygonArea(vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
        var addX = vertices[i][0];
        var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
        var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
        var subY = vertices[i][1];

        total += addX * addY * 0.5;
        total -= subX * subY * 0.5;
    }

    return Math.abs(total);
}

function getWidthAndHeight(zoom, projection, northWest, southEast) {
    function project(latLng) {
        var siny = Math.sin((latLng.lat * Math.PI) / 180);
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

        var res = [256 * (0.5 + latLng.lng / 360), 256 * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))];
        return res;
    }

    function getTileCoordinate(latLng, zoom) {
        var scale = 1 << zoom;
        var worldCoordinate = project(latLng);
        var tileCoordinate = [Math.floor((worldCoordinate[0] * scale) / 256), Math.floor((worldCoordinate[1] * scale) / 256)];
        return tileCoordinate;
    }

    function tile2long(x, z) {
        return (x / Math.pow(2, z)) * 360 - 180;
    }

    function tile2lat(y, z) {
        var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
        return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    }

    function getTileBounds(x, y, z) {
        var northWest = {},
            southEast = {};
        northWest.lat = tile2lat(y, z);
        northWest.lng = tile2long(x, z);
        southEast.lat = tile2lat(y + 1, z);
        southEast.lng = tile2long(x + 1, z);
        return {
            northWest: northWest,
            southEast: southEast
        };
    }

    function latLngDist(lat1, lon1, lat2, lon2) {
        var R = 6371000; // Radius of the earth in meters
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in meters
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    var northWestXY = getTileCoordinate(northWest, zoom);
    var southEastXY = getTileCoordinate(southEast, zoom);

    var northWest = getTileBounds(northWestXY[0], northWestXY[1], zoom).northWest;
    var southEast = getTileBounds(southEastXY[0], southEastXY[1], zoom).southEast;

    var resolution = ((southEastXY[1] - northWestXY[1] + 1) * 256) / latLngDist(northWest.lat, northWest.lng, southEast.lat, northWest.lng); // pixels per meter

    var projNorthWest = proj4('WGS84', projection).forward([northWest.lng, northWest.lat]);
    var projNorthEast = proj4('WGS84', projection).forward([southEast.lng, northWest.lat]);
    var projSouthEast = proj4('WGS84', projection).forward([southEast.lng, southEast.lat]);
    var projSouthWest = proj4('WGS84', projection).forward([northWest.lng, southEast.lat]);

    var minProjX = projNorthWest[0] < projSouthWest[0] ? projNorthWest[0] : projSouthWest[0];
    var minProjY = projSouthEast[1] < projSouthWest[1] ? projSouthEast[1] : projSouthWest[1];
    var maxProjX = projNorthEast[0] > projSouthEast[0] ? projNorthEast[0] : projSouthEast[0];
    var maxProjY = projNorthEast[1] > projNorthWest[1] ? projNorthEast[1] : projNorthWest[1];

    insertionPoint = [minProjX, minProjY];
    scale = maxProjX - minProjX;

    var oImageWidth = Math.round((maxProjX - minProjX) * resolution);
    var oImageHeight = Math.round((maxProjY - minProjY) * resolution);

    return [oImageWidth, oImageHeight];
}