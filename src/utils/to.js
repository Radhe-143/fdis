export default (promise) => {
  return promise.then((data) => {
    return [null, data]
  }).catch((error) => {
    console.log(error)
    try {
      return [error]
    } catch (err) {
      console.log('err when parsing json', err)
      return [error]
    }
  })
}
