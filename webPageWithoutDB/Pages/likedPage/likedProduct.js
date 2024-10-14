import {pageAttributes} from '../../functions/basicPagesAttributes.js';

document.addEventListener('DOMContentLoaded', (event) => {
    pageAttributes();
});

import {initializeProducts, searchFunction, searchInfoFunction} from '../../functions/searchFunction.js';

// sayfaya ürünler sonradan eklendiği için DOM yüklendikten sonra calışmasını sağladık ve calıştı
document.addEventListener('DOMContentLoaded', () => {  
    initializeProducts();
})

const searchButton = document.querySelector('.search button');
searchButton.addEventListener('click', searchFunction);
const search = document.querySelector('.search');
const searchInfo = document.querySelector('.searchInfo');
search.addEventListener('input', searchInfoFunction);

const load = () => {
    const productContainer = document.querySelector('.productContainer'); 
    const data = JSON.parse(localStorage.getItem('likedItems')) || []; 

    
    productContainer.innerHTML = '';

    if (data.length > 0) {
        data.forEach(item => {
            
            //console.log(item.heartSrc);
            const chart = document.createElement('div');
            chart.classList.add('chart');

            const button = document.createElement('button');
            const buttonImg = document.createElement('img');
            buttonImg.src = item.heartSrc;
            buttonImg.classList.add('chartHeart');
            button.appendChild(buttonImg);

            const headerImg = document.createElement('img');
            headerImg.src = item.imgSrc;
            headerImg.classList.add('sliderChartImg');

            const span = document.createElement('span');
            span.textContent = item.spanText;
            span.classList.add('sliderChartSpan');

            // Elemanları chart'a ekleyin
            chart.appendChild(button);
            chart.appendChild(headerImg);
            chart.appendChild(span);
            productContainer.appendChild(chart);
        });
    } else {
        // Eğer data yoksa, chart'ı kaldırın
        const chart = document.querySelector('.chart');
        if (chart) {
            productContainer.removeChild(chart);
        }
    }

    const chart = document.querySelector('.chart');
    if(chart){

        const noProduct = productContainer.querySelector('.noProduct');
        if(noProduct){
            productContainer.removeChild(noProduct);
        }   

    }
    else{
        
        let style = document.querySelector('head style');
        if(!style){
            style = document.createElement('style');
            document.head.appendChild(style);
        }
        const noProductStyle = 
        `.noProduct{

            position: relative;
            top: 200px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        
        }
        
        .noProductLogo{
        
            width: 64px;
            height: 64px;
        
        }
        
        .noProductH4{
        
            color: #57cc99;
            font-family: sans-serif;

        }`
        style.innerHTML += noProductStyle
        const noProduct = document.createElement('div');
        noProduct.classList.add('noProduct');

        const h4 = document.createElement('h4');
        h4.classList.add('noProductH4');
        h4.textContent = 'Beğenilen Ürün Bulunmuyor : (';

        const noProductlogo = document.createElement('img');
        noProductlogo.classList.add('noProductLogo');
        noProductlogo.src = '../../images/heart-slash.png';

        const goBack = document.createElement('a');
        goBack.href = '/Pages/mainPage/mainPage.html';
        goBack.textContent = 'Ana Sayfaya Geri Dön'
        goBack.style.color = '#57cc99';
        goBack.style.fontFamily = 'sans-serif'; 
        goBack.style.textDecoration = 'none';
        goBack.style.fontWeight = 'bold'

        noProduct.appendChild(noProductlogo);
        noProduct.appendChild(h4);
        noProduct.appendChild(goBack);

        productContainer.appendChild(noProduct);
            
    }
};

window.onload = load();

const buttons = [...document.querySelectorAll('.chart button')];

import { liked, updateLocalStorage } from "../../functions/likedFunction.js";

buttons.forEach((item, i) => liked(item, i));





