// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.




function removeItem() {

}

function clearElementList() {
  $('.hideList').html('');
  localStorage.removeItem('currentList');
}


function loadElementList() {
    var loadedList = JSON.parse(localStorage.getItem('currentList'));

    if (! loadedList) {
      return;
    }

    for (var key in loadedList) {
      console.log('Test', key);
        var checked = '';
        if (loadedList[key]) {
            checked = 'checked';
        }

        $('.hideList').append('<li><input type="checkbox" '+ checked +'/><span class="uniqueName">'+ key +'</span><span class="right">X</span></li>');
    }


    console.log('The Loaded List', loadedList);

    return loadedList;
}

function saveElementList() {


      tmpObj = {};

      $('.hideList li').each(function() {
        
        var foundId = $(this).find('.uniqueName').text();
        var checked = $(this).find('[type="checkbox"]').is(':checked');

        tmpObj[foundId] = checked;


      });

      console.log('Current Obj:', tmpObj);

      // Save it using the Chrome extension storage API.
      localStorage.setItem('currentList', JSON.stringify(tmpObj));
}

$(function() {
  //Load our current list from localStorage
  var loadedList = loadElementList();

  if (typeof loadedList == 'undefined') {
    loadedList = [];
  }

  $('.addBtn').on('click', function () {

    //Return false if no element was supplied.
    if (! $('.addText').val()) {
      return false;
    }

    //Check if we already have this in our current temp list.
    if (typeof loadedList != 'undefined' && $('.addText').val() in loadedList) {
      alert('This element is already in your list');
      return;
    }

    //Append our new element to the list.
    $('.hideList').append('<li><input type="checkbox" /><span class="uniqueName">'+ $('.addText').val() +'</span><span class="right">X</span></li>');

    $('.hideList li').last().find('.right').on('click', function() {  
      $(this).parent().remove();
      //Save the current list.
      saveElementList();
  });

    //Add our new value to our temp list for re-check
    loadedList[$('.addText').val()] = false;

    //Save the current list.
    saveElementList();

  });

  $('.clearList').on('click', function () {
      clearElementList();
  });

  <!-- TODO: Save to memory that we are checking an element so it stays on re-open -->
  $('[type="checkbox"]').on('change', function () {

  });

  $('.right').on('click', function() {
    
    $(this).parent().remove();

    //Save the current list.
    saveElementList();

  });

  $('.hideIt').on('click', function () {

    elementArray = [];

    $('[type="checkbox"]:checked').each(function () {
        elementArray.push($(this).parent().find('.uniqueName').text());
    });

    //Send off query to backend with element names
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {elements: JSON.stringify(elementArray)}, function(response) {
        //Response
      });
    });
  });


})
