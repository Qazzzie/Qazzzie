// https://stackoverflow.com/questions/13270290/how-to-execute-code-before-window-load-and-after-dom-has-been-loaded
// let body = document.querySelector('.head');
// document.onreadystatechange = function(e)
// {
//     if (document.readyState === 'complete')
//     {
//         //dom is ready, window.onload fires later
//         let img = document.createElement("img");
//         img.setAttribute('style', 'position:absolute; textAlign:center; top:50%; left:50%; width:10%;'); 
//         img.setAttribute('class', 'loadingAnimation'); 

//         img.src = '../images/loading.gif';
//         body.appendChild(img);
//     }
// };
// window.onload = function(e)
// {
//     //document.readyState will be complete, it's one of the requirements for the window.onload event to be fired
//     //do stuff for when everything is loaded
//     // body.removeChild(img)
//     let loadAnimation = document.querySelector('.loadingAnimation');
//     loadAnimation.parentNode.removeChild(loadAnimation);
// };
	
// https://smallenvelop.com/display-loading-icon-page-loads-completely/
//add jquery to html page. CSS loader
$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});