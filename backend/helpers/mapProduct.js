module.exports = function (product) {
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.image,
    price: product.price,
    category: product.category,
    description: product.description,
    subcategory: product.subcategory,
    publishedAt: product.createdAt,
    ripeningPeriod: product.ripeningPeriod,
    growingRegion: product.growingRegion,
    expirationDate: product.expirationDate,
  }
}
