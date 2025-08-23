const newsList = document.getElementById("newsList");
const loadNewsBtn = document.getElementById("loadNews");

const API_KEY = "YOUR_API_KEY"; // Replace with your NewsAPI key
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

loadNewsBtn.addEventListener("click", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      newsList.innerHTML = ""; // Clear old news
      data.articles.forEach(article => {
        const div = document.createElement("div");
        div.classList.add("news-item");
        div.innerHTML = `
          <h3>${article.title}</h3>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsList.appendChild(div);
      });
    })
    .catch(() => {
      newsList.innerHTML = "<p>⚠️ Failed to load news. Check your API key.</p>";
    });
});
