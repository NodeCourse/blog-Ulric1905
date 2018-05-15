const Sequelize = require('sequelize');

const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const article = db.define('article', {
    titre: { type: Sequelize.STRING },
    desc: { type: Sequelize.STRING }
});

article
    .sync()
    .then(() => {
    article.create({
    titre: 'Les cailloux',
    desc: 'azertyuioigfdsfghjkjhgfdsqsfghjkoiugfdsdfghjkjhgv gfdthsfhsdhsg fgsdg qsg  drg dq'
});
})
.then(() => {
    article.create({
    titre: 'Part Dieux',
    desc: 'gergzeg  gse g z dgz eag qsgeggt   gegeq ge g egegaeg'
});
})
.then(() => {
    return article.findAll();
})
.then((users) => {
    console.log(article);
});


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('homepage');

});


app.listen(3000);