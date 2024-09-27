document.getElementById('search-btn').addEventListener('click', function() {
    let query = document.getElementById('search-bar').value;
    if (query) {
        fetchDisasterData(query);
    }
});

function fetchDisasterData(query) {
    const youtubeApiKey = 'AIzaSyDBb0Ifh0hxkKDhaNJtkxdC0dz9jKkYzrQ'; // Replace with your YouTube API key
    const newsApiKey = '3297e5680f1c45e2aece5f2825925aa2'; // Replace with your NewsAPI key

    const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${youtubeApiKey}`;
    const newsAPIUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-08-06&to=2024-08-06&sortBy=popularity&apiKey=${newsApiKey}`;

    Promise.all([
        fetch(youtubeAPIUrl).then(response => response.json()),
        fetch(newsAPIUrl).then(response => response.json())
    ])
    .then(([youtubeData, newsData]) => {
        let videoContent = '';
        if (youtubeData.items && youtubeData.items.length > 0) {
            const videoId = youtubeData.items[0].id.videoId;
            const videoTitle = youtubeData.items[0].snippet.title;
            videoContent = `
                <div class="video">
                    <h3>${videoTitle}</h3>
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
            `;
        } else {
            videoContent = `<p>No videos found for "${query}".</p>`;
        }

        let newsContent = '';
        if (newsData.articles && newsData.articles.length > 0) {
            newsContent = newsData.articles.map(article => `
                <div class="article">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `).join('');
        } else {
            newsContent = `<p>No news articles found for "${query}".</p>`;
        }

        document.getElementById('content').innerHTML = `
            <h2>Results for "${query}"</h2>
            ${newsContent}
            ${videoContent}
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('content').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    });
}
