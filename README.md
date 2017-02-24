## About

This package scrapes the front page of RottenTomatoes.com for data.

This is done without using an API key.

The information returned includes movies opening this week, top box office, and coming soon.

For each movie some information will be returned:
* Movie title
* Movie Rotten Tomato meter rating (i.e. 93%, 45%, etc), or will show no score yet if not available
* Movie release date, for the opening this week and coming soon datasets
* Movie US domestic gross, for the top box office dataset

## Installation

```
npm install rt-scraper
```

## Usage

```javascript
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
```

## Data Return Example 

```javascript
{
  "openingThisWeek": [
    {
      "meter": "100%",
      "title": "Get Out",
      "date": "Feb 24"
    },
    {
      "meter": "30%",
      "title": "Collide",
      "date": "Feb 24"
    },
    {
      "meter": "44%",
      "title": "Rock Dog",
      "date": "Feb 24"
    },
    {
      "meter": "85%",
      "title": "The Girl With All the Gifts",
      "date": "Feb 24"
    },
    {
      "meter": "100%",
      "title": "My Life as a Zucchini (Ma vie de courgette)",
      "date": "Feb 24"
    }
  ],
  "boxOffice": [
    {
      "meter": "91%",
      "title": "The Lego Batman Movie",
      "gross": "$32.7M"
    },
    {
      "meter": "8%",
      "title": "Fifty Shades Darker",
      "gross": "$20.3M"
    },
    {
      "meter": "35%",
      "title": "The Great Wall",
      "gross": "$18.5M"
    },
    {
      "meter": "90%",
      "title": "John Wick: Chapter 2",
      "gross": "$16.3M"
    },
    {
      "meter": "30%",
      "title": "Fist Fight",
      "gross": "$12.3M"
    },
    {
      "meter": "92%",
      "title": "Hidden Figures",
      "gross": "$7.3M"
    },
    {
      "meter": "75%",
      "title": "Split",
      "gross": "$7.2M"
    },
    {
      "meter": "34%",
      "title": "A Dog's Purpose",
      "gross": "$5.8M"
    },
    {
      "meter": "93%",
      "title": "La La Land",
      "gross": "$4.6M"
    },
    {
      "meter": "39%",
      "title": "A Cure For Wellness",
      "gross": "$4.4M"
    }
  ],
  "comingSoon": [
    {
      "meter": "96%",
      "title": "Logan",
      "date": "Mar 3"
    },
    {
      "meter": "No Score Yet",
      "title": "Table 19",
      "date": "Mar 3"
    },
    {
      "meter": "No Score Yet",
      "title": "The Shack",
      "date": "Mar 3"
    },
    {
      "meter": "64%",
      "title": "Before I Fall",
      "date": "Mar 3"
    },
    {
      "meter": "74%",
      "title": "Lovesong",
      "date": "Mar 3"
    }
  ]
}
```



