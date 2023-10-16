import envConfig from '../configs'
import cipher from './cipher';

const isVisa = (cardNumber) => {
  return cardNumber.match(/^4[0-9]{6,}$/)
}

const isMasterCard = (cardNumber) => {
  return cardNumber.match(/^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/)
}

const isAmericanExpress = (cardNumber) => {
  return cardNumber.match(/^3[47][0-9]{5,}$/)
}

const isDinersClub = (cardNumber) => {
  return cardNumber.match(/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/)
}

const isDiscover = (cardNumber) => {
  return cardNumber.match(/^6(?:011|5[0-9]{2})[0-9]{3,}$/)
}
const isJCB = (cardNumber) => {
  return cardNumber.match(/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/)
}

const decryptListCards = (listCards, decryptFields) => {
  const {
    algorithm,
    password,
    secondPassword,
    inputEncoding,
    outputEncoding
  } = envConfig.creditCard
  listCards.forEach((item) => {
    decryptFields.forEach((field) => {
      item[field] = cipher.decryptAdvantageAES(item[field], algorithm, `${password}${item._id}`, secondPassword, inputEncoding, outputEncoding)
    })
  })
  return listCards
}

const decryptCard = (card, decryptFields) => {
  const {
    algorithm,
    password,
    secondPassword,
    inputEncoding,
    outputEncoding
  } = envConfig.creditCard
  decryptFields.forEach((field) => {
    card[field] = cipher.decryptAdvantageAES(card[field], algorithm, `${password}${card._id}`, secondPassword, inputEncoding, outputEncoding)
  })
  return card
}

const getCreditCardType = (cardNumber) => {
  if (isVisa(cardNumber)) {
    return envConfig.creditCardTypes.visa
  } else if (isMasterCard(cardNumber)) {
    return envConfig.creditCardTypes.masterCard
  } else if (isAmericanExpress(cardNumber)) {
    return envConfig.creditCardTypes.americanExpress
  } else if (isDinersClub(cardNumber)) {
    return envConfig.creditCardTypes.dinersClub
  } else if (isDiscover(cardNumber)) {
    return envConfig.creditCardTypes.discover
  } else if (isJCB(cardNumber)) {
    return envConfig.creditCardTypes.jcb
  }
  return envConfig.creditCardTypes.notFound
}

export default {
  getCreditCardType,
  decryptListCards,
  decryptCard
}
