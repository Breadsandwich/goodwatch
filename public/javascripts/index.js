window.addEventListener("load", async (event) => {
    const watchlistUl = document.getElementsByClassName("watchlist-ul")[0];
    const addButton = document.getElementsByClassName("add-watchlist");
    const watchStatusButton = document.getElementById("watch-status");
    let showId = document.getElementById("showId");
    if (showId) showId = showId.innerText;
    let userId = document.getElementById("userId");
    if (userId) userId = userId.innerText;
    const singleReviewsDiv = document.getElementsByClassName("single-reviews");

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

                    if (showId) {
                        const newCheckBox = document.createElement("input");
                        newCheckBox.type = "checkbox";
                        newCheckBox.class = "checkbox";
                        newCheckBox.name = data.newId;

                        newCheckBox.addEventListener("change", async () => {
                            let status = false;
                            const name = parseInt(newCheckBox.name, 10);

                            if (newCheckBox.checked) {
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
                        newLi.appendChild(newCheckBox);
                    }
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
                rating,
            })
        });

        const data = await res.json();

        if (data.message === "success") {
            console.log(data)

            const editButton = document.createElement("button");
            editButton.innerText = "edit";
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "delete"
            const reviewP = document.createElement("p");
            reviewP.innerText = review;
            const ratingP = document.createElement("p");
            ratingP.innerText = `score: ${rating} / 5`;
            reviewsContainer.appendChild(reviewP);
            reviewsContainer.appendChild(ratingP);
            reviewsContainer.appendChild(editButton);
            reviewsContainer.appendChild(deleteButton);
            textArea.value = "";

            editButton.addEventListener("click", async () => {
                editButton.remove();
                deleteButton.remove();
                reviewP.remove();
                ratingP.remove();

                const editField = document.createElement("textarea");
                editField.value = reviewP.innerText;
                const editRatingField = document.createElement("select");
                for (let i = 1; i < 6; i++) {
                    const val = document.createElement("option");
                    val.value = i;
                    val.innerText = i;
                    editRatingField.appendChild(val);
                }
                const submitEdit = document.createElement("button");
                submitEdit.innerText = "submit";
                const cancelEdit = document.createElement("button");
                cancelEdit.innerText = "cancel"

                reviewsContainer.appendChild(editField);
                reviewsContainer.appendChild(editRatingField);
                reviewsContainer.appendChild(submitEdit);
                reviewsContainer.appendChild(cancelEdit);

                submitEdit.addEventListener("click", async () => {
                    const reviewId = data.reviewId;
                    const review = editField.value;
                    const rating = editRatingField.value;

                    const res = await fetch(`/shows/${showId}/submit-reviews-api`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ reviewId, review, rating })
                    });

                    editField.remove();
                    editRatingField.remove();
                    submitEdit.remove();
                    cancelEdit.remove();

                    reviewP.innerText = review;
                    ratingP.innerText = rating;
                    reviewsContainer.appendChild(reviewP);
                    reviewsContainer.appendChild(ratingP);
                    reviewsContainer.appendChild(editButton);
                    reviewsContainer.appendChild(deleteButton);
                });

                cancelEdit.addEventListener("click", () => {
                    editField.remove();
                    editRatingField.remove();
                    submitEdit.remove();
                    cancelEdit.remove();

                    reviewsContainer.appendChild(reviewP);
                    reviewsContainer.appendChild(ratingP);
                    reviewsContainer.appendChild(editButton);
                    reviewsContainer.appendChild(deleteButton);
                });
            });

            deleteButton.addEventListener("click", async () => {
                const reviewId = data.reviewId;
                reviewP.remove();
                ratingP.remove();
                editButton.remove();
                deleteButton.remove();

                const res = await fetch(`/shows/${showId}/delete-reviews-api`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reviewId })
                });

            });

        } else {
            console.log(data)
            postButton.disabled = true;
            const warning = document.createElement("span");
            warning.innerText = "You need to login!"
            warning.style.color = "red";
            reviewsContainer.appendChild(warning);
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

            // if (i === 0) {
            //     watchStatusButton.checked = status;
            // }

            const res = await fetch(`/shows/${showId}/checkbox-api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, status })
            });
        });
    }

    for (let i = 0; i < singleReviewsDiv.length; i++) {
        const val = singleReviewsDiv[i].attributes.userId.value;

        if (val === userId) {
            const editButton = document.createElement("button");
            editButton.innerText = "edit";
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "delete"

            singleReviewsDiv[i].appendChild(editButton);
            singleReviewsDiv[i].appendChild(deleteButton);

            editButton.addEventListener("click", async () => {
                const currentField = singleReviewsDiv[i].getElementsByTagName("p")[0];
                const currentText = singleReviewsDiv[i].attributes.inside.value;
                const currentRatingField = singleReviewsDiv[i].getElementsByTagName("p")[1];

                currentField.remove();
                currentRatingField.remove();
                editButton.remove();
                deleteButton.remove();

                const editTextField = document.createElement("textarea");
                editTextField.value = currentText;

                const editRatingForm = document.createElement("select");
                for (let i = 1; i < 6; i++) {
                    const val = document.createElement("option");
                    val.value = i;
                    val.innerText = i;
                    editRatingForm.appendChild(val);
                }

                const submitEdit = document.createElement("button");
                submitEdit.innerText = "submit";
                const cancelEdit = document.createElement("button");
                cancelEdit.innerText = "cancel";

                singleReviewsDiv[i].appendChild(editTextField);
                singleReviewsDiv[i].appendChild(editRatingForm);
                singleReviewsDiv[i].appendChild(submitEdit);
                singleReviewsDiv[i].appendChild(cancelEdit);

                submitEdit.addEventListener("click", async () => {
                    const review = editTextField.value;
                    const rating = editRatingForm.value;
                    const reviewId = singleReviewsDiv[i].attributes.reviewId.value;

                    const res = await fetch(`/shows/${showId}/submit-reviews-api`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ reviewId, review, rating })
                    });

                    const data = await res.json();

                    if (data.message === "success") {
                        editTextField.remove();
                        editRatingForm.remove();
                        submitEdit.remove();
                        cancelEdit.remove();

                        currentField.innerText = review;
                        currentRatingField.innerText = rating;
                        singleReviewsDiv[i].appendChild(currentField)
                        singleReviewsDiv[i].appendChild(currentRatingField)
                        singleReviewsDiv[i].appendChild(editButton)
                        singleReviewsDiv[i].appendChild(deleteButton)
                    } else {
                        // TODO HANDLE ERRORS
                    }
                });

                cancelEdit.addEventListener("click", () => {
                    editTextField.remove();
                    editRatingForm.remove();
                    submitEdit.remove();
                    cancelEdit.remove();

                    singleReviewsDiv[i].appendChild(currentField)
                    singleReviewsDiv[i].appendChild(currentRatingField)
                    singleReviewsDiv[i].appendChild(editButton)
                    singleReviewsDiv[i].appendChild(deleteButton)
                });
            });

            deleteButton.addEventListener("click", async () => {
                const reviewId = singleReviewsDiv[i].attributes.reviewId.value;
                const currentField = singleReviewsDiv[i].getElementsByTagName("p")[0];
                const currentRatingField = singleReviewsDiv[i].getElementsByTagName("p")[1];
                currentField.remove();
                currentRatingField.remove();
                editButton.remove();
                deleteButton.remove();

                const res = await fetch(`/shows/${showId}/delete-reviews-api`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reviewId })
                });

            });
        }
    }
});
