// Function to check if an element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

// Search functionality for index.html
if (elementExists('search-btn')) {
    document.getElementById('search-btn').addEventListener('click', function() {
        let query = document.getElementById('search-bar').value;
        if (query) {
            fetchDisasterData(query);
        }
    });
}

function fetchDisasterData(query) {
    const youtubeApiKey = 'AIzaSyDBb0Ifh0hxkKDhaNJtkxdC0dz9jKkYzrQ'; // Replace with your YouTube API key
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&order=relevance&publishedAfter=2022-01-01T00:00:00Z&type=video&key=${youtubeApiKey}`;

    fetch(youtubeApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const videoTitle = data.items[0].snippet.title;
                document.getElementById('content').innerHTML = `
                    <div class="video">
                        <h3>${videoTitle}</h3>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                document.getElementById('content').innerHTML = `<p>No videos found for "${query}".</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching video:', error);
            document.getElementById('content').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

// Calculator functionality for cal.html
if (elementExists('calculate-energy-btn')) {
    document.getElementById('calculate-energy-btn').addEventListener('click', function() {
        let magnitude = parseFloat(document.getElementById('magnitude-input').value);
        if (!isNaN(magnitude)) {
            let energy = calculateEarthquakeEnergy(magnitude);
            document.getElementById('energy-result').innerHTML = `
                <p>Energy released by an earthquake of magnitude ${magnitude} is approximately ${energy.toExponential(3)} joules.</p>
            `;
        } else {
            document.getElementById('energy-result').innerHTML = `<p>Please enter a valid magnitude.</p>`;
        }
    });
}

if (elementExists('calculate-moment-btn')) {
    document.getElementById('calculate-moment-btn').addEventListener('click', function() {
        let magnitude = parseFloat(document.getElementById('seismic-magnitude-input').value);
        if (!isNaN(magnitude)) {
            let moment = calculateSeismicMoment(magnitude);
            document.getElementById('moment-result').innerHTML = `
                <p>Seismic moment for an earthquake of magnitude ${magnitude} is approximately ${moment.toExponential(3)} dyne-cm.</p>
            `;
        } else {
            document.getElementById('moment-result').innerHTML = `<p>Please enter a valid magnitude.</p>`;
        }
    });
}

if (elementExists('calculate-tnt-btn')) {
    document.getElementById('calculate-tnt-btn').addEventListener('click', function() {
        let magnitude = parseFloat(document.getElementById('richter-magnitude-input').value);
        if (!isNaN(magnitude)) {
            let tnt = calculateTNTEquivalent(magnitude);
            document.getElementById('tnt-result').innerHTML = `
                <p>Energy equivalent in TNT for an earthquake of magnitude ${magnitude} is approximately ${tnt.toExponential(3)} kg of TNT.</p>
            `;
        } else {
            document.getElementById('tnt-result').innerHTML = `<p>Please enter a valid magnitude.</p>`;
        }
    });
}

if (elementExists('calculate-pga-btn')) {
    document.getElementById('calculate-pga-btn').addEventListener('click', function() {
        let magnitude = parseFloat(document.getElementById('pga-magnitude-input').value);
        let distance = parseFloat(document.getElementById('distance-input').value);
        if (!isNaN(magnitude) && !isNaN(distance)) {
            let pga = calculatePGA(magnitude, distance);
            document.getElementById('pga-result').innerHTML = `
                <p>Peak ground acceleration for an earthquake of magnitude ${magnitude} at a distance of ${distance} km is approximately ${pga.toExponential(3)} g.</p>
            `;
        } else {
            document.getElementById('pga-result').innerHTML = `<p>Please enter valid values for magnitude and distance.</p>`;
        }
    });
}

function calculateEarthquakeEnergy(magnitude) {
    return Math.pow(10, 1.5 * magnitude + 4.8);
}

function calculateSeismicMoment(magnitude) {
    return Math.pow(10, 1.5 * magnitude + 16.1);
}

function calculateTNTEquivalent(magnitude) {
    let energy = calculateEarthquakeEnergy(magnitude);
    return energy / 4.184e9; // 1 ton of TNT = 4.184e9 joules
}

function calculatePGA(magnitude, distance) {
    // This is a simplified formula and may not be accurate for all scenarios
    return 1230 * Math.exp(0.8 * magnitude) / (distance + 10) ** 1.6;
}
