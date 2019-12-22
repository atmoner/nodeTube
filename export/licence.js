exports.hello = function(userName,licenceKey) {

	var licenseKey = require('nodejs-license-key');

	var userInfo = {
	  name: userName
	  /*street: 'Taipei 101',
	  city: 'Taipei',
	  state: 'Taiwan',
	  zip: '100'*/
	};

	var userLicense = {
	  info: userInfo,
	  prodCode: 'nodeTube',
	  appVersion: '1.0'
	};

	if (!store.get('masterPass')) {
		try {
		  var license = licenseKey.createLicense(userLicense)
		  console.log(license.license);
		  store.set('user',userName);
		  store.set('masterPass',license.license);
		  $("#addKey").click(function(e){
		     	console.log('Add key! =)');	 
		  });		  
		  $('#pass').val(license.license);
		  $('#showLicence').show();
		  $('#userName').hide();

		} catch(err) {
		  console.log(err);
		}
	} 
  // return licenceKey;
}

exports.checkKey = function(userName,licenceKey) {


		var licenseKey = require('nodejs-license-key');

		var userInfo = {
		  name: userName
		  /*street: 'Taipei 101',
		  city: 'Taipei',
		  state: 'Taiwan',
		  zip: '100'*/
		};

		var userLicense = {
		  info: userInfo,
		  prodCode: 'nodeTube',
		  appVersion: '1.0'
		};

		try {
		  var license = licenseKey.validateLicense(userLicense,licenceKey);
		  if (license.message === 'ok') {
			console.log(license.message);
			$('#licenceValid').show();
		  } 
			
		  
		} catch(err) {
		  //console.log(err);
		$('#licenceInvalid').show();
		} 
}
