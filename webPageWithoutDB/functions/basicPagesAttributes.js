export function pageAttributes(){  
    const header = document.querySelector('.header');
    var sidebarButton = document.querySelector('.sidebarButton');
    var sidebar = document.querySelector('.sidebar');
    const searchButton = document.querySelector('.search button');
    const search = document.querySelector('.search');
    const searchInfo = document.querySelector('.searchInfo');


    var openSidebar = () =>{

        var cssLeft = window.getComputedStyle(sidebar).getPropertyValue('left'); // burda direkt css den veriyi elde ettik
        
        if(cssLeft === '-250px'){
            sidebar.style.left = '0px';
        }
        else{
            sidebar.style.left = '-250px';
        }

    }

    search.addEventListener('click', (event) => {
        event.stopPropagation();
        searchInfo.style.height = '370px'
        searchInfo.style.width = '470px'
    });
    
    const fluEkran = document.createElement('div');
    Object.assign(fluEkran.style, {
        width: '100%',
        height: '100%',
        zIndex: '50',
        position: 'fixed',
        left: '0',
        right: '0',
        opacity: '0',
        transition: 'opacity 0.6s ease',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    });

    sidebarButton.addEventListener('click', openSidebar);
    sidebarButton.addEventListener('click', (event) => {
        var lastClick = event.target;
        var cssLeft = window.getComputedStyle(sidebar).getPropertyValue('left');
        if (cssLeft === '-250px') {
            header.after(fluEkran);
            requestAnimationFrame(() => {
                fluEkran.style.opacity = '1';
            });
        } else if (cssLeft === '0px' || lastClick != sidebar) {
            requestAnimationFrame(() => {
                fluEkran.style.opacity = '0'; // Bitiş değeri
                setTimeout(()=>{
                    document.body.removeChild(fluEkran);
                }, 300);
                
            });
        }
    });

    fluEkran.addEventListener('click', () => {
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
        // Eğer tıklanan hedef dropdown veya butonlardan biri değilse
        if (event.target !== dropDown && !dropDown.contains(event.target) &&
            event.target !== annoucementButton && event.target !== imageButton) {
            dropDown.style.display = 'none';
            
        }

        if(event.target !== search && event.target !== searchButton && !searchInfo.contains(event.target)) {
            searchInfo.style.height = '0';
            searchInfo.style.width = '0';
        }
    });

    imageButton.addEventListener('click', dropDownOpen);
    annoucementButton.addEventListener('click', dropDownOpen);

    (function(self){

        self.footerContainer = document.createElement('div');
        self.footerContainer.classList.add('footerContainer');
    
        self.style = document.createElement('style');
        document.head.appendChild(self.style);
    
        self.init = function() {
            self.addClasses();
            self.buildHTML();
            self.addEventListeners();
        };
    
        self.addClasses = function() {
            var classes = `
                .footerContainer{
                    min-width: 100%;
                    position: absolute;
                    margin: 0 auto 2em auto;
                    padding: 60px 0 100px 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #c7f9cc;
                    gap: 20px;
                }
                .socialMediasDock{  
                    display: flex;
                }
                .footerContainer span {
                    text-align: center;
                    font-family: sans-serif;
                    color: #57cc99;
                    margin-bottom: 30px;
                }
                .dockItem{
                    width: 40px;
                    height: 40px;
                    border-radius: 30px;
                    margin: 0 10px; 
                    justify-content: center;
                    align-items: center;
                    transition: 700ms cubic-bezier(0.075, 0.82, 0.165, 1);
                    transform-origin: bottom;
                }
                .dockItem img{
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                }
            `;
            self.style.innerHTML = classes;
        };
    
        self.buildHTML = function() {
            var html = `
                <span>Made by KhanOz Company<br>Year 2024<br>hakanoz437@gmail.com</span>
                <div class="socialMediasDock">
                    <a class="dockItem" href="https://www.instagram.com/">
                        <img src="../../images/facebook.png">
                    </a>
                    <a class="dockItem" href="https://www.facebook.com/?locale=tr_TR">
                        <img src="../../images/instagram.png">
                    </a>
                    <a class="dockItem" href="https://x.com/?lang=tr">
                        <img src="../../images/twitter.png">
                    </a>
                    <a class="dockItem" href="https://www.youtube.com/">
                        <img src="../../images/youtube.png">
                    </a>
                </div>
            `;
            self.footerContainer.innerHTML = html;
            document.querySelector('.headContainer').after(self.footerContainer);
        };
    
        self.addEventListeners = function() {
            self.socialMediasDock = document.querySelector('.socialMediasDock');
            self.dockItems = document.querySelectorAll('.dockItem');
            const defaultItemScale = 1;
            const hoverItemScale = 2;
            const neighbourItemScale = 1.5;
            const defaultMargin = "10px";
            const expandedMargin = "30px";
    
            self.updateDockItems = function() {
                self.dockItems.forEach(function(item){
                    let scale = defaultItemScale;
                    let margin = defaultMargin;
                    if(item.isHovered){
                        scale = hoverItemScale;
                        margin = expandedMargin;
                    } else if(item.isNeighbor){
                        scale = neighbourItemScale;
                        margin = expandedMargin;
                    }
                    item.style.transform = `scale(${scale})`;
                    item.style.margin = `0 ${margin}`;
                });
            };
    
            self.dockItems.forEach(function(item){
                item.addEventListener('mousemove', function() {
                    self.dockItems.forEach(function(otherItem){
                        otherItem.isHovered = otherItem === item;
                        otherItem.isNeighbor = Math.abs(Array.from(self.dockItems).indexOf(otherItem) - Array.from(self.dockItems).indexOf(item)) === 1;
                    });
                    self.updateDockItems(); 
                });
            });
    
            self.socialMediasDock.addEventListener('mouseleave', function(){
                self.dockItems.forEach(function(item){
                    item.isHovered = item.isNeighbor = false;
                });
                self.updateDockItems();
            });
        };
    
        self.init();
    
    })({});
    

}



