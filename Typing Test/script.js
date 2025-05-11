const words='in one good real one not school set they state in one good real one because school set they state'.split(' ');
const wordsCount=words.length;

function addClass(el,name){
    if (el) {
        el.classList.add(name);
    }
}
function removeClass(el,name){
    if (el) {
        el.classList.remove(name);
    }
}

function randomWord(){
    const randomIndex = Math.floor(Math.random() * wordsCount);
    return words[randomIndex];
}
function formatWord(word){
    return `<div class=words><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
    const wordsContainer = document.querySelector('.words'); // ✅ Fix 2
    wordsContainer.innerHTML = ''; 

    let wordsHtml = '';
    for (let i=0;i<200;i++){
        wordsHtml += formatWord(randomWord()) + ' ';
    }
    wordsContainer.innerHTML=wordsHtml.trim();
    addClass(document.querySelector('.words'),'current');
    addClass(document.querySelector('.letter'),'current');
};

document.querySelector('.game').addEventListener('keyup',(ev)=>{
    const key=ev.key;
    const currentWord=document.querySelector('.words.current');
    const currentLetter=document.querySelector('.letter.current');
    const expected=currentLetter?.innerHTML || ' ';
    const isLetter=key.length===1 && key !==' ';
    const isSpace = key ===' ';

    console.log({key,expected});
    
    if(isLetter){
        if(currentLetter){
            addClass(currentLetter,key===expected ? 'correct': 'incorrect');
            removeClass(currentLetter,'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling,'current');
            }
        }
    }
    if(isSpace){
        if(expected !==' '){
            const lettersToInvalidate=[...document.querySelectorAll('.words.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter=>{
                addClass(letter,'incorrect');
            });
        }
        removeClass(currentWord,'current');
        if (currentWord.nextSibling) {
            addClass(currentWord.nextSibling, 'current');
        }
        if(currentLetter){
            removeClass(currentLetter,'current');
        }
        if (currentWord.nextSibling.firstChild) {
            addClass(currentWord.nextSibling.firstChild, 'current');
        }
    }

})
newGame();