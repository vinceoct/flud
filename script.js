let button = document.getElementById('searchButton')

button.addEventListener('click', async () => {
    let response = await axios.get(`http://api.football-data.org/v4/competitions/`)
        headers: {
            '57ea35c29b17494ab2cdacd1e45a77a4'
        }
    console.log(response)    
} ) 
