import Dinero from 'dinero.js'

Dinero.defaultCurrency = 'BRL'
Dinero.defaultPrecision = 2

export const Money = (value) => {
  return Dinero({ amount: value })
}
