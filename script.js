window.onload = fetchingData;

async function fetchingData(){
    try {
        // Fetch data from the API endpoint
        let url = 'https://quadbackend.onrender.com/api/v1/ticket/all';
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        let  tablebody=document.querySelector('.tablebody');

        let imgArray=[
            'https://play-lh.googleusercontent.com/JoikhtJAr-CEcX6ptDKRSTYB8RY5dW3q_pPbqtpk7MNMNyTZ0nZLvTDe4rx8tRb-JA',
            'https://cdn-icons-png.flaticon.com/512/6675/6675833.png',
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
            'https://w7.pngwing.com/pngs/892/124/png-transparent-tron-crypto-tron-sign-tron-symbol-tron-logo-tron-coin-tron-3d-icon-thumbnail.png',
            'https://png.pngtree.com/png-clipart/20220606/ourmid/pngtree-dollar-coin-icon-3d-png-image_4899056.png',
            'https://png.pngtree.com/png-vector/20220417/ourmid/pngtree-money-coin-icon-png-image_4544131.png',
            'https://static-00.iconduck.com/assets.00/dent-cryptocurrency-icon-256x256-zrol26gq.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSNjVJBh02rFTObtOpaDWHRd3WAT6OjneAVA&s',
            'https://hodlinfo.com/static/media/zebpay.232215c8.png',
            'https://hodlinfo.com/static/media/bitbns.dcee6cf4.png',
        ]

        data.forEach((e,index)=>{
                let result=Object.entries(e);

                //option dropdown box

                document.querySelector(".jsSelect").innerHTML += `
                                            <option value="${result[1][1].toUpperCase()}">${result[1][1].toUpperCase()}</option>
                `
                let difference = result[5][1] - result[4][1] ;
                let savings=Math.abs(difference);
                difference =difference /100;
                let color;
                
                if(difference<=0){
                    color='red';
                }
                else{
                    color='#3dc6c1'
                }

                
                console.log(result)
               tablebody.innerHTML += ` 
                      <tr>
                        <td>${index+1}</td>
                        <td><img src="${imgArray[index]}" width="30px" style="margin-right:10px; border-radius:50%" >${result[1][1]}</td>
                        <td>₹${result[3][1]}</td>
                        <td>₹${result[4][1]} / ₹${result[5][1]}</td>
                        <td style="color:${color}">${difference}%</td>
                        <td style="color:${color}">₹${savings}</td>
                      </tr>
                    `
                 
        })
        startCountdown(1);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



// THEME COLOR
document.querySelector('.themeToggle').addEventListener('click', (e) => {
    
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--filterBackgroundColor').trim();
    if(currentColor==='black'){
        document.documentElement.style.setProperty('--filterBackgroundColor', 'white');                     //main background color
        document.documentElement.style.setProperty('--othercolor', '#f8f9fa');                       //select ,button backround color(white) 
        document.documentElement.style.setProperty('--selectcolor', 'black');                         //select element text color
        document.documentElement.style.setProperty('--boxshadowcolor', 'rgba(211, 211, 211, .5)');                 //boxshadow color            
        document.querySelector(".slideSpan").style.transform="translateX(-10px)";
    }
    else{
        document.documentElement.style.setProperty('--filterBackgroundColor', 'black');                 //main background color
         document.documentElement.style.setProperty('--othercolor', '#2e3241');                         //select ,button backround color(black)
         document.documentElement.style.setProperty('--selectcolor', 'white');                          //select element text color
         document.documentElement.style.setProperty('--boxshadowcolor', 'transparent');                 //boxshadow color            
        document.querySelector(".slideSpan").style.transform="translateX(10px)";
    }
});



//footer prompt pop up
document.querySelector('.addToHomeFooter').addEventListener('click',(e)=>{
    e.target.style.backgroundColor="#3dc6c1";
    e.target.style.color="white";
    setTimeout(()=>{
        e.target.style.backgroundColor="transparent";
        e.target.style.color="#3dc6c1";
    },1500)  
})


// timer span

const countdownElement = document.querySelector('.timerSpan');

function startCountdown(timer) {
    countdownElement.innerText = timer;
    if (timer < 60) {
        timer++;
        setTimeout(() => startCountdown(timer), 1000); // Call itself after 1 second
    } else {
        fetchingData(); // Call fetchingData again after 60 seconds
    }
}

