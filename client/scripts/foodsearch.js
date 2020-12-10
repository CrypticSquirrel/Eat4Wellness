/* ---------------------------- Global Variables ---------------------------- */

const fieldEl = document.getElementById('filter-field');
const typeEl = document.getElementById('filter-type');
const valueEl = document.getElementById('filter-value');

/* ----------------------------- Table Generator ---------------------------- */

var tableData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
]

// create Tabulator on DOM element with id "example-table"
const table = new Tabulator('#example-table', {
    data:tableData, // assign data to table
    layout: 'fitColumns',
    columns:[
        {title:"Name", field:"name"},
        {title:"Age", field:"age"},
        {title:"Gender", field:"gender"},
        {title:"Height", field:"height"},
        {title:"Favourite Color", field:"col"},
        {title:"Date Of Birth", field:"dob"},
        {title:"Cheese Preference", field:"cheese"},
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