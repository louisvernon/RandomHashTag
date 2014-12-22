// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!

  var command
  function get_headers () {
	//console.log(req.readyState);
	if(req.readyState == 4)
	{
		return;
	}
  	var headers = req.getAllResponseHeaders().toLowerCase();
        //console.log(headers);
	//console.log(req.responseURL);
	var text = req.responseURL;
	if(text.length < 2)
	{
		return;
	}
	var res = text.split("/");
	text = res[res.length-1]
	res = text.split("(");
	text = res[0];
	text = decodeURIComponent(text);
	text = "#".concat(text.replace(/[\W_]+/g,""));
	command = 'document.execCommand("insertHTML", true, "'.concat(text, '");');
	//console.log(text);
	//console.log(command);
	
	chrome.tabs.executeScript({
//    code: 'document.body.style.backgroundColor="red"'
//     code: 'document.execCommand("insertHTML", false, ' + text + ')'
		code: command
  	});

  }	

//  console.log('Turning ' + tab.url + ' red!');
  var req = new XMLHttpRequest();
  req.onreadystatechange = get_headers;
  req.open('HEAD', "http://en.wikipedia.org/wiki/Special:Random", true);
  req.send();
  

});
