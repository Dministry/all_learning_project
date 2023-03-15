//Ajax JSON
// document.getElementById('button1').addEventListener('click', loadCustomer);
// document.getElementById('button2').addEventListener('click', loadCustomers);
document.getElementById('get-jokes').addEventListener('click', getJokes);

function loadCustomer(e) {
    //Create an XHR object
    const xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'customer.json', true)
    //on loads
    xhr.onload = function () {
        if (this.status === 200) {
            const customer = JSON.parse(this.responseText);
            const output = `
            <ul>
            <li>${customer.id}</li>
            <li>${customer.name}</li>
            <li>${customer.company}</li>
            <li>${customer.phone}</li>
            </ul>
            `
            document.getElementById('customer').innerHTML = output;
        }
    }
    xhr.send();
}

//GET Customers


function loadCustomers(e) {
    //Create an XHR object
    const xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'customers.json', true)
    //on loads
    xhr.onload = function () {
        if (this.status === 200) {
            const customers = JSON.parse(this.responseText);
            let output = '';
            //Loop through customers
            customers.forEach(function (customer) {
                output += `
            <ul>
            <li>${customer.id}</li>
            <li>${customer.name}</li>
            <li>${customer.company}</li>
            <li>${customer.phone}</li>
            </ul>
            `
            });

            document.getElementById('customers').innerHTML = output;
        }
    }
    xhr.send();
}

//Chuck Norris Jokes
function getJokes(e) {
    const number = document.getElementById('number').value;
    //Create an XHR object
    const xhr = new XMLHttpRequest;
    //open
    //Url is suppose to get number from the input and add to the url to get some numbers of jokes
    xhr.open('GET', `https://api.chucknorris.io/jokes/${number}`, true);
    //load
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText)
            const response = JSON.parse(this.responseText);
            let output = '';
            if (response.type === 'success') {
                response.value.forEach(function (joke) {
                    console.log(this.response)
                    output += `<li>${random}</li>`;
                });
                console.log(this.response)
            } else {
                output += '<li>Something went wrong</li>'
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();
    e.preventDefault();
}
