import Cart from './Cart'

describe('Cart', () => {
  let cart
  let product

  beforeEach(() => {
    cart = new Cart()

    product = {
      title: 'A cool product',
      price: 5388,
    }
  })

  describe('getTotal()', () => {
    it('should multiply quantity and price and recive the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      })

      expect(cart.getTotal()).toEqual(10776)
    })

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.items.length === 1).toEqual(true)
      expect(cart.getTotal()).toEqual(5388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: { ...product, price: 3276 },
        quantity: 1,
      })

      expect(cart.getTotal()).toEqual(14052)

      cart.remove(product)

      expect(cart.getTotal()).toEqual(3276)
    })
  })

  describe('getSummary()', () => {
    it('should return an object with the total and the list of items when getSummary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: { ...product, price: 3276 },
        quantity: 2,
      })

      expect(cart.getSummary()).toMatchSnapshot()
      expect(cart.getTotal()).toBeGreaterThan(0)
    })
  })
  
  describe('getCheckout()', () => {
    it('should reset the cart when getCheckout() is called', () => {
      cart.add({
        product,
        quantity: 2,
      })
  
      cart.getCheckout()
  
      expect(cart.getTotal()).toEqual(0)
    })
  })
})
