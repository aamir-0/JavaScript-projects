const xhr=new XMLHttpRequest(); 

xhr.addEventListener('Load',()=>{
    console.log('Response received:',xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();
