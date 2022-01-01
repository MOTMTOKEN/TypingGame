const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quotedisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
  
  const arrQuote = quoteDisplayElement.querySelectorAll('span')
  const arrValue = quoteInputElement.value.split('')

  let correct = true

  arrQuote.forEach((charachterSpan, index) => {

    const charachter = arrValue[index]
    if (charachter == null) {
      charachterSpan.classList.remove('incorrect')
      charachterSpan.classList.remove('correct')
      correct = false
    }
    else if (charachter === charachterSpan.innerText){

      charachterSpan.classList.add('correct')
      charachterSpan.classList.remove('incorrect')
      
    } else {
      charachterSpan.classList.add('incorrect')
      charachterSpan.classList.remove('correct')
      correct = false
    }
    
  })
  if (correct) { getNextQuote() }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
  }

async function getNextQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''

    quote.split('').forEach(charachter => {
    const charachterSpan = document.createElement('span')
    // charachterSpan.classList.add('correct')
    charachterSpan.innerText = charachter 
    quoteDisplayElement.appendChild(charachterSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

getNextQuote()


let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}


