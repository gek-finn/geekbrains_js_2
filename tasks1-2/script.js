'use strict'
//1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.
function task(original_text, regexpression){
    return original_text.replace(regexpression, `"`);
}

const regexp1 = /'/gm;
const regexp2 = /(?<=^|.)'(?=[^A-z]|$)|(?<=^|[^A-z])'(?=.|$)/gm;
const text = document.querySelector('.text').innerHTML;

document.querySelector('.task_one').addEventListener('click',()=>{
    document.querySelector('.regexp').innerHTML =regexp1;
    document.querySelector('.text_corrected').innerHTML = task(text, regexp1);
});
document.querySelector('.task_two').addEventListener('click',()=>{
    document.querySelector('.regexp').innerHTML =regexp2;
    document.querySelector('.text_corrected').innerHTML = task(text, regexp2);
});




