import {pageAttributes} from '../../functions/basicPagesAttributes.js';

document.addEventListener('DOMContentLoaded', (event) => {
    pageAttributes();
});

const searchInput = document.querySelector('.searchInput');


// pagehide sayfa dan cıktığımız zaman tetiklendi ve value yi temizledi pagehide yerinepageshow da var 
window.addEventListener('pagehide', (event)=>{

    if(event.persisted){
        searchInput.value = '';
    }

})

//// önemli
// Search alanı
import {initializeProducts, searchFunction, searchInfoFunction, lastSearchFunction, saveSearchTerm} from '../../functions/searchFunction.js';

initializeProducts();

lastSearchFunction();

const searchButton = document.querySelector('.search button');

searchInput.addEventListener('input', ()=>{
    if(searchInput.value === ''){
        searchButton.removeEventListener('click', searchFunction)
        
    }else{
        searchButton.addEventListener('click', searchFunction);
        searchButton.addEventListener('click', saveSearchTerm);
    }
})

window.addEventListener('load', () => {
    if (searchInput.value !== '') {
        searchButton.addEventListener('click', searchFunction);
    }
});

const search = document.querySelector('.search');
const searchInfo = document.querySelector('.searchInfo');
searchInput.addEventListener('input', searchInfoFunction);

//slider alanı
const heartImg = '../../images/heart.png';

let heartItemMetaDatas = JSON.parse(localStorage.getItem('likedItems')) || [];

window.onload = function() {
    const heartImg = '../../images/heart.png';
    const heartImgFilled = '../../images/heartt.png';
    heartItemMetaDatas.forEach(item => {
        const buttons = [
            ...document.querySelectorAll('.chart button'),
            ...document.querySelectorAll('.productChart button')
        ];
    
        buttons.forEach(button => {
            const img = button.querySelector('img');
            const itemImgSrc = button.parentElement.querySelector('.sliderChartImg, .productChartImg').src;
    
            if (itemImgSrc === item.imgSrc) {
                img.src = heartImgFilled;
            }
        });
    });
};


//slider ve product like işlevi alanı ve slider sağ sol ilerleme alanı
////// önemliii
import {liked, updateLocalStorage} from '../../functions/likedFunction.js';

const heartButton = [...document.querySelectorAll('.chart button')];

heartButton.forEach((item, i) => {
    liked(item, i)
});

const productChartButton = [...document.querySelectorAll('.productChart button')];

productChartButton.forEach((item, i) =>{
    liked(item,i);
})

class sliderMove {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.goLeft = document.querySelector('.goLeft');
        this.goRight = document.querySelector('.goRight');
        this.chart = document.querySelector('.chart');
        this.gap = 2;
        this.isDragging;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.scrollWidth = this.chart.offsetWidth + this.gap;

        this.init();
    }

    init() {
        this.goLeft.addEventListener('click', () => {
            this.slider.style.scrollBehavior = 'smooth';
            this.slider.scrollLeft -= this.scrollWidth;
            //console.log(this.slider.scrollLeft);
        });

        this.goRight.addEventListener('click', () => {
            this.slider.style.scrollBehavior = 'smooth';
            this.slider.scrollLeft += this.scrollWidth;
            //console.log(this.slider.scrollLeft);
        });

        this.slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isDown = true;
            this.isDragging = false;
            this.startX = e.pageX - this.slider.offsetLeft;
            this.scrollLeft = this.slider.scrollLeft;
            this.slider.style.scrollBehavior = 'auto'; 
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDown) return;
            e.preventDefault();
            this.isDragging = true;
            const newX = e.pageX - this.slider.offsetLeft;
            const walk = (newX - this.startX) * 0.5; 
            this.slider.scrollLeft = this.scrollLeft - walk;
        });

        document.addEventListener('mouseup', (e) => {
            this.isDown = false;
            if (!this.isDragging) {
                const target = e.target.closest('a.chart');
                if (target) {
                    target.click();
                }
            }
            this.adjustScrollPosition();
            this.slider.classList.remove('active');
        });

        this.chart.addEventListener('click', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
        this.slider.addEventListener('click', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
    }

    adjustScrollPosition() {
        this.slider.style.scrollBehavior = 'smooth';
        const scrollPosition = this.slider.scrollLeft;
        const remainder = scrollPosition % (this.scrollWidth);
        if (remainder !== 0) {
            if (scrollPosition > this.scrollLeft) {
                this.slider.scrollLeft += (this.scrollWidth) - remainder; // Sağ tarafa kaydır
            } else {
                this.slider.scrollLeft -= remainder; // Sol tarafa kaydır
            }
        }
    }
}

const sliderr = new sliderMove();

class goProducts {
    constructor() {
        this.products = [...document.querySelectorAll('.chart'), ...document.querySelectorAll('.productChart')];
        this.goProduct();
    }

    goProduct = () => {
        this.products.forEach(item => {
            item.addEventListener('click', (event) => {
                // Eğer slider sürülüyorsa işlemi durdur
                if (sliderr.isDragging) return;

                // Eğer tıklanan öğe bir buton veya onun altında bir öğe ise işlemi durdur
                const closestButton = event.target.closest('button');
                console.log('Event target:', event.target);
                console.log('Closest button:', closestButton);

                if (closestButton) {
                    console.log('Selam');
                    event.preventDefault(); 
                    event.stopPropagation(); // Varsayılan olayı durdur
                    event.stopImmediatePropagation();  // Diğer olayların çalışmasını engelle
                    return;  // Fonksiyonu sonlandır
                }
                
                // Eğer yukarıdaki if'e girmezse URL'ye yönlendirme
                event.preventDefault();  // Varsayılan olayı durdur
                const price = item.getAttribute('data-price');
                const imgSrc = item.getAttribute('data-img');
                const name = item.getAttribute('data-span');
                const url = `/Pages/productPage/productPage.html?name=${name}&price=${price}&imgSrc=${imgSrc}`;
                //window.location.href = url; // Yönlendirme
            });
        });
    }
}

const goUrl = new goProducts();







