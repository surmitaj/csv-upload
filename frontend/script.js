document.getElementById('uploadBtn').addEventListener('click', async (event) => {
    event.preventDefault(); 
    listFiles()
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'text/csv'
            }
        });
        const result = await response.json();
        displayFileList(result.data);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

function displayFileList(data) {
    const fileListDiv = document.getElementById('fileList');

    if (data.length === 0) {
        fileListDiv.innerHTML = '<p>No data found.</p>';
        return;
    }

    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const headerRow = table.insertRow();
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    data.forEach(row => {
        const tr = table.insertRow();
        headers.forEach(header => {
            const cell = tr.insertCell();
            cell.textContent = row[header];
        });
    });

    fileListDiv.appendChild(table);
}

async function listFiles() {
    try {
        const response = await fetch('/upload/list');
        const data = await response.json();

        const fileListDiv = document.getElementById('fileList');
        fileListDiv.innerHTML = '<h3>Click on the filename whose content you wish to view:</h3>'

        if (data.data.length === 0) {
            fileListDiv.innerHTML = '<p>No files uploaded.</p>';
            return;
        }

        const ul = document.createElement('ul');
        data.data.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file;
            li.addEventListener('click', () => {
                listFiles()
                displayFileContents(file)}
            );
            ul.appendChild(li);
        });
        fileListDiv.appendChild(ul);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}


async function displayFileContents(fileName) {
    try {
        const response = await fetch(`/upload/${fileName}`);
        const data = await response.json();

        displayFileList(data.data);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

window.addEventListener('DOMContentLoaded', listFiles);