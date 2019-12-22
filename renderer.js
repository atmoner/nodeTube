// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var $ = require("jquery");



const Store = require('electron-store');
const store = new Store();

const myModule = require('./export/licence');



const yt = require('./export/youtube');
let ytVal = yt.youTube(); // val is "Hello"  

//console.log(ytVal);

function runMasterPass() {
	if (!store.get('masterPass')) {
		$(function() {
			var modal = UIkit.modal("#masterPass",{'bgClose':false});
			modal.show(); 
		});


		$("#addPass").click(function(e){

			let val = myModule.hello($('#userName').val(),$('#pass').val()); // val is "Hello"  
			//store.set('masterPass',$('#pass').val());
			console.log($('#pass').val());
	 
		 //$(this).attr('disabled',true);
		 //$("#addPass").text('Master pass ajouté!');
		 $("#addPass").hide();
		 $("#addKeyButton").show();
		 //location.reload();
	 
		});
	} else {
		myModule.checkKey(store.get('user'),store.get('masterPass')); // val is "Hello"  
	}
}

runMasterPass();
//console.log(store.get('masterPass'));

