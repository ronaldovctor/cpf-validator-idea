export class CpfValidator {
	constructor(element) {
		this.element = element
	}

	clean(cpfVal) {
		return cpfVal.replace(/\D/gi, '')
	}

	build(cpfVal) {
		return cpfVal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
	}

	format(cpfVal) {
		const cleanCpf = this.clean(cpfVal)
		return this.build(cleanCpf)
	}

	validateCpf(cpfVal) {
		const match = cpfVal.match(/(?:\d{3}[.-\s]?){3}\d{2}/)
		return match && match[0] == cpfVal
	}

	errorSpan() {
		const span = document.createElement('span')
		span.innerText = 'Invalid CPF. Try again.'
		span.classList.add('error-span')

		return span
	}

	checkOnChange(element) {
		const cpfVal = element.value
		this.element.value = this.format(cpfVal)
		const parentElement = this.element.parentElement
		const errorSpan = document.querySelector('span.error-span')

		if (this.validateCpf(cpfVal)) {
			this.element.style.borderColor = 'green'
			if (this.element.nextElementSibling == errorSpan)
				this.element.nextElementSibling.remove()
		} else {
			this.element.style.borderColor = 'red'
			if (this.element.nextElementSibling != errorSpan)
				parentElement.insertBefore(this.errorSpan(), this.element.nextElementSibling)
		}
	}

	addEvent() {
		this.element.addEventListener('change', () => {
			this.checkOnChange(this.element)
		})
	}

	init() {
		this.addEvent()
		return this
	}
}
