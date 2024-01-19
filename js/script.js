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

function idx() {
  return Math.random();
};

const new_todo = document.querySelector('.new-todo')
const filters = document.querySelector('filters')
const todo_list = document.querySelector('.todo-list')
const toggleAll = document.querySelector('label');
const footer = document.querySelector('footer');


window.addEventListener('load', function(){
  isFooterVisible();
  isV_ToggleVisible();
});


//MAKE TODOLIST
new_todo.addEventListener('keyup', function(event){
  event.stopPropagation
  if (new_todo.value !== '') {
    if (event.code === 'Enter') {
      //Use innerHTML Instead of document.querySelector(".class")
      //It Will Make The Codes More Simple And Easy To Read
      const newTodoList = document.createElement('li')
      newTodoList.innerHTML = `
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label>${new_todo.value}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" type="text" />
      `

      //SELECTING THINGS FROM HTML
      const view = newTodoList.querySelector('.view');
      const checkbox = newTodoList.querySelector('.toggle')
      const label = newTodoList.querySelector('label')
      const btnDestroy = newTodoList.querySelector('.destroy')
      const editInput = newTodoList.querySelector('.edit')

      //WHEN YOU CLICK OTHER THEN 'editInput', PREVENT EVERY CHANGE
      editInput.addEventListener('blur', function() {
        if( editInput.value === "" ){
          newTodoList.remove();
          return;
        }

        //PLACEHOLDER
        label.textContent = editInput.value;
        newTodoList.classList.remove("editing")
      })
  
      //MARK AS FINISHED
      checkbox.addEventListener("change", function(){
        if (checkbox.checked == true) {
          newTodoList.classList.add("completed")
        } else {
          newTodoList.classList.remove("completed")
        }
        howManyItmes();
        noCompletedItems();
        vToggleChecked()
      })
  
      // EDIT TODOLIST
      label.addEventListener("dblclick", function() {
        editInput.value = label.textContent;
        newTodoList.classList.add("editing");

        const autoFocusing = document.querySelector('.editing > input')
        autoFocusing.focus();
      });      
      
      newTodoList.addEventListener("keydown", function(event) {
        if (event.code === 'Enter') {
          if (editInput.value !== "") {
            label.textContent = editInput.value;
            newTodoList.classList.remove("editing");
          } else {
            newTodoList.remove();
          }
        }
      });

  
      //DELETE TODOLIST
      btnDestroy.addEventListener("click", function(){
        btnDestroy.parentElement.parentElement.remove()
        howManyItmes();
        isFooterVisible();
        isV_ToggleVisible();
        noCompletedItems();
        vToggleChecked()
      })
  
      //MAKING TODOLIST
      todo_list.append(newTodoList)
      newTodoList.append(view)
      new_todo.value = ''

      howManyItmes();
      isFooterVisible();
      isV_ToggleVisible();
      noCompletedItems();
      vToggleChecked()
    }
  }     
});

function isFooterVisible() {
  const newTodoListItems = todo_list.querySelectorAll('li');
  if (newTodoListItems.length >= 1) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
}

function isV_ToggleVisible() {
  const newTodoListItems = todo_list.querySelectorAll('li');
  if (newTodoListItems.length >= 1) {
    toggleAll.style.display = 'block';
  } else {
    toggleAll.style.display = 'none';
  }
}


//DELETE COMPLETED TODOLIST
//used GPT
const clearCompleted = document.querySelector('.clear-completed');

clearCompleted.addEventListener('click', function () {
  const toggleCheckBoxes = document.querySelectorAll('.toggle');
  
  toggleCheckBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentElement.parentElement.remove();
    }
  });
  isFooterVisible();
  isV_ToggleVisible()
  noCompletedItems();
  vToggleChecked()
});

//HOW MANY ITEMS LEFT? (Strong Tag)
function howManyItmes() {
  const todo_count = document.querySelector('.todo-count > strong');
  const newTodoList = todo_list.querySelectorAll('li:not(.completed):not(.editing)');
  const $span = document.querySelector('.todo-count');
  const numLength = todo_count.innerHTML = newTodoList.length;  
  noCompletedItems();
  
  // CASE OF ONLY 1 ITEM LEFT
  if (newTodoList.length === 1) {
    $span.innerHTML = `<span class="todo-count"><strong>1</strong> item left</span>`
  } else {
    $span.innerHTML = `<span class="todo-count"><strong>${numLength}</strong> items left</span>`
  }
}
howManyItmes();

//MARK EVERYTHING AS DONE
function completeAll () {
  const newTodoList = todo_list.querySelectorAll('li:not(.completed):not(.editing)');
  const checkbox = document.querySelectorAll('.toggle')
  const vShapeToggle = document.querySelector('.toggle-all')

  newTodoList.forEach(function(todoItem) {
    checkbox.forEach((element) => {
      element.checked = true
    })
    
    todoItem.classList.add('completed');
    noCompletedItems();
  });

  //NEXT TIME WHEN YOU HIT THE TOGGLE, MAKE EVERYTHING MARK AS ACTIVE
  toggleAll.removeEventListener('click', completeAll)
  toggleAll.addEventListener('click', unCompleteAll)
  howManyItmes();
  vShapeToggle.checked = false;
};
//MARK EVERYTHING AS ACTIVE
function unCompleteAll(){
  const liComEdi = todo_list.querySelectorAll('.editing, .completed');
  const checkbox = document.querySelectorAll('.toggle')
  const vShapeToggle = document.querySelector('.toggle-all')

  liComEdi.forEach(function(todoItem) {
    checkbox.forEach((element) => {
      element.checked = false
    })
    
    todoItem.classList.remove('completed');
  });
  
  //NEXT TIME WHEN YOU HIT THE TOGGLE, MAKE EVERYTHING MARK AS DONE
  toggleAll.removeEventListener('click', unCompleteAll)
  toggleAll.addEventListener('click', completeAll)
  howManyItmes();
  vShapeToggle.checked = true;
}

function vToggleChecked () {
  const liComEdi = todo_list.querySelectorAll('.completed');
  const vShapeToggle = document.querySelector('.toggle-all')

  if(liComEdi.length != 0){
    if ([...liComEdi].every(item => item.classList.contains('completed'))) {
      vShapeToggle.checked = true
    } 
    // else if([...liComEdi].every(item => !item.classList.contains('completed'))) {
    //   vShapeToggle.checked = false;
    // }
    else {
      vShapeToggle.checked = false;
    }
  } else {
    vShapeToggle.checked = false
  }

}

toggleAll.addEventListener('click', completeAll)

//SELECTING ACTIVE/COMPLETED
const $all = document.querySelector('.filters li:nth-child(1) > a')
const $active = document.querySelector('.filters li:nth-child(2) > a')
const $completed = document.querySelector('.filters li:nth-child(3) > a')

//ALL, NOT HIDING EVERYTHING
$all.addEventListener('click', function(){
  const newTodoList = todo_list.querySelectorAll('li')
  newTodoList.forEach(function(isActive){
    isActive.classList.remove('hidden')
  })

})

//ACTIVE, SHOW ACTIVATED LIST ONLY
$active.addEventListener('click', activeOrNot)

function activeOrNot(){
  const newTodoList = todo_list.querySelectorAll('li');
  newTodoList.forEach(function(isActive){
    if(isActive.classList.contains('completed')){
      isActive.classList.add('hidden')
    } else {
      isActive.classList.remove('hidden')
    }
  })
}

//COMPLETED, SHOW COMPLETED LIST ONLY
$completed.addEventListener('click', completedOrNot)

function completedOrNot(){
  const newTodoList = todo_list.querySelectorAll('li')
  newTodoList.forEach(function(isCompleted){
    if(!isCompleted.classList.contains('completed')){
      isCompleted.classList.add('hidden');
    } else {
      isCompleted.classList.remove('hidden')
    }
  })
}

//FILTERS, IT MAKES THE 'A'TAG SELECTED
const $filters = [...document.querySelectorAll('.filters li a')];

window.addEventListener('hashchange',function(){
  $filters.forEach( $filter => $filter.classList.remove('selected')  );
  $filters.find( $filter => $filter.href === location.href ).className = 'selected';
})

function noCompletedItems() {
  const completedItems = todo_list.querySelectorAll('li.completed');

  if (completedItems.length > 0) {
    clearCompleted.style.display = 'block'
  } else {
    clearCompleted.style.display = 'none'
  }
}


//준건선배 설명(이제부터 본격 자스 시작....)

const state = {
  filter: 'all',
  todos: [
    {
      idx: idx(),
      name: '해커톤 망치기',
      completed: true,
    },
    {
      idx: idx(),
      name: 'object 완벽 이해',
      completed: false,
    },
    {
      idx: idx(),
      name: '집가기',
      completed: false,
    }
  ],
};

state.todos.push({
  idx: idx(),
  name: 'test',
  completed: false
});

const pushObj = state.todos.forEach(function(e){
  return e.idx
})

console.log(pushObj);


const idxNum = state.todos.forEach((num)=>{
  return num + 1;
})

console.log(idxNum);

const mapPrac = state.todos.map(function(idx){
  return idx >= 0;
})

console.log(mapPrac);

const array = state.todos.map(
  (todo, i) => {
    return `<li>
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : '' }/>
        <label>${todo.name}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" type="text" />
    </li>`;
  }
);

// console.log(array.join(''));

const array2 = ['홍', '의', '준'];
// console.log(array2.join(''));

// console.log(array);




// console.log(state.todos[0].nane);
// console.log(state.todos[1].nane);
// console.log(state.todos[2].nane);













// // Function to save todo items to local storage
// function saveTodoToLocalStorage() {
//   const todoItems = [];
//   const todoListItems = todo_list.querySelectorAll('li');

//   todoListItems.forEach(function (todoItem) {
//     const label = todoItem.querySelector('label').textContent;
//     const isChecked = todoItem.classList.contains('completed');

//     todoItems.push({ label, isChecked });
//   });

//   localStorage.setItem('todos', JSON.stringify(todoItems));
// }

// // Call this function whenever a new todo item is added or modified
// function updateLocalStorage() {
//   saveTodoToLocalStorage();
//   // You can also add other local storage updates here if needed
// }

// // Event listeners for adding and modifying todo items
// new_todo.addEventListener('keyup', function (event) {
//   // Existing code...

//   // Call the function to update local storage
//   updateLocalStorage();
// });

// // Other event listeners...

// // Call this function on page load to retrieve todos from local storage
// function loadTodosFromLocalStorage() {
//   const storedTodos = localStorage.getItem('todos');

//   if (storedTodos) {
//     const todos = JSON.parse(storedTodos);

//     todos.forEach(function (todo) {
//       const newTodoList = document.createElement('li');
//       newTodoList.innerHTML = `
//         <div class="view">
//           <input class="toggle" type="checkbox" ${todo.isChecked ? 'checked' : ''} />
//           <label>${todo.label}</label>
//           <button class="destroy"></button>
//         </div>
//         <input class="edit" type="text" />
//       `;

//       // Existing code...

//       // Append the loaded todo item to the todo list
//       todo_list.append(newTodoList);
//     });
//   }
// }

// // Call the function on page load
// window.addEventListener('load', function () {
//   loadTodosFromLocalStorage();
//   isFooterVisible();
//   isV_ToggleVisible();
// });







// filters.addEventListener("click", function(){
//   console.log(1);
// })
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



// function createTodoItem(text){
//   const $todoItem = document.createElement('li');
//   const $todoItemView = document.createElement('div');
//   $todoItemView.className = 'view';

  
//   $todoItem.append($todoItemView);
//   return $todoItem;
// }
// const $todoItem = createTodoItem()