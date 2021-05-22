const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    messageOne.textContent = 'Fetching weather data...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                const { feelslike, temperature } = data.forecast
                messageOne.textContent = data.location
                messageTwo.textContent = 'The temperature is ' + temperature + ' degrees. Feels like ' + feelslike + ' degrees.'
            }
        })
    })
})