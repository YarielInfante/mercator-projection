
class MercatorProjection {

    mapConfig = {
        mapImagesPath: '/map/',
        mapImagesBaseUrl: 'http://localhost:5000',
        mapVersion: '1',
        tileSize: 256,
        zoomLevel: 16,
        tileImageFormat: '.png',
    }

    static fromLatLngToTiles(lat, lng) {

        const worldCoordinateX = (lng + 180) / 360 * mapConfig.tileSize;
        const WorldCoordinateY = ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 0)) * mapConfig.tileSize;

        const pixelX = worldCoordinateX * 2 ** mapConfig.zoomLevel;
        const pixelY = WorldCoordinateY * 2 ** mapConfig.zoomLevel;

        const tileX = pixelX / mapConfig.tileSize;
        const tileY = pixelY / mapConfig.tileSize;

        return {
            tileX: parseInt(tileX),
            tileY: parseInt(tileY)
        };
    }


    static getTiles(tile_x, tile_y) {

        let dimensions = 3;
        let tiles = dimensions * dimensions;

        let x = parseInt(dimensions / 2);
        let y = parseInt(dimensions / 2);

        let startingX = tile_x - x;
        let endingX = tile_x + x;
        let tileX = startingX;

        let startingY = tile_y - y;
        let tileY = startingY;

        let commerceRadiuosTiles = [];

        for (let i = 0; i < tiles; i++) {

            commerceRadiuosTiles.push(mapConfig.mapImagesBaseUrl + '/' + mapConfig.zoomLevel + '/' + tileX + '/' + tileY + mapConfig.tileImageFormat);

            if (tileX == endingX) {
                tileX = startingX;
                tileY = tileY + 1;
            } else {
                tileX = tileX + 1;
            }

        }

        return commerceRadiuosTiles;
    }

}
