import {pageAttributes} from '../../functions/basicPagesAttributes.js';

pageAttributes();


import {initializeProducts, searchFunction} from '../../functions/searchFunction.js';

initializeProducts();

const searchButton = document.querySelector('.search button');
const search = document.querySelector('.search');
const searchInfo = document.querySelector('.searchInfo');

class productBuild {

    constructor(){
        this.params = new URLSearchParams(window.location.search)
        this.name = this.params.get('name');
        this.imgUrl = this.params.get('imgSrc');
        this.price = this.params.get('price');
        this.img = document.querySelector('.img');
        this.span = document.querySelector('.productNameSpan');
        this.priceSpan = document.querySelector('.price');
        this.buy = document.querySelector('.buy');
        this.productContainer = document.querySelector('.productContainer');
        this.init();
    }

    init = () => {

        //console.log(`productContainer width: ${this.productContainer.offsetWidth}`);

        document.addEventListener('DOMContentLoaded', ()=>{

            this.img.src = this.imgUrl;
            this.span.textContent = this.name;
            this.priceSpan.textContent = this.price + ' TL';

        })

        this.buy.addEventListener('mouseover', (e)=>{

            const effect = document.createElement('div');
            effect.classList.add('effect');
            this.buy.appendChild(effect);

            effect.addEventListener('animationend', () => {
                effect.remove();
            });

        })

    } 

}

const productLoad = new productBuild();

