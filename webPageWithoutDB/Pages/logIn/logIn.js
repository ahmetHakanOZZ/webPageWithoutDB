
var gizleButon = document.querySelector(".gizle");

var gizleImg = document.querySelector(".gizle img");

var eMail = document.querySelector(".email");

var passWord = document.querySelector(".password");

var girişYap = document.querySelector(".girisYap");

var passWordV = document.querySelector(".password").value;

var userNameV = document.querySelector(".email").value;

gizleButon.addEventListener("click", gizleGoster);
passWord.addEventListener("input", openSide);


girişYap.addEventListener('click', async (event) => {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const userNameV = eMail.value;
    const passWordV = passWord.value;

    try {
        const response = await fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userNameV, passWordV }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Giriş başarılı:', data);
            window.location.href = 'http://localhost/LogInPage/Page/mainPage.html';
        }
        else {
            console.log('Giriş başarısız:', data.message);
        }
    } catch (error) {
        console.error('Ağ hatası:', error);
    }
});



function check (){

    fetch('http://localhost:3002/usernames',{
        
    })
        .then(response => response.json())
        .then(data =>{
            /* for (item of data){
                const id = item.id
                console.log(id)
            } */
            //console.log(data[0])
            data.forEach(item=>{
                const id = item.id
                const username = item.username
                const password = item.password
                console.log(`id:${id}, username:${username}, password:${password}`)
            }) 
            
        })
        .catch(error => {
            console.error('API isteği başarısız:', error);
        });
    
    const loginData = {
        email: eMail,
        password: passWord
    };
    
    // Fetch isteği
    /* fetch('http://localhost:3001/login', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Sunucudan gelen cevap
    })
    .catch(error => {
        console.log('Hata:', error);
    });  */

}

gizleButon.style.opacity = "0";


function openSide(){

    if (gizleButon.style.opacity === "0") {
        gizleButon.style.opacity = "1"; 
        gizleButon.style.position = "absolute";
        gizleButon.style.top = passWord.offsetTop + (passWord.offsetHeight - gizleButon.offsetHeight) / 2 + "px";
        gizleButon.style.left = passWord.offsetLeft + passWord.offsetWidth + 10 + "px";

    }else if(passWord.value === ""){
        gizleButon.style.opacity = "0";
        
    }

}

const show = "../images/show.png";
const hide = "../images/hide.png";

function gizleGoster(){

    if(passWord.type === "text"){

        passWord.type = "password";
        gizleImg.src = hide;
        

    }else{

        passWord.type = "text";
        gizleImg.src = show;

    }

}

var sidebar = document.querySelector(".sidebar");
var sidebarButton = document.querySelector(".sidebarButton");
/* sidebarButton.addEventListener('click', function() {
    sidebar.style.opacity = sidebar.style.opacity === "0" ? "1" : "0";
}); */

sidebar.style.left = "-250px";

var openClose = () => {

    console.log("calıstı");
    if(sidebar.style.left === "-250px"){
        sidebar.style.left = "0px"
    }else{
        sidebar.style.left = "-250px"
    }

}

sidebarButton.addEventListener('click', openClose);

/* sidebar.style.opacity = "0";

var openClose = () => {
    console.log('Button clicked!'); 
    if(sidebar.style.opacity === "0") {
        sidebar.style.opacity = "1";
    } else {
        sidebar.style.opacity = "0"
    }
}

sidebarButton.addEventListener('click', openClose); */



/* const sidebarContainer = document.querySelector('.sidebar');
const lines = document.querySelectorAll('.line');

sidebarContainer.addEventListener('click', function() {
    lines.forEach(line => line.classList.toggle('active'));
});
  */





