// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!

  var text;
  function get_headers () {
  	var headers = req.getAllResponseHeaders().toLowerCase();
        console.log(headers);
	console.log(req.responseURL);
	text = req.responseURL;
  }	

//  console.log('Turning ' + tab.url + ' red!');
  var req = new XMLHttpRequest();
  req.onreadystatechange = get_headers;
  req.open('HEAD', "http://en.wikipedia.org/wiki/Special:Random", true);
  req.send();
  

  chrome.tabs.executeScript({
//    code: 'document.body.style.backgroundColor="red"'
     code: 'document.execCommand("insertHTML", false, ' + text + ')'
  })
});
