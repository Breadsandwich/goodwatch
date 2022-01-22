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
