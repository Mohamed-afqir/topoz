L.Control.MousePosition = L.Control.extend({
    options: {
        position: 'bottomleft',
        separator: ' : ',
        emptyString: 'Unavailable',
        lngFirst: false,
        numDigits: 5,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: "(SEFROU 2023)"
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;
        return this._container;
    },

    onRemove: function(map) {
        map.off('mousemove', this._onMouseMove)
    },

    _onMouseMove: function(e) {
        y = proj4('WGS84', currentProjection).forward([e.latlng.lng, e.latlng.lat])[0];
        y = Math.round(y * 100) / 100;
        x = proj4('WGS84', currentProjection).forward([e.latlng.lng, e.latlng.lat])[1];
        x = Math.round(x * 100) / 100;
        var lng = this.options.lngFormatter ? this.options.lngFormatter(x) : L.Util.formatNum(x, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(y) : L.Util.formatNum(y, this.options.numDigits);
        var value = this.options.lngFirst ? 'X : ' + lng + this.options.separator + 'Y : ' + lat : 'X : ' + lat + this.options.separator + 'Y : ' + lng;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
    }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function() {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function(options) {
    return new L.Control.MousePosition(options);
};