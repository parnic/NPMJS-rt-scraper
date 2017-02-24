// 

function parseRottenTomatoesHTML(fileData) {
    var cheerio = require("cheerio");
    // prep the return object
    var allTomatoData = { openingThisWeek: [ ]
                           , boxOffice: [ ]
                           , comingSoon: [ ] };
    var errorFlag = true;
    // sanity check that this is rotten tomatoes web html
    if (fileData.indexOf('Rotten Tomatoes') != -1) {
        // set error flag to false for passing sanity check
        errorFlag = false;
        // load the html into the cheerio doc
        var fullDoc = cheerio.load(fileData);
        // find the stub for movies opening this week
        var openingThisWeekDoc = cheerio.load(fullDoc('[id="homepage-opening-this-week"]').html());        
        // iterate through movies and strip useful parts, add each to return object
        openingThisWeekDoc('.sidebarInTheaterOpening').each(function() {
            var movieDoc = cheerio.load(openingThisWeekDoc(this).html());
            var movieMeter = movieDoc('.left_col').text().trim();
            var movieTitle = movieDoc('.middle_col').text().trim();
            var movieDate  = movieDoc('.right_col').text().trim();
            var movieObj = {
                meter: movieMeter, 
                title: movieTitle, 
                date: movieDate
            };
            allTomatoData.openingThisWeek[allTomatoData.openingThisWeek.length] = movieObj;
        });    
        // find the stub for top box office this week            
        var topBoxOfficeDoc = cheerio.load(fullDoc('[id="homepage-top-box-office"]').html()); 
        // iterate through movies and strip useful parts, add each to return object        
        topBoxOfficeDoc('.sidebarInTheaterOpening').each(function() {
            var movieDoc = cheerio.load(topBoxOfficeDoc(this).html());
            var movieMeter = movieDoc('.left_col').text().trim();
            var movieTitle = movieDoc('.middle_col').text().trim();
            var movieGross = movieDoc('.right_col').text().trim();
            var movieObj = {
                meter: movieMeter, 
                title: movieTitle, 
                gross: movieGross
            };
            allTomatoData.boxOffice[allTomatoData.boxOffice.length] = movieObj;            
        });  
        // find the stub for top movies coming soon
        var topComingSoonDoc = cheerio.load(fullDoc('[id="homepage-top-coming-soon"]').html());
        // iterate through movies and strip useful parts, add each to return object         
        topComingSoonDoc('.sidebarInTheaterOpening').each(function() {
            var movieDoc = cheerio.load(topComingSoonDoc(this).html());
            var movieMeter = movieDoc('.left_col').text().trim();
            var movieTitle = movieDoc('.middle_col').text().trim();
            var movieDate  = movieDoc('.right_col').text().trim();
            var movieObj = {
                meter: movieMeter, 
                title: movieTitle, 
                date: movieDate
            };
            allTomatoData.comingSoon[allTomatoData.comingSoon.length] = movieObj;            
        });                  
    }
    // return error flag and the data  
    return {error: errorFlag, data: allTomatoData};
}

function requestRottenTomatoesHTML(callback) {
    var request = require("request");
    request({ uri: "http://www.rottentomatoes.com" }, 
        function(error, response, body) {
            if (!error) {
                var parsedData = parseRottenTomatoesHTML(body);
                if (parsedData.error == false)
                    callback(false, parsedData.data);
                else
                    callback(true, null);
            }
            else {
                callback(true, null);
            }
        });
}

exports.getRottenTomatoesScraperData = function(callback) {
    requestRottenTomatoesHTML(callback);
}




