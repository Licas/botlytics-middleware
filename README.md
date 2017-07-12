
# botlytics-middleware
Node module for Botlytics API.

Refer to Botlytics official docs [here](https://botlytics.api-docs.io/).

##
### Installation

```javascript
npm install botlytics-middleware
```


### Usage

In your app.js add requirements for botlytics-middleware package and set:
* your Botlytics token (required)
* a unique bot id (optional)

```javascript
var BotlyticsMiddleware = require('botlytics-middleware')({ token: "<<BOTLYTICS_TOKEN>>", botId: "<<BOT_ID>>"
});
```
