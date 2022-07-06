const canvas = document.querySelector('.boids');
// const canvas2DContext = canvas.getContext('2d'); 

// https://stackoverflow.com/questions/5484578/how-to-get-document-height-and-width-without-using-jquery
canvas.width = window.innerWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.body.clientHeight;

var boids = 50;
