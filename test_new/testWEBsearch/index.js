var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
var Engine = require('./search.js');
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
var searchEngine = new Engine();   
var server = function () {
  


    function  server() {
      
        this.app = app;
       
        this.config();
        this.index = this.index.bind(this);
        this.listen =this.listen.bind(this);
        this.search =this.search.bind(this);
        this.createIndex = this.createIndex.bind(this);
        this.listen(); 
        
        this.app.get('/createIndex',this.createIndex);
        this.app.get('/',this.index);
        this.app.post('/search',this.search);
        this.app.get('/deleteIndex',this.deleteIndex);
      


      
        
    }
    
    _createClass(server, [{
        key: 'index',
        value:function index(req,res) {
              res.sendfile(__dirname+"/view/index.html");
        }  
    },  {
        key: 'config',
        value: function config() {
               
            this.app.use(express.static(__dirname + '/view/'));
            this.app.use(bodyParser.urlencoded({
                extended: false
            }))
            this.app.set('views', __dirname + '/view');
            this.app.engine('html', require('ejs').renderFile);
            this.app.set('view engine', 'html');
            this.app.use(bodyParser.json());

        }
    }, {
        key: 'search',
        value:async function search(req,res) {
            console.log('___searchIndex___');
            //console.log(req.body);
            var data =await searchEngine.searchIndex(req.body.param);
         
            res.send(data);
            res.end('200');
        
      
        }
    }, {
        key: 'deleteIndex',
        value: function deleteIndex(req,res) {
            console.log("___deleteIndex____");
            searchEngine.deleteIndex();
            res.send('200');

        
        }
    }, {
        key: 'createIndex',
        value: function createIndex(req,res) {
              console.log("______createIndex_____");
              searchEngine.getIndexData();
               res.send('200');
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
           this.app.listen(process.env.PORT || 8000,function(req,res){
                    console.log("server start");
             });
             this.config();
             
        }
    }, {
        key: 'insert',
        value: function insert(req,res) {
           
              
            
        }
    }]);

    return server;
}();

module.exports= server;
new server();
