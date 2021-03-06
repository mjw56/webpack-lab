var webpack = require('webpack');
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config';
import utils from './modules/scraper';
var express = require('express');

const api = express()
  .get('/books', (req, res) => {
    utils.scrapeNYT('http://www.nytimes.com/best-sellers-books/').then((data) => {
      res.send(data);
    });
  });

const app = express()
  .all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  });

app.use('/api', api)
  .listen(3001)

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
