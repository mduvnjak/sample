const Article = require('../models/article');

exports.getAll = function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      res.send({
        error:"No Articles"
      })
    }

    res.send(articles);
  });
};

exports.createArticle = function(req, res, next) {
  const title = req.body.title;
  const url = req.body.url;
  const author_name = req.body.author_name;

  if (!title || !url || !author_name) {
    return res.status(422).send({
      error: 'You must provide title, link and author name'
    })
  }

  const article = new Article({
    createdAt: new Date().getTime(),
    author: req.user,
    author_name: author_name,
    title: title,
    url: url,
    votes: []
   });

  article.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Article succsecfuly added' });
  });
};

exports.deleteArticles = function(req, res, next) {
  const articles = req.body.articles;

  Article.remove({'_id': articles, 'author._id': req.user._id}, function(err, articles) {
    if(err) {
      return next(err);
    }

    res.send(articles);
  });
};
