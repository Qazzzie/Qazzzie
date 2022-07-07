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




/** travel.js - Determination of travel direction
 * http://reluk.ca/project/Web/test/travel_direction/
  *https://stackoverflow.com/questions/20899274/how-to-refresh-page-on-back-button-click
  * Synchronized with `https://stackoverflow.com/a/49329267/2402790`, q.v. for further comments.
  */
 'use strict';
 console.assert( (eval('var _tmp = null'), typeof _tmp === 'undefined'),
   'Failed assertion: Strict mode is in effect' );
   // http://www.ecma-international.org/ecma-262/6.0/#sec-strict-mode-code
   // Credit Noseratio, https://stackoverflow.com/a/18916788/2402790
 ( function()
 {
 
 
     function reorient() // After travelling in the history stack
     {
         const positionLastShown = Number( // If none, then zero
           sessionStorage.getItem( 'positionLastShown' ));
         let position = history.state; // Absolute position in stack
         if( position === null ) // Meaning a new entry on the stack
         {
             position = positionLastShown + 1; // Top of stack
 
             // (1) Stamp the entry with its own position in the stack
             history.replaceState( position, /*no title*/'' );
         }
 
         // (2) Keep track of the last position shown
         sessionStorage.setItem( 'positionLastShown', String(position) );
 
         // (3) Discover the direction of travel by comparing the two
         const direction = Math.sign( position - positionLastShown );
         console.log( 'Position ' + position );
         console.log( 'Travel direction is ' + direction );
           // One of backward (-1), reload (0) and forward (1)
        if(direction == -1 || direction == 1)
        {
            // reloading resets the animation
            $(".se-pre-con").fadeOut("slow");
 
            // console.log('Reloading to reset loading animation from navigation arrows');
            // location.reload();
        }

     }
 
 
 
     addEventListener( 'pageshow', reorient );
     addEventListener( 'popstate', reorient ); // Travel in same page
 
 
 
 }());

//  must happen after checking direction of navigation, otherwise animation stays permenent
 $(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
});

// $(window).pushstate(function() {
//     // Animate loader off screen
//     // $(".se-pre-con").fadeOut("slow");
//     console.log('Reloading');
// });

// window.addEventListener('popstate', (event) => {
//     console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
//   });
// window.onload = function(e)
// {
//     //document.readyState will be complete, it's one of the requirements for the window.onload event to be fired
//     //do stuff for when everything is loaded
//     // body.removeChild(img)
//     $(".se-pre-con").remove();

// };

// $(window).onunload(function() {
//     // Animate loader off screen
//     $(".se-pre-con").fadeOut("slow");
// });

// $(window).onbeforeunload(function() {
//     // Animate loader off screen
//     $(".se-pre-con").fadeOut("slow");
// });
