const Product = require('../models/Product')

async function addProduct(product) {
  const newProduct = await Product.create(product)

  return newProduct
}

async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: 'after',
  })

  return newProduct
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id })
}

async function getProducts(
  search = '',
  limit = 12,
  page = 1,
  sortDirection = 'asc',
  category = '',
  subcategory = '',
  ripeningPeriod = '',
  growingRegion = ''
) {
  let sortQuery = { price: sortDirection === 'asc' ? 1 : -1 }
  let query = { name: { $regex: search, $options: 'i' } }

  if (category) {
    query.category = category
  }
  if (subcategory) {
    query.subcategory = subcategory
  }
  if (ripeningPeriod) {
    query.ripeningPeriod = ripeningPeriod
  }
  if (growingRegion) {
    query.growingRegion = growingRegion
  }

  const [
    products,
    count,
    categores,
    subcategores,
    ripeningPeriods,
    growingRegions,
  ] = await Promise.all([
    Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortQuery),
    Product.countDocuments(query),
    Product.distinct('category'),
    Product.distinct('subcategory'),
    Product.distinct('ripeningPeriod'),
    Product.distinct('growingRegion'),
  ])

  return {
    products: products,
    lastPage: Math.ceil(count / limit),
    categores: categores,
    subcategores: subcategores,
    ripeningPeriods: ripeningPeriods,
    growingRegions: growingRegions,
  }
}

function getProduct(id) {
  return Product.findById(id)
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
}
