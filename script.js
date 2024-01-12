import { CpfValidator } from './cpf-validator.js'

const cpfInput = document.querySelector('#cpf')

const value = new CpfValidator(cpfInput)
value.init()
console.log(value.build('98745845848'))
