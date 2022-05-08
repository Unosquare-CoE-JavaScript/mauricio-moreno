// Enums ====================================================================

let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
})

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
})

// Classes ================================================================
class Product {
  constructor(name, color, size) {
    this.name = name
    this.color = color
    this.size = size
  }
}

// This class is unoptimized to grow
class ProductFilter {
  filterByColor(products, color) {
    return products.filter(product => product.color === color)
  }

  // This can't be added
  filterBySize(products, size) {
    return products.filter(product => product.size === size)
  }
}

// Una especificacion define los criteros a tomar en cuenta cuando se hace un filtro
class ColorSpecification {
  constructor(color) {
    this.color = color
  }

  isSatisfied(item) {
    return item.color === this.color
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size
  }

  isSatisfied(item) {
    return item.size === this.size
  }
}

class AndSpecification {
  constructor(...specifications) {
    this.specifications = specifications
  }
  isSatisfied(item) {
    return this.specifications.every(element => element.isSatisfied(item))
  }
}

class BetterFilter {
  filter(items, specification) {
    return items.filter(element => specification.isSatisfied(element))
  }
}

// Variables ================================================================
let apple = new Product("Apple", Color.green, Size.small)
let tree = new Product("Tree", Color.green, Size.large)
let house = new Product("House", Color.blue, Size.large)

let products = [apple, tree, house]

// old way ================================================================
const productFilter = new ProductFilter()

console.log(`Green products (old)`)

for (let p of productFilter.filterByColor(products, Color.green))
  console.log(`  * ${p.name} is green`)

// you can not extend a function infinitely it
//may create something we call state space explosion

// New way ================================================================
let betterFilter = new BetterFilter()

console.log(`Green products (new)`)
for (let p of betterFilter.filter(
  products,
  new ColorSpecification(Color.green)
))
  console.log(`  * ${p.name} is green`)

/* open close means that classes are open to extension but closed to modification */

// Two specifications ======================================================

console.log("Large and green products:")

let specifications = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
)

for (let product of betterFilter.filter(products, specifications))
  console.log(`  * green and big products ${product}`)
