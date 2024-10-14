import {pageAttributes} from '../../functions/basicPagesAttributes.js';

document.addEventListener('DOMContentLoaded', (event) => {
    pageAttributes();
});

import {initializeProducts, searchFunction, searchInfoFunction} from '../../functions/searchFunction.js';

initializeProducts();

const searchButton = document.querySelector('.search button');
searchButton.addEventListener('click', searchFunction);
const search = document.querySelector('.search');
const searchInfo = document.querySelector('.searchInfo');
search.addEventListener('input', searchInfoFunction);

const load = () =>{

    const productContainer = document.querySelector('.productContainer')
    const filteredProducts = JSON.parse(localStorage.getItem('filteredProducts')) || [];
    productContainer.innerHTML = '';
    if(filteredProducts){
        
        if (!Array.isArray(filteredProducts)) {
            console.log(filteredProducts);
            const chart = document.createElement('div');
            chart.className = 'productChart';

            const button = document.createElement('button');
            const buttonImg = document.createElement('img');
            buttonImg.className = 'productChartHeart';
            buttonImg.src = `../../images/${filteredProducts.heartSrc}`;
            button.appendChild(buttonImg);

            const chartImg = document.createElement('img');
            chartImg.className = 'productChartImg';
            chartImg.src = filteredProducts.imgSrc;

            const chartSpan = document.createElement('span');
            chartSpan.className = 'productChartSpan';
            chartSpan.textContent = filteredProducts.name;

            chart.appendChild(button);
            chart.appendChild(chartImg);
            chart.appendChild(chartSpan);
            productContainer.appendChild(chart);
            window.addEventListener('beforeunload', ()=>{
                localStorage.removeItem('filteredProducts');
            })

        }    
        if(filteredProducts.length > 0) {
            filteredProducts.forEach(item => {
                const chart = document.createElement('div');
                chart.className = 'productChart';

                const button = document.createElement('button');
                const buttonImg = document.createElement('img');
                buttonImg.className = 'productChartHeart';
                buttonImg.src = `../../images/${item.heartSrc}`;
                button.appendChild(buttonImg);

                const chartImg = document.createElement('img');
                chartImg.className = 'productChartImg';
                chartImg.src = item.imgSrc;

                const chartSpan = document.createElement('span');
                chartSpan.className = 'productChartSpan';
                chartSpan.textContent = item.name;

                chart.appendChild(button);
                chart.appendChild(chartImg);
                chart.appendChild(chartSpan);
                productContainer.appendChild(chart);
            });
        }   
        
    }
    const chart = document.querySelector('.productChart');
    const noProduct = productContainer.querySelector('.noProduct');
    if(chart){

        if(noProduct){
            productContainer.removeChild(noProduct);
        }   

    }else{
        
        if(!noProduct){
            
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

        }
        .goBack{
        
            color: #57cc99;
            font-family: sans-serif;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.5s ease;

        }

        .goBack:hover{
            color: #42a77c;
        }
        
        `
        style.innerHTML += noProductStyle
        const noProduct = document.createElement('div');
        noProduct.classList.add('noProduct');

        const h4 = document.createElement('h4');
        h4.classList.add('noProductH4');
        h4.textContent = 'Aranılan Kriterlerde Ürün Bulunmuyor : (';

        const noProductlogo = document.createElement('img');
        noProductlogo.classList.add('noProductLogo');
        noProductlogo.src = '../../images/noSearch.png';

        const goBack = document.createElement('a');
        goBack.classList.add('goBack')
        goBack.href = '/Pages/mainPage/mainPage.html';
        goBack.textContent = 'Ana Sayfaya Geri Dön'

        noProduct.appendChild(noProductlogo);
        noProduct.appendChild(h4);
        noProduct.appendChild(goBack);

        productContainer.appendChild(noProduct);

        }
            
    }
    // 'beforeunload'  ile yapmıştım ama istediğim verimi vermedi sayfa kapanmadan önce tetiklenir, ancak tarayıcıların geri ve ileri düğmeleri kullanıldığında her zaman güvenilir bir şekilde çalışmayabilir.
    window.addEventListener('pagehide', (event)=>{
        if(event.persisted){
            localStorage.removeItem('filteredProducts');
        }

    })
    
}

let heartItemMetaDatas = JSON.parse(localStorage.getItem('likedItems')) || [];

import { liked, updateLocalStorage } from "../../functions/likedFunction.js";

window.onload = function() {
    load();
    const heartImgFilled = '../../images/heartt.png';
    let heartItemMetaDatas = JSON.parse(localStorage.getItem('likedItems')) || [];
    heartItemMetaDatas.forEach(item => {
        const buttons = [...document.querySelectorAll('.productChart button')];
        buttons.forEach(button => {
            const img = button.querySelector('img');
            const itemImgSrc = button.parentElement.querySelector('.productChartImg')?.src;
            if (itemImgSrc === item.imgSrc) {
                img.src = heartImgFilled;
            }
        });
    });

    const buttons = [...document.querySelectorAll('.productChart button')];
    buttons.forEach((item, i) => liked(item, i));
};












