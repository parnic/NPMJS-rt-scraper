// Usage example of rt-scraper package
// See https://www.npmjs.com/package/rt-scraper

var rtscraper = require('rt-scraper');

console.log('Usage example of the rt-scraper package.')

rtscraper.getRottenTomatoesScraperData( function(error, data) {
        if (!error) {
            console.log(JSON.stringify(data, null, 2));      
        }
        else {
            console.log('Some error occured.');
        }
    });