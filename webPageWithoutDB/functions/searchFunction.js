let products = [];
// ürünler eğer tek bir link ile erişilebilir olursa ve tek bir DB de bulunurlarsa initializeProducts güncellenicek



export const initializeProducts = () => {
    const sliderProducts = document.querySelectorAll('.chart');
    const normalProducts = document.querySelectorAll('.productChart');

    if(normalProducts){
        normalProducts.forEach(product => {
            let productName = product.querySelector('.productChartSpan').textContent.trim();
            let productImgSrc = product.querySelector('.productChartImg').src.trim();
            let productChartHeart = product.querySelector('.productChartHeart').src.split('/').pop();
            const newItem = {
                name: productName,
                imgSrc: productImgSrc,
                heartSrc: productChartHeart
            };
            products.push(newItem);
        });
    }else{
        console.log('normal yok');
    }

    if(sliderProducts){
        sliderProducts.forEach(product => {
            let sliderName = product.querySelector('.sliderChartSpan').textContent.trim();
            let sliderImgSrc = product.querySelector('.sliderChartImg').src.trim();
            let sliderChartHeart = product.querySelector('.chartHeart').src.split('/').pop();
            const newItem = {
                name: sliderName,
                imgSrc: sliderImgSrc,
                heartSrc: sliderChartHeart
            };
            products.push(newItem);
        });
    }else{
        console.log('slider yok');
    }
    //console.log(products)

};

export const lastSearchFunction = () => {

    const searchInfoLastSearch = document.querySelector('.lastSearchs');
    //searchInfoLastSearch.innerHTML = '';
    while (searchInfoLastSearch.firstChild) {
        searchInfoLastSearch.removeChild(searchInfoLastSearch.firstChild);
    }
    const lastSearch = localStorage.getItem('lastSearch');
    const lastSearchs = lastSearch ? JSON.parse(lastSearch) : [];
    if(lastSearchs.length > 0){
        if(Array.isArray(lastSearchs)){
            const lastThreeSearchs = lastSearchs.slice(-2).reverse();
            lastThreeSearchs.forEach((item) => {
                let lastSearchdiv = document.createElement('div');
                lastSearchdiv.style.height = '37px';
                lastSearchdiv.style.display = 'flex';
                lastSearchdiv.style.alignItems = 'center';
                lastSearchdiv.style.margin = '20px';
                lastSearchdiv.style.cursor = 'pointer';
                lastSearchdiv.style.borderRadius = '25px'
                let img = document.createElement('img');
                img.src = '../../images/time-past.png';
                img.style.width = '16px';
                img.style.paddingLeft = '5px'
                let a = document.createElement('a');
                a.textContent = item;
                lastSearchdiv.appendChild(img);
                img.after(a);
                searchInfoLastSearch.appendChild(lastSearchdiv);
                lastSearchdiv.addEventListener('click', () => {
                    searchFunction();
                });
            })
        }
        else{
            let lastSearchdiv = document.createElement('div');
            lastSearchdiv.style.height = '37px';
            lastSearchdiv.style.display = 'flex';
            lastSearchdiv.style.alignItems = 'center';
            lastSearchdiv.style.margin = '20px';
            lastSearchdiv.style.cursor = 'pointer';
            lastSearchdiv.style.borderRadius = '25px'
            let img = document.createElement('img');
            img.src = '../../images/time-past.png';
            img.style.width = '16px';
            img.style.paddingLeft = '5px'
            let a = document.createElement('a');
            a.textContent = lastSearchs;
            lastSearchdiv.appendChild(img);
            lastSearchdiv.appendChild(a);
            searchInfoLastSearch.appendChild(lastSearchdiv);
            lastSearchdiv.addEventListener('click', () => {
                searchFunction();
            });
        }

    }
    else{
        let spanDiv = document.createElement('div');
        spanDiv.classList.add('span');
        spanDiv.style.cursor = 'default';
        spanDiv.style.textAlign = 'center';
        spanDiv.style.margin = '20px 0 20px 0';
        spanDiv.style.position = 'absolute'; // Mutlak konumlandırma
        spanDiv.style.bottom = '30px'; // Alt boşluk
        spanDiv.style.width = '100%';
        let span = document.createElement('span');
        span.textContent = 'Geçmiş arama bulunmamaktadır : (';
        span.style.color = 'white';
        span.style.fontFamily = 'sans-serif';
        spanDiv.appendChild(span);
        searchInfoLastSearch.appendChild(spanDiv);
    }

}

export const saveSearchTerm = () => {
    let searchInput = document.querySelector('.searchInput').value;
    if (searchInput) {
        let lastSearch = localStorage.getItem('lastSearch');
        let lastSearchs = lastSearch ? JSON.parse(lastSearch) : [];
        if (!Array.isArray(lastSearchs)) {
            lastSearchs = [];
        }
        if(!lastSearchs.includes(searchInput)){
            lastSearchs.push(searchInput);
            localStorage.setItem('lastSearch', JSON.stringify(lastSearchs));
        }
    }
};

export const searchInfoFunction = () => {

    const searchInfoGuess = document.querySelector('.searchGuess');
    let searchInput = document.querySelector('.searchInput').value;

    searchInfoGuess.innerHTML = '';

    if(searchInput){
        
        let cleanInput = searchInput.trim().toLowerCase();
        let matches = products.filter(product=>{
            return product.name.toLowerCase().includes(cleanInput);
        }).slice(0, 3);
        
        
        if(matches.length>0){
            const threeMatches = matches.slice(0,3);
            threeMatches.forEach(item=>{
                let a = document.createElement('a');
                a.textContent = item.name;
                a.addEventListener('click', ()=>{
                    localStorage.setItem('filteredProducts', JSON.stringify(item));
                })
                a.href = '/Pages/searchPage/searchPage.html'
                searchInfoGuess.appendChild(a);

            })
        }
        else {
            let spanDiv = document.createElement('div');
            spanDiv.style.textAlign = 'center';
            spanDiv.style.margin = '20px 0 20px 0';
            let span = document.createElement('span');
            span.textContent = 'Eşleşen Ürün Bulunmadı';
            span.style.color = 'white';
            span.style.fontFamily = 'sans-serif';
            spanDiv.appendChild(span);
            searchInfoGuess.appendChild(spanDiv);
        }

    }

}

export const searchFunction = () => {
    let searchInput = document.querySelector('.searchInput').value;
    let lastSearch = document.querySelectorAll('.lastSearchs div a');
    if (lastSearch) {
        lastSearch.forEach(item=>{
            let lastSearchtext = item.textContent;
            let cleanSearchText = lastSearchtext.trim().toLowerCase();
            let matches = products.filter(product => {
                return product.name.toLowerCase().includes(cleanSearchText);
            });
            if (matches.length > 0) {
                localStorage.setItem('filteredProducts', JSON.stringify(matches));
                window.location.href = '/Pages/searchPage/searchPage.html';
            }
            else {
                window.location.href = '/Pages/searchPage/searchPage.html';
            }
        })
    }

    if (searchInput) {
        let cleanInput = searchInput.trim().toLowerCase();
        let matches = products.filter(product => {
            return product.name.toLowerCase().includes(cleanInput);
        });
        
        if(matches.length > 0){
            //console.log(matches);
            localStorage.setItem('filteredProducts', JSON.stringify(matches));
            let lastSearch = localStorage.getItem('lastSearch');
            let lastSearchs = lastSearch ? JSON.parse(lastSearch) : [];
            if(!Array.isArray(lastSearchs)){
                lastSearchs = [];
            }
            if(!lastSearchs.includes(searchInput)){
                lastSearchs.push(searchInput);
            localStorage.setItem('lastSearch', JSON.stringify(lastSearchs));
            }
            window.location.href = '/Pages/searchPage/searchPage.html';
            
        }
        else{
            window.location.href = '/Pages/searchPage/searchPage.html';
        }

    }
    
};

