
window.addEventListener("load", async (event) => {
    const watchlistUl = document.getElementsByClassName("watchlist-ul")[0];
    const addButton = document.getElementsByClassName("add-watchlist");



    // console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

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

    console.log("hello from javascript!")


    for (let i = 0; i < addButton.length; i++) {
        addButton[i].addEventListener("click", () => {
            addButton[i].disabled = true;
            const cancelButton = document.createElement("button");
            cancelButton.innerText = "cancel";
            const newInput = document.createElement("input");
            newInput.type = "text";
            newInput.placeholder = "name";
            const submitButton = document.createElement("button");
            submitButton.innerText = "submit";
            const error = document.createElement("span");

            watchlistUl.appendChild(newInput);
            watchlistUl.appendChild(submitButton);
            watchlistUl.appendChild(cancelButton);

            cancelButton.addEventListener("click", () => {
                addButton[i].disabled = false;
                newInput.remove();
                cancelButton.remove();
                submitButton.remove();
                error.remove();
            });

            submitButton.addEventListener("click", async () => {
                const newWatchlist = newInput.value;
                const res = await fetch("/watchlists/api-create", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: newWatchlist })
                });

                const data = await res.json();

                if (data.message === "success") {
                    const newLi = document.createElement("li");
                    newLi.innerText = newWatchlist;
                    watchlistUl.appendChild(newLi);
                    newInput.remove();
                    submitButton.remove();
                    error.remove();
                    cancelButton.remove();
                    addButton[i].disabled = false;
                } else {
                    error.innerText = data.errors[0];
                    watchlistUl.appendChild(error);
                }
            });
        });
    }
})

