

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

window.addEventListener("load", (event) => {
    console.log("hello from javascript!")

    const addButton = document.getElementById("add-watchlist");

    addButton.addEventListener("click", async () => {

        const res = await fetch("/watchlists/api-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "hello" }),
        });

        const data = await res.json();

        if (data.message === "success") {
            console.log(data)
        } else {
            console.log(data)
        }

    });
})

