document.getElementById('button').addEventListener('click', loadData);

function loadData() {
    //Create XHR Object
    const xhr = new XMLHttpRequest();
    //Open
    xhr.open('GET', 'data.txt', true);
    //On loads
    xhr.onload = function () {
        if (this.status === 200) {
            document.getElementById('output').innerHTML = `<h4>${this.responseText}</h4>`
        }
    }
    xhr.send();
}

