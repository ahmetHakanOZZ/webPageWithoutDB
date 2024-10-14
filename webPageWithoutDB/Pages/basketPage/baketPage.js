import {pageAttributes} from '../../functions/basicPagesAttributes.js';

document.addEventListener('DOMContentLoaded', (event) => {
    pageAttributes();
});

class basketPage {

    constructor(){
        this.productContainer = document.querySelector('.productContainer');
        this.style = document.querySelector('style') ? document.querySelector('style') : document.createElement('style');
        if (!document.querySelector('style')) {
            document.head.appendChild(this.style);
        }
        this.fetchBasket();
    }

    buildHtml = () => {
        var basketHTML = `

            <a href="" class="productChart">
                <button>
                    <img class="productChartHeart" src="" alt="">
                </button>
                <img class="productChartImg" src="" alt="">
                <span class="productChartSpan"></span>
            </a>
        
        `
        this.productContainer.innerHTML += basketHTML;
    }
    

    buildCss = () => {
        var basketCss = `
        
            .productChart{

                width: calc((100% / 5) - 20px);
                height: 370px;
                display: flex;
                flex-direction: column;
                position: relative;
                background-color: #efefef;
                border-radius: 25px;
                overflow: hidden;
                border: 1px solid #ccc;
                text-decoration: none;
                cursor: pointer;
                
            }

            .productChart button{

                position: absolute;
                right: 20px;
                top: 20px;
                z-index: 49;
                width: 34px;
                height: 34px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 0px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                

            }

            .productChartHeart{

                object-fit: cover;
                height: 80%;
                cursor: pointer;

            }

            .productChartImg{

                object-fit: cover;
                
            }

            .productChartSpan{

                color: #38a3a5;
                position: relative;
                padding: 5px 15px 0 15px;
                font-family: sans-serif;

            }
        
        `;
        this.style.innerHTML += basketCss;
    }

    fetchBasket = () => {
        const basketProducts = JSON.parse(localStorage.getItem('basketProduct'));
        if(basketProducts){
            this.buildHtml();
            this.buildCss();
        }else{
            const noProduct = document.createElement('div');
            
        }
    }

}

const addBasket = new basketPage();

class noProduct {

    constructor(){
        this.productContainer = document.querySelector('.productContainer');
        this.basketProduct = document.querySelectorAll('basketProduct')
    }

}