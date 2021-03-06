const express = require('express')
const router = express.Router()

const Product = require('./models/product-model')
const auth = require('./auth')

const productPersistence = require('./services/data/product-persistence')
const userPersistence = require('./services/data/user-persistence')
const ebaySearch = require('./services/adapter/ebay-search')
const bestBuySearch = require('./services/adapter/best-buy-search')
const productSearch = require('./services/business/product-search')
const productTracking = require('./services/business/product-tracking')
const priceUpdate = require('./services/business/price-update')
const trackingGateway = require('./services/process/tracking-gateway')
const priceHistoryGateway = require('./services/process/price-history-gateway')

//Data services
router.post('/products', auth.isRequestLocal, productPersistence.saveProduct)
router.get('/products', auth.isRequestLocal, productPersistence.getProducts)
router.get('/update-list', auth.isRequestLocal, productPersistence.getUpdateList)
router.get('/products/:trackingId', auth.isRequestLocal, productPersistence.getProductByTrackingId)
router.put('/products/:trackingId', auth.isRequestLocal, productPersistence.updateProduct)
router.get('/users', auth.isRequestLocal, userPersistence.getUser)

//Adapter Services
router.get('/ebay-search', auth.isRequestLocal, ebaySearch.searchEbayProduct)
router.get('/best-buy-search', auth.isRequestLocal, bestBuySearch.searchBestBuyProduct)

//Business Logic Services
router.get('/search-product', auth.isRequestLocal, productSearch.searchProduct)
router.get('/create-tracking', auth.isRequestLocal, productTracking.createTracking)
router.get('/update-prices', auth.isRequestLocal, priceUpdate.updatePrices)

//Process Centric Services
router.get('/track-new-product', auth.isApiKeyValid, trackingGateway.trackNewProduct)
router.get('/show-price-history', auth.isApiKeyValid, priceHistoryGateway.showPriceHistory)
router.get('/show-all-trackings', auth.isApiKeyValid, priceHistoryGateway.showAllTrackings)

//Welcome  message
router.get('/', function (req, res) {
  res.send(' Welcome to the Price Tracker-WS: a web service which can track products price from e-commerce stores such as eBay and BestBuy.\n'
          + 'Please check the documentation at https://pricetracker.docs.apiary.io/#reference')
})

module.exports = router
