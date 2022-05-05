var i=1, j=1;
reco=false;
var started=false;
function restore(){
	$("#record, #live").removeClass("disabled");
	$(".one").addClass("disabled");
	if (reco==true) Fr.voice.stop();
	$(".hidden").hide(500); 
	
}
$(document).ready(function(){
	
	navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if((M[1]=== 'Chrome')||(M[1]=== 'Firefox')||(M[1]=== 'Opera')){
        reco=true; // reco says if recording is available in the current browser
    }
	
	else{
		reco=false;
		$("#play").hide();
		$("#download").hide();
        $("#browser").show();
    }
})();
	

	var n, transcript;
	iMax=3;

	
  $(document).on("click", "#record:not(.disabled)", function(){
    elem = $(this);
	n = document.getElementById("select").value; //selected test
	$("#answers").load("/speaking/audio/test"+n+".txt");
	
	document.getElementById("select").disabled = true;
	$(".buttonG").removeClass("disabled");
	
	if (n==1) 
	{	
		iMax=6; //number of questions in the 1st part +1
		document.getElementById("card").innerHTML='<p>Describe someone who is important to you. You should say:</p> <ul><li>Who is that person</li><li>How long do you know each other</li><li>How did you meet</li></ul><p>and say why is that person is important to you.</p>'
	}
	if (n==2) 
	{
		 iMax=8;
		 document.getElementById("card").innerHTML='<p>Describe your favourite gadget. You should say:</p><ul> <li>What is it</li><li>When did you get it</li> <li>How often do you use it</li></ul> <p>and say why is it so important to you.</p>';
	}
	if (n==3) 
	{
		 iMax=6;
		 document.getElementById("card").innerHTML='<p>Describe your favourite weather. You should say:</p><ul> <li>What this weather is like</li><li>Why do you like it</li> <li>Where you can exprerience such weather conditions.</li></ul> </p>';
	}
	if (n==4) 
	{
		 iMax=7;
		 document.getElementById("card").innerHTML='<p>Describe a famous place that you visited. You should say:</p><ul> <li>When you visited it</li><li>Where is it situated</li> <li>Who you went with</li></ul> and say what about it you liked the most.</p>';
	}
	
	
	//document.getElementById("show-questions").innerHTML="Show speaking test "+n+"questions";
	//document.getElementById("questions").innerHTML=file_get_contents("/speaking/speaking-questions-"+n+".html");
	
	$("#examiner").animate({opacity: 1}, 200);
	$(".audioMargin1").animate({opacity: 1}, 200);
	elem.addClass("disabled");
	$(".one").removeClass("disabled");
	$("#examiner").attr({ src:"/speaking/audio/q"+n+"1.mp3"} );
	$("#examiner")[0].play();
	i++;
	
	
	
	if (reco==true) {
			Fr.voice.record($("#live").is(":checked"), function(){
			  //elem.addClass("disabled");
			  $("#live").addClass("disabled");
			  //$(".one").removeClass("disabled");
			  //$("#examiner").attr({ src:"/speaking/audio/q"+n+"1.mp3"} );
			   //$("#examiner")[0].play();
			   $(".loading").show();
			   //i++;
			   
			   
			   if(navigator.getUserMedia) {
                navigator.getUserMedia({
                    audio: true,
                }, onSuccess, onError);
            } else {
				document.getElementById("webrtc").innerHTML='You should enable recording in your browser: go to <a href="chrome://flags">chrome://flags</a> and click "Enable API".';
                //console.log("GetUserMedia not supported");
            } 
            function onSuccess() {
                //console.log("GetUserMedia success");
            }
            function onError() {
				document.getElementById("webrtc").innerHTML='You should enable recording in your browser: go to <a href="chrome://flags">chrome://flags</a> and click "Enable API".';
                //console.log("getUserMedia not supported");
            }
			   
			   
			   
			});
	}
  });
  
  /*$(document).on("click", "#stop:not(.disabled)", function(){
    restore();
  });*/
  
  $(document).on("click", "#next:not(.disabled)", function(){
	  if (i<iMax) {
	$("#examiner").attr({ src:"/speaking/audio/q"+n+i+".mp3"} );
	$("#examiner")[0].play();
	i++;}
	else { 
		secondsection();
	}
  });
  
  function secondsection(){
	  if (j>=2)
	  {
		  clearTimeout(myVar);
		  $(".hidden").hide(200);
		  $("#examiner").attr({ src:"/speaking/audio/s"+n+j+".mp3"} );
		  $("#examiner")[0].play();
		  j++;
	  }
	  
	  if (j<2) {
		 $("#examiner").attr({ src:"/speaking/audio/s"+n+"1.mp3"} );
		$(".hidden").show(1500);
		$("#examiner")[0].play();
		j++;
		myVar=setTimeout(timeUp, 100000);
	  }
 }
  
  function timeUp() {
	  $("#examiner").attr({ src:"/speaking/audio/s"+n+"2.mp3"} );
		$("#examiner")[0].play();
		j++;
  }

  

  $(document).on("click", "#stop:not(.disabled)", function(){
    //restore();
	
	//$("#show-questions").show();
	//$("#questions").show();
	//document.getElementById("show-questions").innerHTML="Hide speaking test "+n+"questions";
	
	$(".loading").hide();
	$("#stop").addClass("disabled");
	$("#next").addClass("disabled");
	$("#play").removeClass("disabled");
	document.getElementById("select").disabled = false;
	if (reco==true) {
		  $("#audio").animate({opacity: 1}, 200);
		  $(".audioMargin2").animate({opacity: 1}, 200);
		 
	}
	else $("#record").removeClass("disabled");
  });
  
  
  $(document).on("click", "#play:not(.disabled)", function(){
	 
	 
	$(".loading").hide();  
	document.getElementById("select").disabled = false;
    Fr.voice.export(function(url){
      $("#audio").attr("src", url);
	  $("#play").removeClass("disabled");
	  $("#download").removeClass("disabled");
	  $("#audio").animate({opacity: 1}, 200);
	  $(".audioMargin2").animate({opacity: 1}, 200);
      $("#audio")[0].play();
    }, "URL");
  });
  
  
   $(document).on("click", "#continue:not(.disabled)", function(){
    Fr.voice.export(function(url){
      $("#audio").attr("src", url);
      $("#audio")[0].play();
    }, "URL");
  });
  
  $(document).on("click", "#download:not(.disabled)", function(){
	$(".loading").hide();
	document.getElementById("select").disabled = false;
    Fr.voice.export(function(url){
      $("<a href='"+url+"' download='speaking-recording.wav'></a>")[0].click();
    }, "URL");
  });
  
  $(document).on("click", "#close", function(){ 
  $("#popupContact").hide();
  $("#sheet").hide();
  });
  
  
  // show pop-up form
  $(document).on("click", "#popup", function(){
	$("#popupContact").show();
	$("#sheet").show();
	
	/*
    Fr.voice.export(function(url){
	 document.getElementById("popup-url").value=url;
		//$("<audio src='"+ url +"'></audio>").appendTo("#popup-url");
      //$("<a href='"+url+"' download='MyRecording.wav'></a>")[0].click();
    }, "URL");*/
	
		//Fr.voice.export(function(blob){
		  //var data = new FormData();
		  //data.append('file', blob);
		 /* 
		  $.ajax({
			url: "/server.php",
			type: 'POST',
			data: data,
			contentType: false,
			processData: false,
			success: function(data) {
			  // Sent to Server
			}
		  });
		}, "blob");		*/
	
	
  });
  
  
  
  // validating form
    $("#form").submit(function() {	  
	  	/*var form_data=$(this).serialize();
		
	  	$.ajax({
			type:"POST",
			url: "/sendEmail.php",
			data: form_data,
			success: function() { alert("Your recording is sent for correction! We'll contact you soon.");},
			
		});*/
	

		$("#popupContact").hide();
  		$("#sheet").hide();
    });
 
  
 $(document).on("click", "#b:not(.disabled)",   function() {
				   var e = document.getElementById("answers");
				   if(e.style.display == 'block')
				   {
					  document.getElementById("b").innerHTML=' <img height="25px" src="/images/show.png" style="vertical-align: middle"  /> Show transcript';
					  e.style.display = 'none';
				   }
				   else 
				   {
					  document.getElementById("b").innerHTML='<img height="25px" src="/images/hide.png" style="vertical-align: middle"  /> Hide transcript';
					  e.style.display = 'block';
				   }
			   });
			   
  
  
  // ----------- base 64 and mp3 --------------
  $(document).on("click", "#base64:not(.disabled)", function(){
    Fr.voice.export(function(url){
      console.log("Here is the base64 URL : " + url);
      alert("Check the web console for the URL");
      
      $("<a href='"+ url +"' target='_blank'></a>")[0].click();
    }, "base64");
    restore();
  });
  
  $(document).on("click", "#mp3:not(.disabled)", function(){
    alert("The conversion to MP3 will take some time (even 10 minutes), so please wait....");
    Fr.voice.export(function(url){
      console.log("Here is the MP3 URL : " + url);
      alert("Check the web console for the URL");
      
      $("<a href='"+ url +"' target='_blank'></a>")[0].click();
    }, "mp3");
    restore();
  });
});