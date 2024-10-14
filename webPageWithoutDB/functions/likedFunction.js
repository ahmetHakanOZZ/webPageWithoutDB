// burda liked işlemini yaliz bir şekilde export ediyoruz cunlku diğer sayfada export ettiğimde o .js deki tüm işlmeler import ediliyordu bundan dolayı sadece tek bir dosyada taoplayıp bunu yapıcam


let heartItemMetaDatas = JSON.parse(localStorage.getItem('likedItems')) || [];
const heartImg = '../../images/heart.png';

const liked = (item, i) =>{

    item.addEventListener('click', (event) => {

        const img = item.querySelector('img');
        const imgSrc = img.src.split('/').pop(); // Sadece dosya adını alır split / bunlara kadar olanları bölüyor ve dizinin içine atıyor pop ise en sondaki eleamnı alıyor ve dizi bir eksiliyor
        //const itemHeartSrc = item.parentElement.querySelector('.chartHeart').src; // eski src ye erişiyor ondan kullanmadım bu değeri
        
        const sliderSpan = item.parentElement.querySelector('.sliderChartSpan');
        const sliderImg = item.parentElement.querySelector('.sliderChartImg')

        const productSpan = item.parentElement.querySelector('.productChartSpan');
        const productImg = item.parentElement.querySelector('.productChartImg');
        
        const itemImgSrc = (sliderImg ? sliderImg.src: null || productImg ? productImg.src: null);
        const itemSpanText = (sliderSpan ? sliderSpan.textContent.trim(): null || productSpan ? productSpan.textContent.trim(): null);

        //const itemImgSrc = item.parentElement.querySelector('.sliderChartImg').src || item.parentElement.querySelector('.productChartImg').src;
        //const itemSpanText = item.parentElement.querySelector('.sliderChartSpan').textContent.trim() || item.parentElement.querySelector('.productChartSpan').textContent.trim();
        if (imgSrc === heartImg.split('/').pop()) {
            
            const heartt = '../../images/heartt.png'
            img.src = heartt;
            const newItem = {
                imgSrc : itemImgSrc,
                heartSrc : heartt,
                spanText : itemSpanText
            };

            const isDuplicate = heartItemMetaDatas.some(item=>{

                item.imgSrc === newItem.imgSrc &&
                item.heartSrc === newItem.heartSrc &&
                item.spanText === newItem.spanText

            })
            if(!isDuplicate){
                heartItemMetaDatas.push(newItem);
            }
            
        } else {
            
            img.src = heartImg;
            const index = heartItemMetaDatas.findIndex(metaData => metaData.imgSrc === itemImgSrc);
            //const index = heartItemMetaDatas.indexOf(newItem); // tıklanan item in index değerini verir
            if(index > -1 ){
                heartItemMetaDatas.splice(index,1);
                
            }

        }
        updateLocalStorage();
    });

}

let updateLocalStorage = () =>{
    localStorage.setItem('likedItems', JSON.stringify(heartItemMetaDatas));
}

export {liked, updateLocalStorage};

