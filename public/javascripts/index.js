window.addEventListener("load", async (event) => {
    const watchlistUl = document.getElementsByClassName("watchlist-ul")[0];
    const addButton = document.getElementsByClassName("add-watchlist");

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
                    const newA = document.createElement("a");
                    newA.innerText = newWatchlist;
                    newA.href = `/watchlists/${data.newId}`;
                    newLi.appendChild(newA);
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

    const textArea = document.getElementById("review-text");
    const ratingMenu = document.getElementById("ratingMenu");
    const postButton = document.getElementById("write-button");
    const reviewsContainer = document.getElementById("reviews-container");
    const showId = document.getElementById("showId").innerText;

    postButton.addEventListener("click", async () => {
        const review = textArea.value;
        const rating = ratingMenu.value;


        const res = await fetch(`/shows/${showId}/reviews-api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                review,
                rating
            })
        });


        const data = await res.json();

        if (data.message === "success") {
            console.log(data)
            const reviewP = document.createElement("p");
            reviewP.innerText = review;
            const ratingP = document.createElement("p");
            ratingP.innerText = rating;
            reviewsContainer.appendChild(reviewP);
            reviewsContainer.appendChild(ratingP);
            textArea.value = "";
        } else {
            console.log(data)
        }

    });

    const checkBox = document.getElementsByClassName("checkbox");

    for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].addEventListener("change", async () => {
            let status = false;
            const name = parseInt(checkBox[i].name, 10);

            if (checkBox[i].checked) {
                status = true;
            } else {
                status = false;
            }

            const res = await fetch(`/shows/${showId}/checkbox-api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, status })
            });
        });
    }
})
