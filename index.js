const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const app = express();

const Article = db.define('article', {
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.TEXT }
});

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Article
        .findAll()
        .then((articles) => articles.map(article => article.dataValues))
        .then((articles) => {
            res.render('index', { articles });
        });
});

app.post('/', (req, res) => {
    const { title, content } = req.body;
    Article
        .sync()
        .then(() => Article.create({ title, content }))
        .then(() => res.redirect('/'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
