import { find, remove } from 'lodash'
import { Money } from '../utils/Money'
export default class Cart {
  items = []

  add(item) {
    const itemToFind = { product: item.product }

    if(find(this.items, itemToFind)) {
      remove(this.items, itemToFind)
    }

    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc.add(Money(item.quantity * item.product.price))
    }, Money(0))
  }

  getSummary() {
    return {
      total: this.getTotal(),
      items: this.items
    }
  }

  getCheckout() {
    const { total, items } = this.getSummary()

    this.items = []

    return {
      total,
      items
    }
  }
}
