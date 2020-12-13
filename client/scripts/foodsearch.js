/* ---------------------------- Global Variables ---------------------------- */

const fieldEl = document.getElementById('filter-field');
const typeEl = document.getElementById('filter-type');
const valueEl = document.getElementById('filter-value');

/* ----------------------------- Table Generator ---------------------------- */

var tableData = [
    {id:1, name:"Bagel", gender:"140 cal" },
    {id:2, name:"Cereal", gender:"135 cal"},
    {id:3, name:"Macaroni", gender:"238 cal"},
    {id:4, name:"apple", gender:"80 cal"},
    {id:5, name:"Banana", gender:"110 cal"},
    {id:6, name:"Lime", gender:"20 cal"},
    {id:7, name:"Ground beef", gender:"289 cal"},
    {id:8, name:"Chicken", gender:"205 cal"},
    {id:9, name:"Pork Loin", gender:"190 cal"},
    {id:10, name:"Turkey", gender:"170 cal"},
    {id:11, name:"Bacon", gender:"552 cal"},
    {id:12, name:"pasta", gender:"330 cal"},
    {id:13, name:"Potato", gender:"210 cal"},
    {id:14, name:"Rice", gender:"200 cal"},
    {id:15, name:"Crab Fish", gender:"200 cal"},
    {id:16, name:"Cod fresh", gender:"150 cal"},
    {id:17, name:"Duck Roast", gender:"400 cal"},
    {id:18, name:"Lobster boiled", gender:"200 cal"},
    {id:19, name:"Luncheon meat", gender:"300 cal"},
    {id:20, name:"Big Mac", gender:"540 cal"},
    {id:21, name:"French Fries", gender:"222-365 cal"},
]

// create Tabulator on DOM element with id "example-table"
const table = new Tabulator('#example-table', {
    data:tableData, // assign data to table
    layout: 'fitColumns',
    columns:[
        {title:"Name", field:"name"},
        {title:"Gender", field:"gender"},
        ,
    ],
});

// Trigger setFilter function with correct parameters
const updateFilter = () => {
    const filter = fieldEl.options[fieldEl.selectedIndex].value;
    const typeVal = typeEl.options[typeEl.selectedIndex].value;

    if (filter == 'function') {
        typeEl.disabled = true;
        valueEl.disabled = true;
    } else {
        typeEl.disabled = false;
        valueEl.disabled = false;
    }

    if (filter) {
        table.setFilter(filter, typeVal, valueEl.value);
    }
};

document.getElementById('download-csv').addEventListener('click', function() {
    table.download('csv', 'data.csv');
});

// Update filters on value change
document.getElementById('filter-field').addEventListener('change', updateFilter);
document.getElementById('filter-type').addEventListener('change', updateFilter);
document.getElementById('filter-value').addEventListener('keyup', updateFilter);