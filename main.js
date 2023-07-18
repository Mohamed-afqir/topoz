
function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var systemZoom = width / window.screen.availWidth;
    var left = (width - w) / 2 / systemZoom + dualScreenLeft;
    var top = (height - h) / 2 / systemZoom + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
}

window.mobilecheck = function() {
    var check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function deleteLoginContainer() {
    $('#login-container').remove();
}

window.onload = function() {
    $('#initialProjModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#initial-proj-select').on('change', function() {
        $('#proj-select').val(this.value).trigger('change');
        $('#apply-initial-proj').prop('disabled', false);
    });
    $('#apply-initial-proj').click(function() {
        $('#login-container').show();

        $('#initialProjModal').modal('hide');
        switch ($('#proj-select option:selected').text().split(' ')[0]) {
            case 'Algérie':
                map.fitBounds([
                    [18.97, -8.67],
                    [38.8, 11.99],
                ]);
                break;
            case 'Tunisie':
                map.fitBounds([
                    [30.23, 7.49],
                    [38.41, 13.67],
                ]);
                break;
            case 'Qatar':
                map.fitBounds([
                    [24.55, 50.69],
                    [26.2, 51.68],
                ]);
                break;
            case 'France':
                map.fitBounds([
                    [41.31, -4.87],
                    [51.14, 9.63],
                ]);
                break;
        }
    });

    $('#initialProjModal').on('hidden.bs.modal', function() {
        setTimeout(() => {
            $('.loading').fadeOut(500);
            if (!mobilecheck()) $('#annModal').modal('show');
        }, 0);
    });

    if (getCookie('key1')) {
        login();
    } else {
        logout();
    }

    /*$('#messageModal').on('hidden.bs.modal', function () {
      $('#messageModal').off('hidden.bs.modal');
      showMessage(
        '<img width="300px" src="ife.png"/>' +
          "<p style='color:#007bff; font-size: 20px;'><b>Une solution terrain-bureau pour les enquêtes parcellaires et juridiques des marchés IFE</b></p>" +
          '<a type="button" style="color:white" class="btn btn-lg btn-primary" href="/ife" target="_blank"><i class="fa fa-info-circle"></i> <b>En savoir plus</b></a>'
      );
    });

    showMessage(
      '<p style="color:#007bff; font-size: 20px;"><b>Solutions informatiques topoX</b></p><p style="text-align:left; text-indent: 25px;">topoX lance ses services de développement des solutions informatiques pour les besoins SIG et non-SIG.</p><p style="color:#007bff; font-size: 18px; text-align:left; line-height: 26px; text-indent: 25px;"><b>Quelques exemples des solutions proposées :</b></p><p style="text-align:left; line-height: 26px;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#007bff;">●</span>&nbsp;&nbsp;Une application web, mobile ou desktop qui répond à un ou plusieurs besoins spécifiques (calcul, dessin, gestion d’informations, génération de documents, etc.)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#007bff;">●</span>&nbsp;&nbsp;Une fonctionnalité sur topoX Map qui traite un besoin spécifique (calcul, dessin, gestion d’informations, génération de documents, etc.)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#007bff;">●</span>&nbsp;&nbsp;Une version de topoX Map mobile qui fonctionne sans connexion Internet sur une région déterminée.</p><p style="font-size: 18px;"><b><span style="color:#007bff">Pour plus d’informations :</span></b><br><span style="color: rgb(212, 70, 56);"><b><i class="fa fa-envelope"></i> Email :</b> contact@topox.ma<br></span><span style="color: rgb(10, 160, 65);"><b><i class="fa fa-whatsapp"></i> WhatsApp :</b> 06 50 99 34 05</p></span>'
    );*/

    $('.login-btn').click(function() {
        login(true);
    });

    $('.logout-btn').click(function() {
        logout();
    });

    $('.account-btn').click(function() {
        $('#dashboardModal').modal('show');
    });

    $('#code-btn').click(function() {
        $('#codeModal').modal('show');
    });

    $('#codeModal').on('shown.bs.modal', function() {
        $('#code-textbox').focus();
    });

    $('#apply-code-btn').click(function() {
        sendCode($('#code-textbox').val().trim().toLowerCase());
    });

    $('#transfer-btn').click(function() {
        $('#transferModal').modal('show');
    });

    $('#sim-pass-btn').click(function() {
        showDialog(
            '<div class="alert alert-primary" role="alert">Voulez-vous activer un pass d\'images satellites illimitées de 30 jours?<br><b>Coût de l\'opération : 65 DH</b></div>',
            function() {
                // yes

                $('#loadingModal').modal('show');

                var ajaxRequest = $.ajax({
                    contentType: 'application/json',
                    url: '/startSimPass',
                    type: 'post',
                    data: JSON.stringify(keys),
                    timeout: 3000,
                });

                ajaxRequest.done(function(response) {
                    if (response.message == 'success') {
                        showMessage('<div class="alert alert-success" role="alert">Le pass d\'images satellites illimités de 30 jours à été activé.</div>');
                    } else if (response.message == 'insuf-credit') {
                        showMessage('<div class="alert alert-danger" role="alert">Votre solde est insuffisant.</div>');
                    }
                });

                ajaxRequest.fail(function() {
                    alert("Une erreur s'est produite.");
                });

                ajaxRequest.always(function() {
                    closeLoadingModal();
                });
            },
            function() {
                // no
            }
        );
    });

    $('#transferModal').on('shown.bs.modal', function() {
        $('#transfer-amount-textbox').focus();
    });

    $('#apply-transfer-btn').click(function() {
        makeTransfer($('#transfer-amount-textbox').val(), $('#transfer-email-textbox').val());
    });

    $('.pro, .pro-inverted').click(function() {
        if (!keys.key1) {
            showMessage('<div class="alert alert-warning" role="alert">Connectez-vous pour pouvoir commencer une session PRO et utiliser cette fonctionnalité.<br><a href="javascript:login(true)" class="embedded-login-btn btn btn-primary">Se connecter</a></div>');
        }
    });

 

    document.querySelector('.leaflet-pm-icon-delete').title = 'Supprimer';
    document.querySelector('.leaflet-pm-icon-drag').title = 'Déplacer';
    if (!mobilecheck())
        $('#sat-image-btn-container')
        .css('display', 'block')
        .click(function(e) {
            if (_sat_active) {
                toggleSelectArea(true);
            } else {
                $('#satModal').modal('show');
            }
        });
};

function cancelDraw() {
    document.querySelectorAll('button-container,.active .action-cancel').forEach(function(cancelBtn) {
        cancelBtn.click();
    });
}

function downloadFile(fileInfo) {
    var elem = window.document.createElement('a');
    elem.href = '/download?id=' + fileInfo.id;
    elem.download = fileInfo.name;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

function date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
}

function unzipBlob(blob, callback) {
    zip.workerScriptsPath = '/plugins/';
    zip.createReader(
        new zip.BlobReader(blob),
        function(zipReader) {
            zipReader.getEntries(function(entries) {
                entries[0].getData(new zip.BlobWriter('text/plain'), function(data) {
                    zipReader.close();
                    var reader = new FileReader();
                    reader.onload = function() {
                        callback(reader.result);
                    };
                    reader.readAsText(data);
                });
            });
        },
        console.error
    );
}

function onChooseFileKML(event) {
    if (typeof window.FileReader !== 'function') throw "The file API isn't supported on this browser.";
    let input = event.target;
    if (!input) throw 'The browser does not properly implement the event object';
    if (!input.files) throw 'This browser does not support the `files` property of the file input.';
    if (!input.files[0]) return undefined;
    let file = input.files[0];
    var extension = input.files[0].name.split('.').pop().toLowerCase();
    let fr = new FileReader();
    fr.onload = function(e) {
        if (extension == 'kmz') {
            unzipBlob(input.files[0], function(str) {
                drawGeoJSON(toGeoJSON.kml($.parseXML(str)), true);
            });
        } else {
            drawGeoJSON(toGeoJSON.kml($.parseXML(e.target.result)), true);
        }
    };
    if (extension == 'kmz') {
        fr.readAsDataURL(file);
    } else {
        fr.readAsText(file);
    }
    document.getElementById('getGeoJSON').value = '';
}

function onChooseFileGeoJSON(event) {
    if (typeof window.FileReader !== 'function') throw "The file API isn't supported on this browser.";
    let input = event.target;
    if (!input) throw 'The browser does not properly implement the event object';
    if (!input.files) throw 'This browser does not support the `files` property of the file input.';
    if (!input.files[0]) return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = function(e) {
        drawGeoJSON(JSON.parse(e.target.result));
    };
    fr.readAsText(file);
    document.getElementById('getGeoJSON').value = '';
}

function onChooseFileDXF(event) {
    if (typeof window.FileReader !== 'function') throw "The file API isn't supported on this browser.";
    let input = event.target;
    if (!input) throw 'The browser does not properly implement the event object';
    if (!input.files) throw 'This browser does not support the `files` property of the file input.';
    if (!input.files[0]) return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = function(e) {
        drawDXF(e.target.result);
    };
    fr.readAsText(file);
    document.getElementById('getDXF').value = '';
}

function onChooseFileSHP(event) {
    if (typeof window.FileReader !== 'function') throw "The file API isn't supported on this browser.";
    let input = event.target;
    if (!input) throw 'The browser does not properly implement the event object';
    if (!input.files) throw 'This browser does not support the `files` property of the file input.';
    if (!input.files[0]) return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = function(e) {
        drawSHP(e.target.result);
    };
    fr.readAsArrayBuffer(file);
    document.getElementById('getSHP').value = '';
}

function allToMerchichGeoJSON() {
    var json = {
        type: 'FeatureCollection',
        features: [],
    };

    Object.values(points).forEach(function(p) {
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: proj4('WGS84', currentProjection).forward([p._latlng.lng, p._latlng.lat]),
            },
        });
    });

    Object.values(polylines).forEach(function(plWGS) {
        var plMch = [];
        plWGS._latlngs.forEach(function(vertex) {
            plMch.push(proj4('WGS84', currentProjection).forward([vertex.lng, vertex.lat]));
        });
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [plMch],
            },
        });
    });

    Object.values(polygons).forEach(function(pgWGS) {
        var pgMch = [];
        pgWGS._latlngs[0].forEach(function(vertex) {
            pgMch.push(proj4('WGS84', currentProjection).forward([vertex.lng, vertex.lat]));
        });
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [pgMch],
            },
        });
    });
    return JSON.stringify(json);
}

function allToMerchichGeoJSON2() {
    var json = {
        type: 'FeatureCollection',
        features: [],
    };

    Object.values(points).forEach(function(p) {
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: proj4('WGS84', currentProjection).forward([p._latlng.lng, p._latlng.lat]),
            },
        });
    });

    Object.values(polylines).forEach(function(plWGS) {
        var plMch = [];
        plWGS._latlngs.forEach(function(vertex) {
            plMch.push(proj4('WGS84', currentProjection).forward([vertex.lng, vertex.lat]));
        });
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: plMch,
            },
        });
    });

    Object.values(polygons).forEach(function(pgWGS) {
        var pgMch = [];
        pgWGS._latlngs[0].forEach(function(vertex) {
            pgMch.push(proj4('WGS84', currentProjection).forward([vertex.lng, vertex.lat]));
        });
        json['features'].push({
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [pgMch],
            },
        });
    });
    return JSON.stringify(json);
}

function drawSHP(buffer) {
    try {
        var geoJSON = shp.parseZip(buffer);
        //console.log(geoJSON);
        drawGeoJSON(geoJSON);
    } catch (err) {
        //console.log(err);
        alert(err.message);
    }
}

function drawGeoJSON(geoJSON, alreadyInWGS = false) {
    try {
        var boundingBox = {
            minLat: null,
            minLng: null,
            maxLat: null,
            maxLng: null,
        };
        if (Array.isArray(geoJSON)) {
            geoJSON.forEach(function(layer) {
                drawFeatureCollection(layer, boundingBox, alreadyInWGS);
            });
        } else {
            drawFeatureCollection(geoJSON, boundingBox, alreadyInWGS);
        }
        map.fitBounds([
            [boundingBox.minLat, boundingBox.minLng],
            [boundingBox.maxLat, boundingBox.maxLng],
        ]);
        $('.modal').modal('hide');
    } catch (err) {
        //console.log(err);
        alert(err.message);
    }
}

function extendBoundingBox(boundingBox, latlng) {
    if ('lat' in latlng) latlng = [latlng.lat, latlng.lng];

    if (boundingBox.minLat == null) {
        boundingBox.minLat = latlng[0];
        boundingBox.minLng = latlng[1];
        boundingBox.maxLat = latlng[0];
        boundingBox.maxLng = latlng[1];
    } else {
        if (boundingBox.minLat > latlng[0]) boundingBox.minLat = latlng[0];
        else if (boundingBox.maxLat < latlng[0]) boundingBox.maxLat = latlng[0];
        if (boundingBox.minLng > latlng[1]) boundingBox.minLng = latlng[1];
        else if (boundingBox.maxLng < latlng[1]) boundingBox.maxLng = latlng[1];
    }
}

function WGSify(flipOnly, entity, nested = false, doublyNested = false) {
    if (nested) {
        var wgsArray = [];
        entity.forEach(function(subEntity) {
            wgsArray.push(WGSify(flipOnly, subEntity, doublyNested));
        });
        return wgsArray;
    } else {
        if (flipOnly) return [entity[1], entity[0]];
        return proj4('WGS84', currentProjection).inverse(entity).reverse();
    }
}

function drawFeature(feature, boundingBox, alreadyInWGS) {
    if (feature.geometry.type == 'Point') {
        var positionWGS = WGSify(alreadyInWGS, feature.geometry.coordinates);
        drawPoint(positionWGS, false, feature.properties);
        extendBoundingBox(boundingBox, positionWGS);
    } else if (feature.geometry.type == 'LineString') {
        var pl = drawPolyline(WGSify(alreadyInWGS, feature.geometry.coordinates, true), false, feature.properties);
        extendBoundingBox(boundingBox, pl.getBounds().getSouthWest());
        extendBoundingBox(boundingBox, pl.getBounds().getNorthEast());
    } else if (feature.geometry.type == 'Polygon') {
        var pg = drawPolygon(WGSify(alreadyInWGS, feature.geometry.coordinates, true, true), false, feature.properties);
        extendBoundingBox(boundingBox, pg.getBounds().getSouthWest());
        extendBoundingBox(boundingBox, pg.getBounds().getNorthEast());
    } else if (feature.geometry.type == 'MultiPoint') {
        feature.geometry.coordinates.forEach(function(point) {
            var positionWGS = WGSify(alreadyInWGS, point);
            drawPoint(positionWGS, false, feature.properties);
            extendBoundingBox(boundingBox, positionWGS);
        });
    } else if (feature.geometry.type == 'MultiLineString') {
        feature.geometry.coordinates.forEach(function(lineString) {
            var pl = drawPolyline(WGSify(alreadyInWGS, lineString, true), false, feature.properties);
            extendBoundingBox(boundingBox, pl.getBounds().getSouthWest());
            extendBoundingBox(boundingBox, pl.getBounds().getNorthEast());
        });
    } else if (feature.geometry.type == 'MultiPolygon') {
        feature.geometry.coordinates.forEach(function(polygon) {
            var pg = drawPolygon(WGSify(alreadyInWGS, polygon, true, true), false, feature.properties);
            extendBoundingBox(boundingBox, pg.getBounds().getSouthWest());
            extendBoundingBox(boundingBox, pg.getBounds().getNorthEast());
        });
    } else if (feature.geometry.type == 'GeometryCollection') {
        feature.geometries.forEach(function(geometry) {
            drawFeature({
                    type: 'Feature',
                    properties: feature.properties,
                    geometry: geometry,
                },
                boundingBox,
                alreadyInWGS
            );
        });
    } else if (feature.type == 'FeatureCollection') {
        drawFeatureCollection(feature, boundingBox, alreadyInWGS);
    }
}

function drawFeatureCollection(collection, boundingBox, alreadyInWGS) {
    //console.log(collection);
    collection.features.forEach(function(feature) {
        if (feature.type == 'FeatureCollection') {
            drawFeatureCollection(feature, boundingBox, alreadyInWGS);
        } else {
            drawFeature(feature, boundingBox, alreadyInWGS);
        }
    });
}

var layerGroups = {};

function drawDXF(dxfText) {
    //try {
    Object.values(layerGroups).forEach(function(lg) {
        layerControl.removeLayer(lg);
    });

    var groups = {};
    var entities = parseDXF(dxfText);

    var points = entities.points;
    var polylines = entities.polylines;
    var polygons = entities.polygons;

    var minX = null,
        minY = null,
        maxX = null,
        maxY = null;

    points.forEach(function(p) {
        var position = p.position;
        var positionWGS = proj4('WGS84', currentProjection).inverse([position.x, position.y]).reverse();
        if (!(p.layer in groups)) groups[p.layer] = {
            layers: []
        };
        groups[p.layer].layers.push(drawPoint(positionWGS));
        groups[p.layer].color = p.color;
        if (minX == null) {
            minX = positionWGS[0];
            minY = positionWGS[1];
            maxX = positionWGS[0];
            maxY = positionWGS[1];
        } else {
            if (minX > positionWGS[0]) minX = positionWGS[0];
            else if (maxX < positionWGS[0]) maxX = positionWGS[0];
            if (minY > positionWGS[1]) minY = positionWGS[1];
            else if (maxY < positionWGS[1]) maxY = positionWGS[1];
        }
    });

    polylines.forEach(function(polyline) {
        var vertices = polyline.vertices;
        var wgsPolyline = [];
        vertices.forEach(function(p) {
            var positionWGS = proj4('WGS84', currentProjection).inverse([p.x, p.y]).reverse();
            wgsPolyline.push(positionWGS);
            if (minX == null) {
                minX = positionWGS[0];
                minY = positionWGS[1];
                maxX = positionWGS[0];
                maxY = positionWGS[1];
            } else {
                if (minX > positionWGS[0]) minX = positionWGS[0];
                else if (maxX < positionWGS[0]) maxX = positionWGS[0];
                if (minY > positionWGS[1]) minY = positionWGS[1];
                else if (maxY < positionWGS[1]) maxY = positionWGS[1];
            }
        });
        if (!(polyline.layer in groups)) groups[polyline.layer] = {
            layers: []
        };
        groups[polyline.layer].layers.push(drawPolyline(wgsPolyline, polyline.color));
        groups[polyline.layer].color = polyline.color;
    });

    polygons.forEach(function(polygon) {
        var vertices = polygon.vertices;
        var wgsPolygon = [];
        vertices.forEach(function(p) {
            var positionWGS = proj4('WGS84', currentProjection).inverse([p.x, p.y]).reverse();
            wgsPolygon.push(positionWGS);
            if (minX == null) {
                minX = positionWGS[0];
                minY = positionWGS[1];
                maxX = positionWGS[0];
                maxY = positionWGS[1];
            } else {
                if (minX > positionWGS[0]) minX = positionWGS[0];
                else if (maxX < positionWGS[0]) maxX = positionWGS[0];
                if (minY > positionWGS[1]) minY = positionWGS[1];
                else if (maxY < positionWGS[1]) maxY = positionWGS[1];
            }
        });
        if (!(polygon.layer in groups)) groups[polygon.layer] = {
            layers: []
        };
        groups[polygon.layer].layers.push(drawPolygon(wgsPolygon, polygon.color));
        groups[polygon.layer].color = polygon.color;
    });
    if (minX != null) {
        map.fitBounds([
            [minX, minY],
            [maxX, maxY],
        ]);
    }
    $('.modal').modal('hide');

    Object.keys(groups).forEach(function(name) {
        if (name in layerGroups) {
            groups[name].layers.forEach(function(layer) {
                layerGroups[name].addLayer(layer);
            });
        } else {
            var lg = L.layerGroup(groups[name].layers);
            lg.color = groups[name].color;
            lg.visible = true;
            layerGroups[name] = lg;
        }
    });
    Object.keys(layerGroups).forEach((name) => {
        layerControl.addOverlay(layerGroups[name], '<span/><span><i class="fa fa-paint-brush" style="-webkit-text-stroke: 1px #ddd; color:' + layerGroups[name].color + ';"></i> ' + name);
    });

    $('.leaflet-control-layers-overlays  input[type="checkbox"]').each(function(index) {
        var checkbox = $(this)[0];
        if (checkbox.checked != Object.values(layerGroups)[index].visible) {
            checkbox.click();
        }
        $(checkbox).change(function(e) {
            Object.values(layerGroups)[index].visible = checkbox.checked;
        });
    });

    //console.log(layerGroups);
    /*} catch (error) {
      alert(error);
    }*/
}

var pointCounter = 0;
var polylineCounter = 0;
var polygonCounter = 0;

var points = {};
var polylines = {};
var polygons = {};

proj4.defs('N', '+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs');
proj4.defs('S', '+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.9996155960000001 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs');
proj4.defs('SN', '+proj=lcc +lat_1=26.1 +lat_0=26.1 +lon_0=-5.4 +k_0=0.999616304 +x_0=1200000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs');
proj4.defs('SS', '+proj=lcc +lat_1=22.5 +lat_0=22.5 +lon_0=-5.4 +k_0=0.999616437 +x_0=1500000 +y_0=400000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs');
proj4.defs('AN', '+proj=lcc +lat_1=36 +lat_0=36 +lon_0=2.7 +k_0=0.999625544 +x_0=500135 +y_0=300090 +ellps=clrk80 +towgs84=-209.362,-87.8162,404.62,0.0046,3.4784,0.5805,-1.4547 +units=m +no_defs');
proj4.defs('AS', '+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=2.7 +k_0=0.999625769 +x_0=500135 +y_0=300090 +ellps=clrk80 +towgs84=-209.362,-87.8162,404.62,0.0046,3.4784,0.5805,-1.4547 +units=m +no_defs');
proj4.defs('TN', '+proj=lcc +lat_1=36 +lat_0=36 +lon_0=9.9 +k_0=0.999625544 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +units=m +no_defs');
proj4.defs('TS', '+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=9.9 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +units=m +no_defs');
proj4.defs('Q', '+proj=tmerc +lat_0=24.45 +lon_0=51.21666666666667 +k=0.99999 +x_0=200000 +y_0=300000 +ellps=intl +towgs84=-119.425,-303.659,-11.0006,1.1643,0.174458,1.09626,3.65706 +units=m +no_defs');
proj4.defs('F1', '+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F2', '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F3', '+proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.999877499 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F4', '+proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.99994471 +x_0=234.358 +y_0=185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F1C', '+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F2C', '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F3C', '+proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.999877499 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('F4C', '+proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');
proj4.defs('FCC42', '+proj=lcc +lat_1=41.25 +lat_2=42.75 +lat_0=42 +lon_0=3 +x_0=1700000 +y_0=1200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC43', '+proj=lcc +lat_1=42.25 +lat_2=43.75 +lat_0=43 +lon_0=3 +x_0=1700000 +y_0=2200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC44', '+proj=lcc +lat_1=43.25 +lat_2=44.75 +lat_0=44 +lon_0=3 +x_0=1700000 +y_0=3200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC45', '+proj=lcc +lat_1=44.25 +lat_2=45.75 +lat_0=45 +lon_0=3 +x_0=1700000 +y_0=4200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC46', '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC47', '+proj=lcc +lat_1=46.25 +lat_2=47.75 +lat_0=47 +lon_0=3 +x_0=1700000 +y_0=6200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC48', '+proj=lcc +lat_1=47.25 +lat_2=48.75 +lat_0=48 +lon_0=3 +x_0=1700000 +y_0=7200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC49', '+proj=lcc +lat_1=48.25 +lat_2=49.75 +lat_0=49 +lon_0=3 +x_0=1700000 +y_0=8200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('FCC50', '+proj=lcc +lat_1=49.25 +lat_2=50.75 +lat_0=50 +lon_0=3 +x_0=1700000 +y_0=9200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

var currentProjection = 'N';

var initialPosition = proj4('WGS84', currentProjection).inverse([440000, 200000]).reverse();

var mqkeys = ['EQc6RkmLAylMPkGyOv1iQVrDM8wrwI1i', 'Usozqg2xyiotDevJqbb5atYK9boEY60i', '3vTuOUgBLK8iJVrhGk3ULh1fE1W5DKRQ', 'K5Avliz5OLgjl2FbX2Epf9iNKxKW1LRv', 'lkGr7u12jarAVGhNgKzwnUYEiuAxQqYq', 'D4s0cbWy3oUHvU6g9luGXleFyRTaRpjP'];
L.mapquest.key = mqkeys[Math.floor(Math.random() * mqkeys.length)];

var baseLayer = L.mapquest.tileLayer('map');
var map = L.map('map', {
    layers: baseLayer,
    center: initialPosition,
    zoom: 6,
});
map.removeLayer(baseLayer);


L.control.social().addTo(map);

$('#import-export-btn').on('click', function() {
    cancelDraw();
});

$('#goto-btn').on('click', function() {
    cancelDraw();
});

$('#sim-start-btn').click(function(e) {
    if (remainingTime) {
        _sat_withPass = false;
        toggleSelectArea();
    } else if (keys.key1) {
        startPro();
    }
});

$('#sim-start-with-pass-btn').click(function(e) {
    _sat_withPass = true;
    toggleSelectArea();
});

$('#sat-map-type').on('change', function() {
    _sat_mapType = this.value;
    //console.log(_sat_mapType);
});

$('#proj-select').on('change', function() {
    currentProjection = this.value;
    var zone = $('#proj-select option:selected').text();
    $('#nav-home-tab').html(zone);
    $('#satModal .selected-zone').html('Projection selectionnée : ' + zone);
});

$('#xCoord').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-btn-mch').click();
});
$('#yCoord').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-btn-mch').click();
});
$('#lat').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-btn-wgs').click();
});
$('#lng').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-btn-wgs').click();
});
$('#transfer-amount-textbox').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-transfer-btn').click();
});
$('#transfer-email-textbox').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-transfer-btn').click();
});
$('#code-textbox').keyup(function(event) {
    if (event.keyCode === 13) $('#apply-code-btn').click();
});

$('#gotoModal').on('shown.bs.modal', function() {
    $('#xCoord').focus();
});

$('#apply-btn-mch').on('click', function() {
    var strX = $('#xCoord').val(),
        strY = $('#yCoord').val();
    parsedX = parseFloat(strX.replace(',', '.').replace(' ', ''));
    parsedY = parseFloat(strY.replace(',', '.').replace(' ', ''));

    if (isNaN(parsedX)) {
        alert('Verifiez que X est un nombre valide.');
        return;
    }
    if (isNaN(parsedY)) {
        alert('Verifiez que Y est un nombre valide.');
        return;
    }

    var positionWGS = proj4('WGS84', currentProjection).inverse([parsedX, parsedY]).reverse();
    var point = drawPoint(positionWGS, true);

    map.setView(positionWGS, 17, {
        animate: true
    });
    $('.modal').modal('hide');
});

$('#apply-btn-wgs').on('click', function() {
    var strLat = $('#lat').val(),
        strLng = $('#lng').val();
    parsedLat = parseFloat(strLat.replace(',', '.').replace(' ', ''));
    parsedLng = parseFloat(strLng.replace(',', '.').replace(' ', ''));

    if (isNaN(parsedLat)) {
        alert('Verifiez que la latitude est un nombre valide.');
        return;
    }
    if (isNaN(parsedLng)) {
        alert('Verifiez que la longitude est un nombre valide.');
        return;
    }

    var positionWGS = [parsedLat, parsedLng];
    var point = drawPoint(positionWGS, true);

    map.setView(positionWGS, 17, {
        animate: true
    });
    $('.modal').modal('hide');
});

L.control.mousePosition({
    position: 'bottomright',
    separator: ' | '
}).addTo(map);

var googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 9,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

var labelLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxNativeZoom: 9,
    zoomAnimation: false,
}).addTo(map);

var googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxNativeZoom: 20,
    minZoom: 1,
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxNativeZoom: 20,
    minZoom: 1,
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

var layerControl = L.control
    .layers(null, null, {
        collapsed: true,
        position: 'bottomright',
    })
    .addTo(map);

layerControl.addBaseLayer(googleStreets, 'Google Streets');
layerControl.addBaseLayer(googleHybrid, 'Google Hybrid');


var morLayer = L.geoJSON(morocco);
map.fitBounds(morLayer.getBounds());
var locateControl = L.control
    .locate({
        position: 'topright',
        compassStyle: {
            stroke: true,
            weight: 1,
            color: '#fff'
        },
        maxZoom: 17,
        locateOptions: {
            enableHighAccuracy: true,
            maxZoom: 17
        },
        showPopup: false,
        icon: 'fa fa-street-view',
    })
    .addTo(map);

map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawCircleMarker: false,
    drawRectangle: false,
    dragMode: true,
    editMode: false,
    cutPolygon: false,
});

map.pm.setLang('fr');

map.on('pm:drawstart', function(e) {
    $('#map').css('cursor', 'crosshair');
});

map.on('pm:drawend', function(e) {
    $('#map').removeAttr('style');
});

var extendingPolylineData = null;
map.on('pm:drawstart', ({
    workingLayer
}) => {
    var index = 0;
    extendingPolylineData = null;
    workingLayer.on('pm:vertexadded', (e) => {
        if (e.shape == 'Line' && index == 0) {
            index++;
            Object.values(polylines).forEach(function(polyline) {
                var start = polyline.getLatLngs()[0];
                var end = polyline.getLatLngs().slice(-1)[0];
                if (start.lat == e.latlng.lat && start.lng == e.latlng.lng && confirm('Continuer la polyligne ?')) {
                    extendingPolylineData = {
                        polyline: polyline,
                        start: true
                    };
                } else if (end.lat == e.latlng.lat && end.lng == e.latlng.lng && confirm('Continuer la polyligne ?')) {
                    extendingPolylineData = {
                        polyline: polyline,
                        start: false,
                    };
                }
            });
        }
    });
});

map.pm.enableDraw('Polygon', {
    templineStyle: {
        color: '#54ff00'
    },
    hintlineStyle: {
        color: '#54ff00',
        dashArray: [5, 5]
    },
    snappable: true,
    snapDistance: mobilecheck() ? 25 : 10,
});
map.pm.disableDraw('Polygon');

map.pm.enableDraw('Line', {
    templineStyle: {
        color: '#00a8ff'
    },
    hintlineStyle: {
        color: '#00a8ff',
        dashArray: [5, 5]
    },
    snappable: true,
    snapDistance: mobilecheck() ? 25 : 10,
});
map.pm.disableDraw('Line');

map.pm.enableDraw('Marker', {
    snappable: true,
    snapDistance: mobilecheck() ? 25 : 10,
});
map.pm.disableDraw('Marker');

map.on('pm:remove', function(e) {
    //console.log(e);
    //console.log(layerGroups);
    Object.values(layerGroups).forEach(function(lg) {
        lg.removeLayer(e.layer);
    });
});

map.on('pm:create', function(e) {
    if (e.shape == 'Line') {
        var polyline;

        if (extendingPolylineData) {
            var newLatLngs = e.layer.getLatLngs();
            map.removeLayer(e.layer);
            polyline = extendingPolylineData.polyline;
            if (extendingPolylineData.start) {
                var oldLatLngs = polyline.getLatLngs().reverse();
                oldLatLngs.pop();
                polyline.setLatLngs(oldLatLngs.concat(newLatLngs));
            } else {
                var oldLatLngs = polyline.getLatLngs();
                oldLatLngs.pop();
                polyline.setLatLngs(oldLatLngs.concat(newLatLngs));
            }
        } else {
            polylineCounter++;
            polyline = e.layer;
            initPolyline(polyline);

            polyline.id = polylineCounter;
            polylines['pl' + polyline.id] = polyline;
            polyline.on('remove', function() {
                delete polylines['pl' + polyline.id];
            });
            polyline.on('pm:dragend', function(e) {
                map.closePopup();
            });
        }

        var tempLatLng = null;
        var totalDistance = null;

        $.each(polyline._latlngs, function(i, latlng) {
            if (tempLatLng == null) {
                tempLatLng = latlng;
                return;
            }

            totalDistance += tempLatLng.distanceTo(latlng);
            tempLatLng = latlng;
        });
        var text = '<b>Distance :</b> ' + (Math.round(100 * totalDistance) / 100).toLocaleString('en').split(',').join(' ') + ' <b>mètres</b>';
        polyline.bindPopup(text).openPopup();
        polyline.popupText = text;
    }

    if (e.shape == 'Polygon') {
        polygonCounter++;
        var polygon = e.layer;
        initPolygon(polygon);
        polygon.id = polygonCounter;
        polygons['pg' + polygon.id] = polygon;
        polygon.on('remove', function() {
            delete polygons['pg' + polygon.id];
        });
        polygon.on('pm:dragend', function(e) {
            map.closePopup();
        });
        var area = L.GeometryUtil.geodesicArea(polygon._latlngs[0]);
        var text = '<center><b>Surface : </b>' + (Math.round(100 * area) / 100).toLocaleString('en').split(',').join(' ') + ' <b>m²</b>';

        var ha = Math.floor(area / 1e4);
        var a = Math.floor((area - 1e4 * ha) / 100);
        var ca = Math.round(100 * (area - 1e4 * ha - 100 * a)) / 100;
        text += '<br>';
        text += 0 == ha ? '' : ' ' + ha + ' <b>ha</b>';
        text += 0 == a ? '' : ' ' + a + ' <b>a</b>';
        text += 0 == ca ? '' : ' ' + ca + ' <b>ca</b>';
        
        text += '</center>';

        polygon.popupText = text;
        polygon.area = area;
        polygon.bindPopup(polygon.popupText).openPopup();

        var data = {
            pgId: polygon.id,
            polygon: polygon._latlngs[0],
            bounds: [polygon.getBounds()._southWest, polygon.getBounds()._northEast],
        };

        Object.values(polygons)
            .sort(function(a, b) {
                return a.area > b.area ? 1 : -1;
            })
            .forEach(function(p) {
                p.bringToBack();
            });
    }

    if (e.shape == 'Marker') {
        var point = e.marker;
        point.dragging.enable = function() {};

        pointCounter++;
        point.id = pointCounter;
        points['p' + point.id] = point;
        point.on('remove', function() {
            delete points['p' + point.id];
        });

        var positionMch = proj4('WGS84', currentProjection).forward([point._latlng.lng, point._latlng.lat]);
        point.x = positionMch[0];
        point.y = positionMch[1];
        point.hasZ = false;
        point.clickAllowed = true;

        attachClickEventToMarker(point);
    }
    //console.log([points, polylines, polygons]);
});




map.on('pm:remove', function(e) {
    //console.log([points, polylines, polygons]);
});

map.on('pm:drawstart', function() {
    Object.values(polygons).forEach(function(polygon) {
        polygon.unbindPopup();
    });

    Object.values(polylines).forEach(function(polyline) {
        polyline.unbindPopup();
    });
});

map.on('pm:drawend', function() {
    Object.values(polygons).forEach(function(polygon) {
        polygon.bindPopup(polygon.popupText);
    });

    Object.values(polylines).forEach(function(polyline) {
        polyline.bindPopup(polyline.popupText);
    });
});




function txtToPolygon(txt) {
    var lines = txt.split(/[\r\n]+/gm);
    var pointStrValues = [];
    lines.forEach(function(line) {
        if (line != '') {
            pointStrValues.push(line.split('\t'));
        }
    });
    var XYs = [];
    try {
        pointStrValues.forEach(function(p) {
            XYs.push(
                proj4('WGS84', currentProjection)
                .inverse([parseFloat(p[1]), parseFloat(p[2])])
                .reverse()
            );
        });

        map.fitBounds(drawPolygon(XYs).getBounds());
        $('.modal').modal('hide');
    } catch (error) {
        alert(error);
    }
}








function drawPolyline(latlngs, color) {
    var polyline = L.polyline(latlngs);
    initPolyline(polyline, color);
    polylineCounter++;
    polyline.id = polylineCounter;
    polylines['pl' + polyline.id] = polyline;
    polyline.on('remove', function() {
        delete polylines['pl' + polyline.id];
    });
    polyline.on('pm:dragend', function(e) {
        map.closePopup();
    });

    polyline.addTo(map);

    var tempLatLng = null;
    var totalDistance = null;

    $.each(polyline._latlngs, function(i, latlng) {
        if (tempLatLng == null) {
            tempLatLng = latlng;
            return;
        }

        totalDistance += tempLatLng.distanceTo(latlng);
        tempLatLng = latlng;
    });

    var text = '<b>Distance :</b> ' + (Math.round(100 * totalDistance) / 100).toLocaleString('en').split(',').join(' ') + ' <b>mètres</b>';

    polyline.bindPopup(text);
    polyline.popupText = text;

    return polyline;
}

function drawPolygon(latlngs, color) {
    var polygon = L.polygon(latlngs);
    initPolygon(polygon, color);

    polygonCounter++;
    polygon.id = polygonCounter;
    polygons['pg' + polygon.id] = polygon;
    polygon.on('remove', function() {
        delete polygons['pg' + polygon.id];
    });

    polygon.on('pm:dragend', function(e) {
        map.closePopup();
    });

    polygon.addTo(map);
    var area = L.GeometryUtil.geodesicArea(polygon._latlngs[0]);
    var text = '<center><b>Surface : </b>' + (Math.round(100 * area) / 100).toLocaleString('en').split(',').join(' ') + ' <b>m²</b>';

    var ha = Math.floor(area / 1e4);
    var a = Math.floor((area - 1e4 * ha) / 100);
    var ca = Math.round(100 * (area - 1e4 * ha - 100 * a)) / 100;
    text += '<br>';
    text += 0 == ha ? '' : ' ' + ha + ' <b>ha</b>';
    text += 0 == a ? '' : ' ' + a + ' <b>a</b>';
    text += 0 == ca ? '' : ' ' + ca + ' <b>ca</b>';
    text += '<br><button id="curves-btn" type="button" onclick="getCurves(' + polygon.id + ')" class="btn btn-primary btn-sm pro-inverted"><b></b></button>';
    text += '</center>';

    polygon.area = area;
    polygon.popupText = text;
    polygon.bindPopup(polygon.popupText);

    var data = {
        pgId: polygon.id,
        polygon: polygon._latlngs[0],
        bounds: [polygon.getBounds()._southWest, polygon.getBounds()._northEast],
    };


    Object.values(polygons)
        .sort(function(a, b) {
            return a.area > b.area ? 1 : -1;
        })
        .forEach(function(p) {
            p.bringToBack();
        });

    return polygon;
}

function drawPoint(latlng, openPopup) {
    var point = L.marker(latlng);

    pointCounter++;
    point.id = pointCounter;
    var positionMch = proj4('WGS84', currentProjection).forward([latlng[1], latlng[0]]);
    point.x = positionMch[0];
    point.y = positionMch[1];
    point.hasZ = false;
    point.clickAllowed = true;

    points['p' + point.id] = point;
    point.on('remove', function() {
        delete points['p' + point.id];
    });

    point.addTo(map);

    attachClickEventToMarker(point);

    if (openPopup) {
        point.openPopup();
    }

    return point;
}

function initPolyline(layer, color) {
    layer.setStyle({
        color: color || '#00a8ff',
        weight: mobilecheck() ? 5 : 4,
    });

    layer.on({
        mouseover: function() {
            layer.setStyle({
                weight: 6
            });
        },
        mouseout: function() {
            layer.setStyle({
                weight: 4
            });
        },
    });
}

function initPolygon(layer, color) {
    layer.setStyle({
        color: color || '#91e400',
        weight: 3,
        fillOpacity: 0.2,
    });

    layer.on({
        mouseover: function() {
            layer.setStyle({
                weight: 5
            });
        },
        mouseout: function() {
            layer.setStyle({
                weight: 3
            });
        },
    });
}

function attachClickEventToMarker(marker) {
    marker.bindPopup(
        '<b> Point ' +
        marker.id +
        '<br>' +
        $('#proj-select option:selected').text() +
        ' :' +
        '</b>' +
        '<br><b>X : </b>' +
        marker.x.toFixed(2) +
        ' m <br><b>Y : </b>' +
        marker.y.toFixed(2)+
        ' m'
    );
    marker.on('click', function(e) {
        if (!marker.hasZ && marker.clickAllowed) {
            marker.clickAllowed = false;
            setInterval(function() {
                marker.clickAllowed = true;
            }, 1500);
            var keys = Object.keys(points);
            var values = Object.values(points);
            var altsToFetch = {};
            for (let i = 0; i < keys.length; i++) {
                if (!values[i].hasZ) {
                    altsToFetch[keys[i]] = values[i].getLatLng();
                }
            }
            marker.openPopup();
        }
    });
}

function drawCurve(XYs, elevation, weight, color) {
    var latlngs = [];
    XYs.forEach((XY) => {
        latlngs.push([XY.y, XY.x]);
    });
    var curve = L.polyline(latlngs, {
        weight: weight,
        pmIgnore: false,
        color: color
    });
    curve.bindTooltip('Z = ' + elevation.toFixed(2), {
        sticky: true
    });
    curve.addTo(map);

    return curve;
}

function parseDXF(dxfText) {
    var parser = new DxfParser();
    var points = [];
    var polylines = [];
    var polygons = [];

    var dxf = parser.parseSync(dxfText);
    //console.log(dxf);

    var entities = dxf.entities || {};
    var layers = {};

    try {
        layers = dxf.tables.layer.layers || {};
    } catch {}

    entities.forEach(function(entity) {
        var entLayer = entity.layer || '0';
        var acLayer = layers[entLayer] || {
            color: 16777215
        };
        if (entity.type == 'POINT' || entity.type == 'INSERT') {
            if (entity.position && entity.position.x && entity.position.y) {
                points.push({
                    position: entity.position,
                    layer: entLayer,
                    color: decToHex(acLayer.color),
                });
            }
        } else if (entity.type == 'CIRCLE') {
            var centerWGS = proj4('WGS84', currentProjection).inverse([entity.center.x, entity.center.y]).reverse();
            var polyCircleWGS = circleToPolygon(centerWGS, entity.radius, 32).coordinates[0];
            polyCircleWGS.pop();
            var polyCircle = [];
            polyCircleWGS.forEach(function(p) {
                var positionMch = proj4('WGS84', currentProjection).forward([p[0], p[1]]);
                polyCircle.push({
                    x: positionMch[0],
                    y: positionMch[1]
                });
            });
            polygons.push({
                vertices: polyCircle,
                layer: entLayer,
                color: decToHex(acLayer.color),
            });
        } else if (entity.type == 'LINE') {
            polylines.push({
                vertices: entity.vertices,
                layer: entLayer,
                color: decToHex(acLayer.color),
            });
        } else if (entity.type == 'LWPOLYLINE' || entity.type == 'POLYLINE') {
            if (entity.shape == true)
                polygons.push({
                    vertices: entity.vertices,
                    layer: entLayer,
                    color: decToHex(acLayer.color),
                });
            else {
                polylines.push({
                    vertices: entity.vertices,
                    layer: entLayer,
                    color: decToHex(acLayer.color),
                });
            }
        } else if (entity.type == 'SOLID') {
            polylines.push({
                vertices: entity.points,
                layer: entLayer,
                color: decToHex(acLayer.color),
            });
        }
    });

    var parsedEntities = {
        points: points,
        polylines: polylines,
        polygons: polygons,
    };
    //console.log(parsedEntities);

    return parsedEntities;
}

function decToHex(number) {
    //converts to a integer
    var intnumber = number - 0;

    // isolate the colors - really not necessary
    var red, green, blue;

    // needed since toString does not zero fill on left
    var template = '#000000';

    // in the MS Windows world RGB colors
    // are 0xBBGGRR because of the way Intel chips store bytes
    red = (intnumber & 0x0000ff) << 16;
    green = intnumber & 0x00ff00;
    blue = (intnumber & 0xff0000) >>> 16;

    // mask out each color and reverse the order
    intnumber = red | green | blue;

    // toString converts a number to a hexstring
    var HTMLcolor = intnumber.toString(16);

    //template adds # for standard HTML #RRGGBB
    HTMLcolor = template.substring(0, 7 - HTMLcolor.length) + HTMLcolor;

    return HTMLcolor;
}

var endPoint;
var directions;
var dirRequest = false;

function onLocationFound(e) {
    try {
        currentLocation = e.latlng;
        if (!dirRequest) return;
        dirRequest = false;
        map.closePopup();
        if (directions && directions.directionsLayer) {
            map.removeLayer(directions.directionsLayer);
        }
        directions = L.mapquest.directions();
        directions.setLayerOptions({
            routeRibbon: {
                draggable: false,
                color: '#2aa6ce',
                opacity: 1.0,
            },
            alternateRouteRibbon: {
                opacity: 1.0,
            },
        });
        directions.route({
            start: e.latlng,
            end: endPoint,
            options: {
                unit: 'k',
                timeOverage: 50,
                maxRoutes: 3,
            },
        });
    } catch (err) {
        //console.log(err);
    }
}

map.on('locationfound', onLocationFound);

function getDirections(lat, lng) {
    locateControl.stop();
    dirRequest = true;
    endPoint = {
        lat: lat,
        lng: lng
    };
    map.locate({
        enableHighAccuracy: true
    });
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

var currentLocation = null;
setInterval(() => {
    if (currentLocation == null) return;
    if ($('.leaflet-control-locate').first().hasClass('active')) {
        $('#mark-position-btn-container').css('display', 'block');
    } else {
        $('#mark-position-btn-container').css('display', 'none');
    }
}, 100);
$('#mark-position-btn-container').click(function(e) {
    drawPoint([currentLocation.lat, currentLocation.lng]);
});


L.geoJSON(pointJSON).bindPopup(function(layer){
	return layer.feature.properties.Name
}).addTo(map);

L.geoJSON(pointJSON1).bindPopup(function(layer){
	return layer.feature.properties.Name
}).addTo(map);



L.geoJSON(polygonJSON).bindPopup(function(layer){
	return layer.feature.properties.Name
}).addTo(map);

L.geoJSON(lineJSON).bindPopup(function(layer){
	return layer.feature.properties.Name
}).addTo(map);






