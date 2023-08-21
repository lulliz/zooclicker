// корректное оторажение чисел
export const numberConverter = (value) => {
    let newValue = Math.abs(value)
    if (newValue > 999 && newValue < 1000000) {
      return (Math.floor(value) / 1000).toFixed(1) + 'k'
    } 
    else if (newValue > 999999999) {
        return (Math.floor(value) / 1000000000).toFixed(1) + 'b'
    } 
    else if (newValue > 999999) {
      return (Math.floor(value) / 1000000).toFixed(1) + 'm'
    } 
    else {
      return Math.floor(value)
    }
  }