const express = require('express')

const router = express.Router()

router.get('/script', async (req, res, next) => {
  res.redirect(`https://maps.googleapis.com/maps/api/js?key=${process.env.G_KEY}&libraries=places`)
})

router.get('/byID/:id', async (req,res,next) => {
    res.redirect(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.params.id}&fields=place_id,name,vicinity,icon&key=${process.env.G_KEY}`)
})

router.get('/list/:search', async (req,res,next) => {
    res.redirect(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.search}&radius=5000&key=${process.env.G_KEY}`)
})

module.exports = router
