function getGif(){
    var searchQuery = document.getElementById("searchField").value;
    if (searchQuery == "")
        searchQuery = "Be right back";
    searchQuery = searchQuery.replace(" ", "+");
    
    var request = new XMLHttpRequest();
    request.open('GET', "http://api.giphy.com/v1/gifs/search?q=".concat(searchQuery, "&api_key=118VvChonMShXDTlwIFxXcFRvijLywXJ&limit=10"), true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                console.log(request.responseText);
                PaintRandomImage(JSON.parse(request.responseText));
            }
        }
    }
}

function PaintRandomImage(jsonPayload){
    var max = jsonPayload.data.length;
    var index = Math.floor((Math.random() * max));
    var imgURL = jsonPayload.data[index].images.original.url;
    document.getElementById("ImagePlaceholder").innerHTML = "<img src=\"".concat(imgURL, "\">");
}