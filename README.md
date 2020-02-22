## About

This package scrapes the front page of RottenTomatoes.com for data.

This is done without using an API key.

The information returned includes movies opening this week, top box office, and coming soon.

For each movie some information will be returned:
* Title
* Rotten Tomato meter rating (i.e. 93%, 45%, etc), or will show no score yet if not available
* Release date, for the opening this week and coming soon datasets
* US domestic gross, for the top box office dataset

## Installation

```
npm install rt-scraper
```

## Usage

There is only one method to this package: ```getRottenTomatoesScraperData(callback)```

This method requires the use of a callback, which can be specified or anonymous. The callback has two parameters in the form of ```function(error, data)```.

If there was an error, like failed HTML request or bad parsing, **error** will be true and **data** will be **null**. Otherwise, **error** will be false and **data** will be a javascript object. 

The **data** object has three keys: **openingThisWeek**, **boxOffice**, **comingSoon**. Each of these keys has for a value an array of movie objects. 

Each movie object contains a **title** and **meter** key, where **title** is the name of the movie and **meter** is it's Rotten Tomato meter score. Note that if no score is available this value can be equal to "No Score Yet" rather than "93%" or "45%".

The **openingThisWeek** and **comingSoon** keys will have movies with a **date** which references the movie's release date. This value will be in the form of "Mar 3" or "Sep 12".

The **boxOffice** key will have movies with a **date** which references the US domestic gross of that movie. This value will be in the form of "$11.2M" or "$120.7M". This is called **date** to stay consistent with the other keys as well as the RottenTomatoes homepage HTML itself.

Examine the usage and data return examples for best results.

## Usage Example

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
      "date": "$32.7M"
    },
    {
      "meter": "8%",
      "title": "Fifty Shades Darker",
      "date": "$20.3M"
    },
    {
      "meter": "35%",
      "title": "The Great Wall",
      "date": "$18.5M"
    },
    {
      "meter": "90%",
      "title": "John Wick: Chapter 2",
      "date": "$16.3M"
    },
    {
      "meter": "30%",
      "title": "Fist Fight",
      "date": "$12.3M"
    },
    {
      "meter": "92%",
      "title": "Hidden Figures",
      "date": "$7.3M"
    },
    {
      "meter": "75%",
      "title": "Split",
      "date": "$7.2M"
    },
    {
      "meter": "34%",
      "title": "A Dog's Purpose",
      "date": "$5.8M"
    },
    {
      "meter": "93%",
      "title": "La La Land",
      "date": "$4.6M"
    },
    {
      "meter": "39%",
      "title": "A Cure For Wellness",
      "date": "$4.4M"
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



