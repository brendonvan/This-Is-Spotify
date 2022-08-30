let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "http://localhost:8080/callback";

async function getAuth () {
    try{
        // POST TO SPOTIFY TO GET ACCESS_TOKEN
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = new URLSearchParams({'grant_type':'client_credentials'}).toString(); 
        const response = await axios.post(token_url, data, {
        headers: { 
            "Authorization": "Basic " + new Buffer.from(`${client_id}:${client_secret}`, "utf-8").toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
        })
        // console.log('GOT ACCESS_TOKEN: ' + response);
        // console.log(response.data.access_token);  

        // RETURN ACCESS_TOKEN
        return response.data.access_token;
    
    } catch(error){
        console.log(error);
    }
}

// module.exports = getAuth;