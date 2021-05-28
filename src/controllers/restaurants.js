import express from 'express';
import documentJson from '../utils/documentJson.js';
import City from '../models/city.js';
import njwt from 'njwt';
import apiLevel from '../utils/apiLevel.js';
import Restaurant from '../models/restaurant.js';

const router = express.Router();

/*
 * Returns a list of restaurants by filter. 
 */
router.get('/list', async (req, res) => {
  let listOfRestaurants = [];
  const restaurants = await Restaurant.find({}).exec();
  await Promise.all(restaurants.map(async (restaurant) => {
    listOfRestaurants.push({
      name: restaurant.name,
      image: restaurant.image,
      blurhash: restaurant.blurhash,
      id: restaurant.id,
      location: {
        coordinates: restaurant.location.coordinates,
        streetAddress: restaurant.location.streetAddress,
        city: documentJson(await City.findById(restaurant.location.city).exec())
      },
      deliveryOptions: restaurant.deliveryOptions,
      tags: restaurant.tags,
      averageReview: await restaurant.calculateReviewAverage(),
    })
  }));
  res.json(listOfRestaurants);
});

/*
 * Gets information about certain restaurant
 */
router.get('/:id/info', async (req, res) => {
  const restaurant = await Restaurant.findOne({ id: req.params.id }).exec();
  const menu = [];
  await Promise.all(restaurant.menu.map(async (menuItemId) => {
    menu.push(documentJson(await MenuItem.findById(menuItemId)));
  }));
  res.json({
    name: restaurant.name,
    image: restaurant.image,
    blurhash: restaurant.blurhash,
    id: restaurant.id,
    menu,
    location: {
      coordinates: restaurant.location.coordinates,
      streetAddress: restaurant.location.streetAddress,
      city: documentJson(await City.findById(restaurant.location.city).exec())
    },
    deliveryOptions: restaurant.deliveryOptions,
    tags: restaurant.tags,
    reviews: restaurant.reviews,
    averageReview: await restaurant.calculateReviewAverage(),
  });
});

// Admin section, move to somewhere else soon
/*
 * Registers a new city.
 * @apiLevel 100
 */
router.post('/newCity', apiLevel(100), async (req, res) => {
  const body = req.body;
  const cityExists = await City.findOne({ name: body.name }).exec();
  if (cityExists) {
    return res.status(400).json({ 
      error: true,
      message: 'City with name already exists'
    })
  }
  const city = new City({
    name: body.name,
    zipCode: body.zipCode,
    country: body.country
  })
  await city.save();
  res.json({
    error: false,
    message: 'City created',
    city: documentJson(city),
  });
});

/*
 * Registers a new restaurant.
 * @apiLevel 100
 */
router.post('/create', apiLevel(100), async (req, res) => {
  const body = req.body;
  const restaurantExists = await Restaurant.findOne({ id: body.id }).exec();
  if (restaurantExists) {
    return res.status(400).json({ 
      error: true,
      message: 'Restaurant with ID already exists'
    })
  }
  const restaurant = new Restaurant({
    name: body.name,
    id: body.id,
    image: body.image,
    deliveryOptions: {
      delivery: body.delivery,
      takeAway: body.takeAway,
      eatAtRestaurant: body.eatAtRestaurant,
    },
    reviews: [],
    location: {
      coordinates: [ body.latitude, body.longitude ],
      streetAddress: body.streetAddress,
      city: documentJson(await City.findOne({ name: body.city }).exec()),
    },
    tags: [],
  })
  
  await restaurant.save();
  restaurant.review(null, 5, 'Mahtavaa ruokaa.');
  setTimeout(() => restaurant.review(null, 5, 'Maukkaat hampparit!'), 1000);

  res.json({
    error: false,
    message: 'Restaurant created',
    restaurant: documentJson(restaurant),
  });
});

router.post('/apiKey', async (req, res) => {
  res.json({ jwt: njwt.create(req.body, process.env.SIGNING_KEY).compact() });
})

export default router;