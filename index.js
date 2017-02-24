/*
MIT License

Copyright (c) 2017 Adam Moses

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// parses the HTML body that the request operation received
// uses the cheerio package to achieve this
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

// makes a call to get the HTML from the rotten tomatoes front page
// uses the request package to achieve this
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

// the export function exposed via the package
// uses a callback since the request call itself is asynchronous
exports.getRottenTomatoesScraperData = function(callback) {
    requestRottenTomatoesHTML(callback);
}
  
//  --- the end ---
