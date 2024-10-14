const header = document.querySelector('.header');
var sidebarButton = document.querySelector('.sidebarButton');
var sidebar = document.querySelector('.sidebar');

var openSidebar = () =>{

    var cssLeft = window.getComputedStyle(sidebar).getPropertyValue('left'); // burda direkt css den veriyi elde ettik
    
    if(cssLeft === '-250px'){
        sidebar.style.left = '0px';
    }
    else{
        sidebar.style.left = '-250px';
    }

}
const fluEkran = document.createElement('div');
fluEkran.classList.add('fluEkran');
fluEkran.style.width = '100%';
fluEkran.style.height = '100%';
fluEkran.style.zIndex = '50';
fluEkran.style.position = 'fixed';
fluEkran.style.left = '0';
fluEkran.style.right = '0';
fluEkran.style.opacity = '0';
fluEkran.style.transition = 'opacity 0.6s ease';
fluEkran.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

sidebarButton.addEventListener('click', openSidebar);
sidebarButton.addEventListener('click', (event) => {
    var lastClick = event.target;
    var cssLeft = window.getComputedStyle(sidebar).getPropertyValue('left');
    if (cssLeft === '-250px') {
        header.after(fluEkran);
        requestAnimationFrame(() => {
            console.log('11');
            fluEkran.style.opacity = '1';
            console.log('22');
        });
    } else if (cssLeft === '0px' || lastClick != sidebar) {
        requestAnimationFrame(() => {
            console.log('aaa')
            fluEkran.style.opacity = '0'; // Bitiş değeri
            setTimeout(()=>{
                document.body.removeChild(fluEkran);
            }, 300);
            
        });
    }
});

fluEkran.addEventListener('click', () => {
    console.log("fluEkran clicked"); // Tıklama olayını kontrol etmek için
    if (fluEkran.style.opacity === '1') {
        fluEkran.style.opacity = '0';
        sidebar.style.left = '-250px';
        setTimeout(() => {
            document.body.removeChild(fluEkran);
        }, 300);
        
    }
});

var annoucementButton = document.querySelector('.announement');
var imageButton = document.querySelector('.userImg');
var dropDown = document.querySelector('.dropDown');
var annoucementInfo = document.querySelector('.annoucementInfo');
var userInfo = document.querySelector('.userInfo');

var dropDownOpen = (event) =>{

    event.stopPropagation()  // COK ÖNEMLİ !!! event.stopPropagation(): Bu, butona tıkladığında olayın document üzerinde yayılmasını engeller. Yani, butona tıkladığında document'ın click event listener'ı tetiklenmez.
    const clickInfo = event.currentTarget;
   
    if(clickInfo === annoucementButton){

        dropDown.style.display = 'flex';
        annoucementInfo.style.display = 'flex';
        userInfo.style.display = 'none';

    }
    else if(clickInfo === imageButton){

        dropDown.style.display = 'flex';
        userInfo.style.display = 'flex';
        annoucementInfo.style.display = 'none';

    }
    else{
        dropDown.style.display = 'none';
    }
    
}

document.addEventListener('click', (event) => {
    // Eğer tıklanan hedef dropdown menüsü veya butonlardan biri değilse
    if (event.target !== dropDown && !dropDown.contains(event.target) &&
        event.target !== annoucementButton && event.target !== imageButton) {
        dropDown.style.display = 'none';
        
    }
});

imageButton.addEventListener('click', dropDownOpen);
annoucementButton.addEventListener('click', dropDownOpen);