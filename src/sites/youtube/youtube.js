/* eslint-disable */




// document.addEventListener("DOMContentLoaded", (e) => { 

    
// })
// document.body.style.display = 'none'

//  setTimeout(() => {



//  }, 1000)

// if (document.readyState === 'complete') {
//     var loolsubButton = document.getElementById('subscribe-button');
//     lo0=lsubButton.style.display = 'none'
// }
// document.addEventListener('DOMContentLoaded', (e) => { 
//     const subButton = document.getElementById('subscribe-button')
//     subButton.style.display = 'none'

//  })


// document.body.addEventListener("yt-navigate-finish", (e) => { 
//     if (!subButton || subButton.querySelector) return

//     var subButton = document.querySelector('.style-scope.ytd-video-secondary-info-renderer#subscribe-button')
    
//     subButton.style.display = 'none'

//  })




 document.addEventListener("yt-navigate-finish", (e) => { 

    var jeff = document.getElementById('logo')
    jeff.style.display = 'none'


        // var subBtn = document.querySelectorAll("[id='subscribe-button']")[1]; 
        // var paperBtn = document.createElement('paper-button'); 
        // subBtn.insertBefore(paperBtn, subBtn.firstChild); 


        // setInterval(() => {
        //     if (document.readyState != 'complete') return;
        //     const subButton = document.querySelector('.style-scope.ytd-video-secondary-info-renderer#subscribe-button');
        //     subButton.style.display = 'none';
        // }, 100)

        
            const b = document.querySelector('.style-scope.ytd-video-secondary-info-renderer#subscribe-button'); 
            b.style.display = "none";
     

});


