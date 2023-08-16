import * as CryptoJS from 'crypto-js'

export default {
    serialize(state) {
      // Сериализация состояния перед сохранением
      return CryptoJS.AES.encrypt(
        JSON.stringify(state), 
        'LT!LT'
      ).toString() 
    },
  
    deserialize(serialized) {
      // Десериализация сериализованного состояния перед возвратом
      const bytes = CryptoJS.AES.decrypt(
        serialized, 
        'LT!LT'
      )
  
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }