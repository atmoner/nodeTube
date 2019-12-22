exports.youTube = function() {

	const fs = require('fs');
	const youtubedl = require('youtube-dl');

	$("#startDl").click(function() {
	  console.log('Start DL:');

		$("#succesDl").hide();
		$("#spinner").show(); 
		$("#succes").hide(); 
		$("#returnImg").empty();
		$("#title").empty();
		$("#id").empty();

	const output = 'myvideo.mp4'
	 
	let downloaded = 0
	 
	if (fs.existsSync(output)) {
	  downloaded = fs.statSync(output).size
	}
	 
	const video = youtubedl($("#ytUrl").val(),
	 
	  // Optional arguments passed to youtube-dl.
	  ['--format=18'],
	 
	  // start will be sent as a range header
	  { start: downloaded, cwd: __dirname })
	 
	// Will be called when the download starts.
	video.on('info', function(info) {
	    console.log('Debut du téléchargement')
	    console.log('Nom du fichier: ' + info._filename) 

		$("#spinner").hide(); 
		$("#returnImg").append("<img width='200' height='100' src="+info.thumbnail+">");
		$("#title").append(info._filename);
		$("#id").append('Video ID: '+__dirname);
	 
	  // info.size will be the amount to download, add
	  let total = info.size + downloaded
	  console.log('size: ' + total)
	 
	  if (downloaded > 0) {
		// size will be the amount already downloaded
		console.log('resuming from: ' + downloaded)
	 
		// display the remaining bytes to download
		console.log('remaining bytes: ' + info.size)
	  }
	})
	 
	video.pipe(fs.createWriteStream(output, { flags: 'a' }))
	 
	// Will be called if download was already completed and there is nothing more to download.
	video.on('complete', function complete(info) {
	  'use strict'
	  console.log('filename: ' + info._filename + ' already downloaded.')
	})
	 
	video.on('end', function() {
	  console.log('finished downloading!');
		$("#succesDl").show();
		$("#path").append('La video se trouve ici: '+__dirname);
	})




	});

	$("#start").click(function() {
		$("#spinner").show(); 

		$("#succesDl").hide();
		$("#succes").hide(); 
		$("#returnImg").empty();
		$("#title").empty();
		$("#id").empty();


		const url =  $("#ytUrl").val();
		// Optional arguments passed to youtube-dl.
		const options = ['--username=user', '--password=hunter2']
		 
		youtubedl.getInfo(url, options, function(err, info) {
		  if (err) throw err
		 
		  console.log('id:', info.id)
		  console.log('title:', info.title)
		  console.log('url:', info.url)
		  console.log('thumbnail:', info.thumbnail)
		  console.log('description:', info.description)
		  console.log('filename:', info._filename)
		  console.log('format id:', info.format_id)
		   
		$("#succes").show();
		$("#spinner").hide(); 


		$("#returnImg").append("<img width='200' height='100' src="+info.thumbnail+">");
		$("#title").append(info.title);
		$("#id").append('Video ID: '+info.id);
		 

		})


	});

}
