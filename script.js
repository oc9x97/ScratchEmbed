// script.js

function getScratchProject() {
    const projectId = document.getElementById("projectId").value;
    const embedContainer = document.getElementById("embed");

    if (!projectId) {
        alert("Please enter a valid Scratch project ID!");
        return;
    }

    // Fetch Scratch project data from Scratch API
    fetch(`https://api.scratch.mit.edu/projects/${projectId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Project not found!");
            }
            return response.json();
        })
        .then(data => {
            // Inject the fetched data into the embed structure
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
