const slider = [...document.querySelectorAll('.slider')];
const goLeft = [...document.querySelectorAll('.goLeft')];
const goRight = [...document.querySelectorAll('.goRight')];
const chart = document.querySelector('.chart');

slider.forEach((item, i) => {
    
    const chartWidth = chart.offsetWidth;
    let gap = 2;
    //console.log(item.offsetWidth);

    goRight[i].addEventListener('click', () => {
        item.style.scrollBehavior = 'smooth';
        item.scrollLeft += chartWidth + gap;
    });

    goLeft[i].addEventListener('click', () => {
        item.style.scrollBehavior = 'smooth';
        item.scrollLeft -= chartWidth + gap;
    });

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging;

    item.addEventListener('mousedown', (e) => {
        item.style.scrollBehavior = 'auto';
        e.preventDefault();
        isDragging = false;
        isDown = true;
        item.classList.add('active');
        startX = e.pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
        
    });

    document.addEventListener('mouseup', (e) => {
        isDown = false;
        item.classList.remove('active');
        if(!isDragging){
            const target = e.target.closest('a.chart');
            if(target){
                target.click();
            }
        }
        adjustScrollPosition(item, chartWidth, gap);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true
        const x = e.pageX - item.offsetLeft;
        const walk = (x - startX) * 0.5; // Sürükleme hızını ayarlamak için çarpan
        item.scrollLeft = scrollLeft - walk;
        
    });

    item.addEventListener('click', (e)=>{

        if(isDragging){
            e.preventDefault()
            return;
        }

    })

    function adjustScrollPosition(item, chartWidth, gap) {
        item.style.scrollBehavior = 'smooth';
        const scrollPosition = item.scrollLeft;
        const remainder = scrollPosition % (chartWidth + gap);
        if (remainder !== 0) {
            // burda bu kontrolun yapılma nedeni scrollLeft ile tıklama anındaki öğerinin lefte olan uzaklığını alırız sonra da scrollPosition ile de tıklama bırakıldığındaki mousenin lefte olan uzaklığını alıyor ve bunları kıyaslıyor eğer biri birinden büyükse sağa veya sola doğru cekildiği manasına geliyor mantıken
            if (scrollPosition > scrollLeft) {
                item.scrollLeft += (chartWidth + gap) - remainder;
            } else {
                item.scrollLeft -= remainder;
            }
        }
    }
}); 




//footercss

/* .footerContainer {
                    background-color: #c7f9cc;
                    max-width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 50%;
                    gap: 30px;
                    transition: all 1s ease;  
                }
                .footer span {
                    text-align: center;
                    font-family: sans-serif;
                    color: #57cc99;
                }
                .socialMediasDock {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    
                }    
                .socialMediasDock a {
                    text-decoration: none;
                    transition: width 1s ease, height 1s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .socialMediasDock a:hover {
                    
                }
                .socialMediasDock a::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    width: 0;
                    height: 0;
                    backdrop-filter: blur(13px); 
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid transparent;
                }

                @keyframes growing {
                    0% {
                        width: 70%;
                        height: 70%;
                    }
                    100% {
                        width: 85%;
                        height: 85%;
                    }
                }

                .socialMediasDock a img {
                    object-fit: contain;
                    width: 70%;
                    height: 70%;
                    transition: all 0.5s ease;
                } */



