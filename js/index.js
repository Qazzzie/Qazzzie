let app = document.querySelector('#about');
let bio = "I'm a programmer who enjoys cooking and being acive in my free time. I have a degree in biochemistry and am now studying computer science to pursue a career in bioinformatics or software engineering related field. I prefer the tech side of things and have found my passion for coding and design. I enjoy the creative power that programming gives. I have experience creating simple machine learning models to predict classification of test data. Web development is fun because it's an interactive experience as one sculpts the page. I hope to obtain an internship where I can learn more about the industry and get more experience from the work environment.";  

const printAbout = () => {
  const addLetterToDom=(charToAdd)=>{
    console.log("Adding letter to Dom");
    let letter = document.createElement('span');
    letter.className ="highlight";
    letter.textContent = charToAdd;
    app.append(letter);
  }

  for(var i = 0; i < bio.length; i++){
    addLetterToDom(bio.charAt(i));
  } 
};

printAbout();
