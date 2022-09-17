const express= require('express');
const app= express();
const path= require('path');
const redditData= require('./data.json')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats= [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Watson'
    ]
    res.render('cats', {cats})
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if(data) {
        res.render('subreddit', {...data});
    } else {
        res.render('notfound', {subreddit});
    }
})

app.get('/rand', (req, res) => {
    const num= Math.floor(Math.random() * 10)+1;
    //passes variable rand into random.ejs
    res.render('random', {rand: num})
    //could also work like this just need to change variable in random.ejs to num
    //res.render('random', {num:num})
    //res.render('random', {num})
})
