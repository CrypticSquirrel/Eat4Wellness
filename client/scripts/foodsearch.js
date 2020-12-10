/* ---------------------------- Global Variables ---------------------------- */

const fieldEl = document.getElementById('filter-field');
const typeEl = document.getElementById('filter-type');
const valueEl = document.getElementById('filter-value');

/* ----------------------------- Table Generator ---------------------------- */
function generateTable(json) {
    // create Tabulator on DOM element with id "example-table"
    const table = new Tabulator('#example-table', {
        data: json, // assign data to table
        layout: 'fitColumns',
        columns: [
            // Define Table Columns
            { title: 'Customer ID', field: 'customer_id', sorter: 'number' },
            { title: 'Customer Name', field: 'cust_name' },
        ],
    });

    const customFilter = data => data.car && data.rating < 3;

    // Trigger setFilter function with correct parameters
    const updateFilter = () => {
        const filterVal = fieldEl.options[fieldEl.selectedIndex].value;
        const typeVal = typeEl.options[typeEl.selectedIndex].value;

        const filter = filterVal == 'function' ? customFilter : filterVal;

        if (filterVal == 'function') {
            typeEl.disabled = true;
            valueEl.disabled = true;
        } else {
            typeEl.disabled = false;
            valueEl.disabled = false;
        }

        if (filterVal) {
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
}

/* ---------------------------- JQuery Click Handlers ---------------------------- */

$(document).ready(function() {

        var tabledata = [
            {id:1, name:"Oli Bob" },
            {id:2, name:"Mary May" },
            {id:3, name:"Christine Lobowski" },
            {id:4, name:"Brendon Philips" },
            {id:5, name:"Margret Marmajuke" },
            {id:6, name:"Frank Harbours" },
        ];

        generateTable(json);
});
