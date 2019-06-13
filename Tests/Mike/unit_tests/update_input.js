state = {
  opacity: 0
}

fadeInColor = () => {
  let {opacity} = state
  opacity = 100
  return {opacity}
}

module.exports = fadeInColor