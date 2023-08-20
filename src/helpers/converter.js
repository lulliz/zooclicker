// корректное оторажение чисел
export const numberConverter = (value) => {
    value = Math.abs(value)
    if (value > 999 && value < 1000000) {
      return (Math.floor(value) / 1000).toFixed(1) + 'k'
    } 
    else if (value > 999999999) {
        return (Math.floor(value) / 1000000000).toFixed(1) + 'b'
    } 
    else if (value > 999999) {
      return (Math.floor(value) / 1000000).toFixed(1) + 'm'
    } 
    else {
      return Math.floor(value)
    }
  }