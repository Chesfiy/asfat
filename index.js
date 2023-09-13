const express = require('express');
const cors = require('cors');
const path = require('path');
const handlebars  = require('express-handlebars');
const config = require('./config');


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir:__dirname+'/views/layouts',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/',
    extname: 'hbs'
}));

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname+'/public'));



app.get("/", function(req, res){

    const futureDate             = new Date( "sept 21,2023 10:00:00" ).getTime();
    const currentDate            = new Date().getTime();
    const timeDiffInMilliseconds = futureDate - currentDate;
    const millisecondsPerSecond  = 1000;
    const millisecondsPerMinute  = millisecondsPerSecond * 60; // 1000 * 60
    const millisecondsPerHour    = millisecondsPerMinute * 60; // 1000 * 60 * 60
    const millisecondsPerDay     = millisecondsPerHour   * 24; // 1000 * 60 * 60 * 24

    const days = Math.floor( timeDiffInMilliseconds / millisecondsPerDay );

    const timeDiffInLessThan1Day = timeDiffInMilliseconds % millisecondsPerDay;
    const hours = Math.floor( timeDiffInLessThan1Day / millisecondsPerHour );

    const timeDiffInLessThan1Hour = timeDiffInMilliseconds % millisecondsPerHour;
    const minutes = Math.floor( timeDiffInLessThan1Hour / millisecondsPerMinute );

    const timeDiffInLessThan1Minute = timeDiffInMilliseconds % millisecondsPerMinute;
    const seconds = Math.floor( timeDiffInLessThan1Minute / millisecondsPerSecond );

    res.render("comingsoon", {layout: 'index-cms', days:days, hours:hours, minutes:minutes,seconds})
});


app.listen(config.port, () => console.log(`App is listening on url http://localhost:${config.port}`));