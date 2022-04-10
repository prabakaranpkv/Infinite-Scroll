const container = document.querySelector("#container");
let allData = [];
const quotesLimit = 5;
let startingIndex = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      renderData();
    }
  });
});

const formatData = (quotes) => {
  let dataString = "";

  quotes.forEach((quote) => {
    dataString += `<div class="quote">${quote.text}-(${quote.author})</div>`;
  });
  return dataString;
};

const renderData = () => {
  const getData = formatData(
    allData.slice(startingIndex, startingIndex + quotesLimit)
  );

  container.innerHTML += getData;

  const renderquotes = document.querySelectorAll(".quote");
  startingIndex = renderquotes.length;
  const lastRenderQuote = renderquotes[renderquotes.length - 1];
  observer.observe(lastRenderQuote);
};

const loadAllQuotes = () => {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      allData = [...allData, ...data];
      renderData();
    });
};
loadAllQuotes();
