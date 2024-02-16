const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];
// loading spinneing shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // check if author is known or given name
  if (quote.author == 'Anonymous') {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length to deternine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}

// get quotes from the api
async function getQuotes() {
  loading();
  // it shows every time refersh but not in the changing the quote as it saved locally once fetch the whole data
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    console.log(apiQuote);
    newQuote();
  } catch (error) {
    console.log(error);
  }
}
// tweet
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}
// add event listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();
