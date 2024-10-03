function getScratchProject() {
    const projectId = document.getElementById("projectId").value;
    const embedContainer = document.getElementById("embed");

    if (!projectId) {
        alert("Please enter a valid Scratch project ID!");
        return;
    }

    // Use a public CORS proxy to bypass CORS restrictions
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.scratch.mit.edu/projects/${projectId}`;

    fetch(proxyUrl + apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Project not found!");
            }
            return response.json();
        })
        .then(data => {
            embedContainer.innerHTML = `
                <h2><a href="https://scratch.mit.edu/projects/${projectId}/" target="_blank">${data.title}</a></h2>
                <p>by <strong>${data.author.username}</strong></p>
                <img src="${data.images[480]}" alt="${data.title} thumbnail">
                <p>${data.description}</p>
            `;

            embedContainer.style.display = 'block';
        })
        .catch(error => {
            alert("Error: " + error.message);
            embedContainer.style.display = 'none';
        });
}
