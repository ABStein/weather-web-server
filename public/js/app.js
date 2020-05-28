const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = ''
messageTwo.textContent = ''


weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    
    //  placeholder/making sure the second line is cleared out.
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    // messageTwo.textContent = ''
                } else {
                    messageOne.textContent = `Location: ${data.location}`
                    messageTwo.textContent = `Forecast: ${data.forecast}`
                }
        
        })
        .catch((err) => console.log(err))
    })
})
