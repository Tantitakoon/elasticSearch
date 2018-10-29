var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// client.search({
//   q: 'bo'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   console.trace(error.message);
// });

// client.search({
//   index: 'library',
//   type: 'article',
//   body: {
//     query: {
//       match: {
//         body: 'boom'
//       }
//     }
//   }
// }).then(function (resp) {
//     var hits = resp.hits.hits;
// }, function (err) {
//     console.trace(err.message);
// });








var searchParams = {
  index: 'library',
  body: {
    query: {
      filtered: {
        query: {
          match: {
            // match the query against all of
            // the fields in the posts index
            _all: "boom"
          }
        },
      }
    }
  }
};

client.search(searchParams, function (err, res) {
  if (err) {
    // handle error
    throw err;
  }

    console.log( res.hits.hits);

 
});










// client.indices.delete({
//   index: 'ais',
//   ignore: [404]
// }).then(function (body) {
//   console.log('index was deleted or never existed');
// }, function (error) {
// });