const express = require('express')
const places = require('./models/placesModel')

const router = express.Router()

router.get('/all', async (req, res, next) => {
  places
    .findPlaces()
    .then(content => {
      if (content === undefined || content.length == 0) {
        res.status(404).json({ message: 'no places found' })
      } else {
        res.status(200).json(content)
      }
    })
    .catch(err => next(err))
})

router.get('/:id/', async (req, res, next) => {
  places
    .findPlaceByID(req.params.id)
    .then(content => {
      if (content === undefined || content.length == 0) {
        res.status(404).json({
          message: 'Could not find place.'
        })
      } else {
        res.status(200).json(content)
      }
    })
    .catch(err => next(err))
})

router.post('/', async (req, res, next) => {
  places.findIfPlaceExists(req.body.place_id)
  .then(content => {
    if (content === undefined || content.length == 0) {
      places
      .addPlace({
        place_id: req.body.place_id,
        masks: req.body.masks,
        contact_tracing: req.body.contact_tracing,
        curbside: req.body.curbside,
        indoor: req.body.indoor,
        outdoor: req.body.outdoor
      })
      .then(newPlace => {
        res.status(201).json(newPlace)
      })
      .catch(err => {
        next(err)
      })

    } else {
      res.status(409).json({
        message: 'Place already exists'
      })
    }
  })
  

})

router.put('/:id', async (req, res, next) => {
  const updateBody = {
    place_id: req.params.id,
    masks: req.body.masks,
    contact_tracing: req.body.contact_tracing,
    curbside: req.body.curbside,
    indoor: req.body.indoor,
    outdoor: req.body.outdoor
  }
  places.findPlaceByID(req.params.id).then(place => {
    if (place) {
      places
        .updatePlace(req.params.id, updateBody)
        .then(updated =>
          res
            .status(200)
            .json({ message: `updated place: ${req.params.id}`, updateBody })
        )
        .catch(err => next(err))
    } else {
      return res
        .status(404)
        .json({ message: 'No place with that ID found in the database' })
    }
  })
})

module.exports = router
