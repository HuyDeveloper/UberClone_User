const DecodePolyline = (polyline) => {
    let index = 0,
      lat = 0,
      lng = 0,
      coordinates = []
  
    while (index < polyline.length) {
      let shift = 0,
        result = 0,
        byte
  
      do {
        byte = polyline.charCodeAt(index++) - 63
        result |= (byte & 0x1f) << shift
        shift += 5
      } while (byte >= 0x20)
  
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1
      lat += dlat
  
      shift = 0
      result = 0
  
      do {
        byte = polyline.charCodeAt(index++) - 63
        result |= (byte & 0x1f) << shift
        shift += 5
      } while (byte >= 0x20)
  
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1
      lng += dlng
  
      coordinates.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 })
    }
  
    return coordinates
  }
  export default DecodePolyline