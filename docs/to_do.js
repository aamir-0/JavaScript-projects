//have to add keydown selector for add and delete button for delete use querySelectAll
const todolist=[
        ];
       // const tododate=[];

       document.querySelector('.js_addbutton').addEventListener("click",()=>{
        addfun();
       })

        document.querySelector('.js_input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addfun();
  }
});//to take input by pressing the enter key

   function renderhtml() {
    const dis_obj = document.querySelector(".display_list");
    let todohtml = [];

    function pushfun(item, i){
       todohtml.push(
      `<div>${item.name}</div>
       <div>${item.date ? item.date : ''}</div>
       <button class="del_btn" onclick="del(${i})">Delete</button>`
    );
    }
  
    todolist.forEach(pushfun);
    dis_obj.innerHTML = todohtml.join('');
}

function del(i) {
    todolist.splice(i, 1);
   // tododate.splice(i, 1);
    renderhtml();
}

function  addfun(){
    const temp = document.querySelector(".js_input");
    const name = temp.value;
    const date_obj = document.querySelector(".js_date");
    const date = date_obj.value;

    if(name===''){
      return null;
    }

    
//creating an obj then pushing it in the array bcuz our is made of object
    todolist.push({
      name,
      date
      /*or
      name:name
      date:date
      //since the variable name is same as property or arttributs of obj we can use above shorthand
      */
    });
    

    temp.value = '';
    date_obj.value = '';

    renderhtml();
}



