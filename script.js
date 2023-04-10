let myLeads = [];
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

// To save the tab url
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    // add the <a> and open link in new tab
    // listItem += "<li><a href = '"+ myLeads[i] +"' target='_blank'>" + myLeads[i] + "</a></li>";

    // template string is used to write code in new line (readable format) and ${variable_name} used to make dyanmic
    listItem += `<li>
                  <a href = '${leads[i]}' target='_blank'> ${leads[i]}  </a>
                </li>`;
    // console.log(listItem)
  }
  // here DOM manipulation is costly so we are doing it outside the for loop
  ulEl.innerHTML = listItem;
}

//  delete all leads from local storage,myLeads and DOM
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

//  Add leads to dom
saveBtn.addEventListener("click", function () {
  let textInput = inputEl.value;
  myLeads.push(textInput);
  // clear input filed after click on save button
  inputEl.value = "";
  // store the myLeads into local storage and JSON.stringifyis used to convert array into string
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  console.log(myLeads);
  render(myLeads);
});

// DEPLOY the extension
//1.http://127.0.0.1:5500/chrome-extension/
//2.enable developer mode
//3.click on load unpacked
// 4. select the extension folder
// 5.To see our extension click on puzzel icon

// Now we will learn about local storage - It is used to store data locally and it is save in key-value pair
// Here we are trying to store array in local storage and it does not work to store the array, so we convert array into string using JSON.stringify() and JSON.parse() to convert string back to array

// Falsy values //
// false
// 0
// ""
// null->how you as a developer signalize emptiness
// undefined-> how JavaScript signalizes emptiness
// NaN

// Truthsy values
// string->"sonali"
// true

// What are argument and parameter
// parameters are used while declaring the function and used inside function i.e function add (a,b){ let sum = a+b;} Here a,b are parameters
// Arrguments are used while calling the fuction and used outside function i.e add(5,10) here 5 and 10 are arguments

// Assignment
// console.log(  Boolean("")   ) // false
//console.log(  Boolean("0")  ) //true
//console.log(  Boolean(100)  ) //true
//console.log(  Boolean(null) ) //false
//console.log(  Boolean([0])  ) //true
//console.log(  Boolean(-0)   ) //false
