/*
 * Copyright (c) 2015 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var client;
var currentImg = null;
var init = function() {

  var iwcCallback = function(intent) {
    // define your reactions on incoming iwc events here 
    console.log(intent);
    if (intent.action == "openImage") {
       openImage(intent.data);
    }
  };

  client = new Las2peerWidgetLibrary("http://localhost:8086", iwcCallback);
  openImage('{"id":"2","url":"https://www.test.de/file/image/23/55/51886c48-7ecc-4758-ae1b-49cce5c47a73-web/5030775_tdw_arbeitseinkommen_absichern_290.jpg"}');
  $('#postComment').on('click', function() {
    //start parameter initiation

    //end parameter initiation
    postComment();
  })
  $('#commentText').on('click', function() {
    //start parameter initiation

    //end parameter initiation
    enterTextarea();
  })


}

// openImage
var openImage = function(imageJsonString){

//start variable declaration
    var imageJson = JSON.parse(imageJsonString);  
    currentImg = imageJson.id;
    var imageElement = $('<img src="'+imageJson.url+'"/>')
//end variable declaration


  $("#imageContainer").html(imageElement);
  //Additional own javascript 
  loadComments(imageJson.id);

}

// enterTextarea
var enterTextarea = function(){
//start variable declaration
//end variable declaration

    $("#commentText").val("");
    //$("#commentText").html("");

}

// postComment
var postComment = function(){

//start variable declaration

//end variable declaration

   var commentJson = null; 
   commentJson = JSON.stringify({ 
     text : $("#commentText").val() 
   });
  client.sendRequest("PUT", "tagging/comments/"+currentImg, commentJson, "application/json", {}, false,
  function(data, type) {
    loadComments();
    //Also update the html element?
    $("#commentText").html("Write your comment");
  },
  function(error) {
    //your own javascript
    $("#commentText").html("Error while sending comment: " + e.message);
  });
  
  $("#commentText").html("Sending comment..");
  //Additional own javascript

}

// loadComments
var loadComments = function(){
  $("#spinner").show();
//start variable declaration

//end variable declaration

  client.sendRequest("GET", "tagging/comments/"+currentImg, "", "", {}, false,
  function(data, type) {
    console.log(data);
    var comments = data.comments.map( function(comment){ 
        return $("<div id='cmt'/>").html(comment.text); 
    }); 
    $("#spinner").hide();
    $("#comments").html(comments);
  },
  function(error) {
    console.log(error);
    $("#spinner").hide();
    $("#comments").html("Updated Element");
  });
  
  $("#comments").html("Updated Element");
  //Additional own javascript

}

// addTag
var addTag = function(){

//start variable declaration

//end variable declaration

   var tagJson = null; 
  tagJson = JSON.stringify({ 
    name : $("#tag").val(); 
  });
  client.sendRequest("PUT", "tagging/tags/"+currentImg, tagJson, "application/json", {}, false,
  function(data, type) {
    console.log(data);
  },
  function(error) {
    console.log(error);
  });
  
  //Additional own javascript

}


$(document).ready(function() {
  init();
});
