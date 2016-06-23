Usage

fetch('https://mywebsite.com/endpoint/')
Include a request object as the optional second argument to customize the HTTP request:

fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
Async

fetch returns a Promise that can be processed in two ways:

Using then and catch in synchronous code:

fetch('https://mywebsite.com/endpoint.php')
.then((response) => response.text())
.then((responseText) => {
  console.log(responseText);
})
.catch((error) => {
  console.warn(error);
});
Called within an asynchronous function using ES7 async/await syntax:

class MyComponent extends React.Component {
...
async getUsersFromApi() {
  try {
    let response = await fetch('https://mywebsite.com/endpoint/');
    let responseJson = await response.json();
    return responseJson.users;
  } catch(error) {
    // Handle error
    console.error(error);
  }
}
...
}
Note: Errors thrown by rejected Promises need to be caught, or they will be swallowed silently

WebSocket
WebSocket is a protocol providing full-duplex communication channels over a single TCP connection.

var ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something');
};

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};
XMLHttpRequest
XMLHttpRequest API is implemented on-top of iOS networking apis and OkHttp. The notable difference from web is the security model: you can read from arbitrary websites on the internet since there is no concept of CORS.

var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'https://mywebsite.com/endpoint.php');
request.send();
You can also use -

var request = new XMLHttpRequest();

function onLoad() {
    console.log(request.status);
    console.log(request.responseText);
};

function onTimeout() {
    console.log('Timeout');
    console.log(request.responseText);
};

function onError() {
    console.log('General network error');
    console.log(request.responseText);
};

request.onload = onLoad;
request.ontimeout = onTimeout;
request.onerror = onError;
request.open('GET', 'https://mywebsite.com/endpoint.php');
request.send();
Please follow the MDN Documentation for a complete description of the API.

As a developer, you're probably not going to use XMLHttpRequest directly as its API is very tedious to work with. But the fact that it is implemented and compatible with the browser API gives you the ability to use third-party libraries such as frisbee or axios directly from npm.



GET requests
Sending a GET request to a JSON API is the simplest use case. Just call fetch and supply it with the appropriate URL. It returns a promise that can be parsed as usual:
fetch('/users.json')  
  .then(function(response) {
    return response.json()
  })
POST requests
When submitting a POST request, supply the URL as the first argument and an object containing the request information as the second argument.
There are two things to note:
Make sure you send the correct headers. Otherwise, the payload won’t get through.
Stringify the JSON payload before sending it.
As an example, follow the documetation on the React Native website:
fetch('https://mywebsite.com/endpoint/', {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
Or add in some ES6!
Because React Native ships with the Babel Javascript Compiler as of version 0.5.0, we are free to use ES6 enhanced object literals and template strings!
let email = "joe@example.com";  
let password = "donkeybrains";  
let myApiUrl = "http://www.example.com/api"  
let usersPath = "users"
fetch(`${myApiUrl}/${usersPath}`, {  
  .
  .
  body: JSON.stringify({
    user: {email, password}
  })
})
Handling API error codes
The React Native documentation warns us that “Errors thrown by rejected Promises need to be caught, or they will be swallowed silently”, which is true — but it is not the only concern.
The thing is, fetch only returns an error when when there is a network error or when something else gets in the way of the network request completing. It does not throw an error if your authentication fails, for instance.
That means that we need to handle HTTP status codes ourself. A good way to do this is to add an API handler utility as recommended in the GitHub page mentioned above.
I like to create a new ApiUtils module to collect my API utility methods:
// ApiUtils.js
var ApiUtils = {  
  checkStatus: function(response) {
    // https://github.com/github/fetch
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};
export { ApiUtils as default };
Our utility takes the Promise response from fetch and checks to see whether the status code is in the 200s. If so, the response is returned back as a promise. If not, an error is thrown, which we will then catch.
Here is a new API object that now employs our ApiUtils.checkStatus method:
// Api.js
import ApiUtils from './ApiUtils'
var Api = {  
  getItems: function() {
    return fetch(someUrl)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .catch(e => e)
  },
  .
  .
And that’s about it :)
