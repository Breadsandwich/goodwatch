
    // console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
window.addEventListener("load", (event)=>{
    const hasWatchedButton = document.getElementById('watch')
    const wantsToWatchButton = document.getElementById('wantsToWatch')
    const currentlyButton = document.getElementById('currentlyWatch')

    

    const hasWatchedCount = document.getElementById('hasWatchedCount')
    const wantsToWatchCount = document.getElementById('wantsToWatchCount')
    const currentlyCount = document.getElementById('currentlyCount')

    

    hasWatchedButton.addEventListener('click', () =>{
        hasWatchedCount.innerText++
    });
    wantsToWatchButton.addEventListener('click', ()=>{
        wantsToWatchCount.innerText++
    });
    currentlyButton.addEventListener('click', ()=>{
        currentlyCount.innerText++
    });
});