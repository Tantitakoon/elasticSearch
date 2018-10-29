var elasticsearch = require('elasticsearch');
var fs =require('fs');
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var search = function () {
  
     var client = new elasticsearch.Client({
                    host: '10.138.35.129:9200'
                    //log: 'trace'
                });
   
    function  search() {
           this.searchIndex = this.searchIndex.bind(this);
           this.deleteIndex = this.deleteIndex.bind(this);
           this.createIndex = this.createIndex.bind(this);
           this.getIndexData = this.getIndexData.bind(this);
         
      
           
    }
    
    _createClass(search, [{
        key: 'searchIndex',
        value:function searchIndex(find) {
       
                    console.log("==================search INDEX==========================");
          return new Promise(function (resolve, reject){
   
                try {
                    client.ping({
                                requestTimeout: 30000,
                                }, function (error) {
                                    if (error) {
                                    console.error('elasticsearch cluster is down!');
                                        } else {
                                        console.log('All is well');
                                    }
                                });
                                        
                                var searchParams = {
                                    index: 'library',
                                    body: {
                                        query: {
                                        filtered: {
                                            query: {
                                            match: {
                                                // match the query against all of
                                                // the fields in the posts index
                                                _all: find
                                            }
                                            },
                                        }
                                        }
                                    }
                            };

                                client.search(searchParams,async function (err, res) {
                                    if (err) {
                                        // handle error
                                        throw err;
                                    }

                                // console.log( res.hits.hits);
                                // return res.hits.hits
                                console.log(res.hits.hits);
                                resolve(res.hits.hits);
                                
                          
                                
                        
                                });
                               
                } catch (ex) {
                    reject("============================================ERORR=========================="+ex);
                }
            
            });

                   
        
          
        }  
    },{
        key: 'deleteIndex',
        value: function deleteIndex() {
            //console.log('deleteIndex in selasticsearch');   
            client.indices.delete({
            index: 'library',
            ignore: [404]
            }).then(function (body) {
            console.log('index was deleted or never existed');
            }, function (error) {
            });           
        }
    }, {
        key: 'createIndex',
        value:function createIndex(index,type,data) {
                         console.log("==================create INDEX==========================");
                  console.log('index_create');
                // const bulkIndex = function bulkIndex(index, type, data) {
                    let bulkBody = [];
                
                    data.forEach(item => {
                    bulkBody.push({
                        index: {
                        _index: index,
                        _type: type,
                        _id: item.id
                        }
                    });
                
                    bulkBody.push(item);
                    });
                
                client.bulk({body: bulkBody})
                    .then(response => {
                    let errorCount = 0;
                    response.items.forEach(item => {
                        if (item.index && item.index.error) {
                        console.log(++errorCount, item.index.error);
                        }
                    });
                    console.log(
                        `Successfully indexed ${data.length - errorCount}
                        out of ${data.length} items`
                    );
                    })
                    .catch(console.err);
              // };

      
        }
    }, {
        key: 'getIndexData',
        value:async function getIndexData(req,res) {
            console.log("==================get Index DATA==========================");
          const articlesRaw = await fs.readFileSync('./data.json');
          const articles = JSON.parse(articlesRaw);
         // console.log(`${articles.length} items parsed from data file`);
        //  this.bulkIndex('library', 'article', articles);
          this.createIndex('library', 'article', articles);
        }
    }, {
        key: 'getModal',
        value: function getModal(req,res) {
          
        }
    },{
        key: 'admin',
        value: function admin(req,res) {
           
        }
    },{
        key: 'listen',
        value: function listen() {
        
             
        }
    }, {
        key: 'insert',
        value: function insert(req,res) {
           
              
            
        }
    }]);

    return search;
}();

module.exports= search;

