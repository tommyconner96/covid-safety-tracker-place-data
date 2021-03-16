const db = require('../../database/data.js')

function findPlaces (id) {
  return db('places').select(
    'places.place_id',
    'places.masks',
    'places.contact_tracing',
    'places.curbside',
    'places.indoor',
    'places.outdoor'
  )
}

function findPlaceByID (place_id) {
  return db('places').where('place_id', place_id).first()
}

function findIfPlaceExists(place_id) {
  const data = db('places').where('place_id', place_id).first()
  return data

}

function addPlace (place) {
  return db('places').insert(place).then(([id]) => findPlaceByID(id))
}

function updatePlace (place, newPlace) {
  return db('places').where('place_id', place).update(newPlace)
}

// function findPlaceByCityAndState(state, city) {
//   return db("places")
//     .where("city", city)
//     // .first()
//     .andWhere("state", state)
//     // .first()
// }

// function findPlaceByLatLng(lat, lng) {
//   return db("places")
//     .where("lat", lat)
//     // .first()
//     .andWhere("lng", lng)
//     // .first()
// }

// function findPlaceByState(state) {
//   return db("places").where("state", state)
// }

// function findPlaceByCity(city) {
//     return db("places").where("city", city)
//   }

module.exports = {
  findPlaces,
  findPlaceByID,
  findIfPlaceExists,
  addPlace,
  updatePlace
  //   findPlaceByCityAndState,
  //   findPlaceByCity,
  //   findPlaceByState,
  //   findPlaceByLatLng
}
