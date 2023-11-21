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




const $div = document.createElement('div');

document.body.append($div);

$div.textContent = '312u231o23718123789123'


console.dir($div);


const $h1 = document.querySelector('h1');
const $lis = [...document.querySelectorAll('.todo-list li')];


$lis[0].className = '1 2 3 4'
$lis[0].classList.add('5');
$lis[0].classList.remove('2');

console.log($lis[0].classList);

// textContent, classList 


// 텍스트를 추가, 클래스를 추가, 
// 이벤트


$div.addEventListener('click',function(){
  console.log('클릭햇어')
})

function a(){

}

const $todoList= document.querySelector('.todo-list');



const $checkbox = document.querySelectorAll('[type=checkbox]')[1];
$checkbox.checked = true

const $input = document.createElement('input');
$input.type = 'text'
$input.value = '123971233897123'

$input.addEventListener('input',function(){
  // $input.value = '';
  console.log('32132');
  
})

$input.addEventListener('keydown',function(event){
  console.log(event);
  if(event.code === 'Enter'){  
    const $li = document.createElement('li');
    $li.textContent = $input.value;

    $todoList.append($li);

    $input.value = '';


  }
})

const $toodApp = document.querySelector('.todoapp');


$toodApp.append($input);
document.body.append($input);