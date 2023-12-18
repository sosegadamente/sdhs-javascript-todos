// const n = 10;
// let n = 10;
// var n = 10;

// 원시형, 참조형  

/*
  원시형 : 문자, 숫자, boolean, null, undefined 
  참조형 : Array, Object
*/ 

// undefined 내가 선언을 안했을 안했어 
// null 내가 선언은했는데 빈값이야 

// const todos = [
//   {
//     name:'1',
//     checked:false,
//     edit:false,
//   },
//   {
//     name:'2',
//     checked:true,
//     edit:false,
//   },
//   {
//     name:'3',
//     checked:false,
//     edit:true,
//   }
// ]
// const a = [];

// a[0] = 5;


// console.log(a);

// const nameA = '홍의준';
// const nameB = '정재훈';

// const array = [
//   {
//     name:nameA
//   },
//   {
//     name:nameB
//   }
// ];

// a[0] = 5;

// console.log(a);

// console.log(array)

// // console.log(array[1]);

// const row = ['사망플래그','도서','50,000','300','재고없음'];

// const rowA = {
//   title:'사망플래그'
// };

/* 
 dom 
*/ 

// const $div = document.createElement('div');

// document.body.append($div);

// // $div.textContent = '312u231o23718123789123'

// console.dir($div);

// const $h1 = document.querySelector('h1');
// const $lis = [...document.querySelectorAll('.todo-list li')];

// $lis[0].className = '1 2 3 4'
// $lis[0].classList.add('5');
// $lis[0].classList.remove('2');

// console.log($lis[0].classList);

// // textContent, classList 

// // 텍스트를 추가, 클래스를 추가, 
// // 이벤트

// $div.addEventListener('click',function(){
//   console.log('클릭햇어')
// })


// const $todoList= document.querySelector('.todo-list');

// const $checkbox = document.querySelectorAll('[type=checkbox]')[1];
// $checkbox.checked = false

// // if($checkbox.checked = true) {
  
// // }

// const $input = document.createElement('input');
// // $input.type = 'text'
// // $input.value = '123971233897123'
// // $input.style.border = '1px solid black'

// $input.addEventListener('input',function(){
//   $input.value = '';
//   console.log('32132');
  
// })

// $input.addEventListener('keydown',function(event){
//   console.log(event);
//   if(event.code === 'Enter'){  
//     console.log(1);
//     const $li = document.createElement('li');
//     $li.textContent = $input.value;
//     $todoList.append($li);

//     $input.value = '';

//   }
// })

// const $todoApp = document.querySelector('.todoapp');


// // $toodApp.append($input);
// document.body.append($input);

// // 12월 11일

// // const lineInList = () => {
// //   const toggle = document.getElementsByClassName('toggle')
// //   if(toggle.checked) {
// //     console.log(12);
// //   }
// // }

const new_todo = document.querySelector('.new-todo')
const todo_list = document.querySelector('.todo-list')
const todo_count = document.querySelector('.todo-count')

new_todo.addEventListener('keyup', function(event){
  if (event.code === 'Enter') {
    
    //Use innerHTML Instead of document.querySelector(".class")
    //It Will Make The Codes More Simple
    const newTodoList = document.createElement('li')
    newTodoList.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${new_todo.value}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" type="text" />
    `
    //querySelector From The innerHTML
    const view = newTodoList.querySelector('.view');
    const checkbox = newTodoList.querySelector('.toggle')
    const label = newTodoList.querySelector('label')
    const btnDestroy = newTodoList.querySelector('.destroy')

    //MARK AS FINISHED
    checkbox.addEventListener("change", function(){
      console.log("change");
      // checkbox.classList.add("completed")
      console.log(checkbox.checked);
      if (checkbox.checked == true) {
        newTodoList.classList.add("completed")
      } else {
        newTodoList.classList.remove("completed")
      }
    })

    //EDIT TODOLIST
    label.addEventListener("dblclick", function() {
      console.log("dblclick");

      newTodoList.classList.add("editing")     
    })

    //DELETE TODOLIST
    btnDestroy.addEventListener("click", function(){
      console.log("click");
      btnDestroy.parentElement.remove()
    })

    todo_list.append(newTodoList)
    newTodoList.append(view)
    new_todo.value = ''
  } 
});



// function createTodoItem(text){
//   const $todoItem = document.createElement('li');
//   const $todoItemView = document.createElement('div');
//   $todoItemView.className = 'view';

  
//   $todoItem.append($todoItemView);
//   return $todoItem;
// }
// const $todoItem = createTodoItem()