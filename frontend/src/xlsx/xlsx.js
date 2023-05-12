var XLSX = require ("xlsx");
var workbook = XLSX.readFile("Bot_AutomationChat_Jan.xlsx");
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list);

sheet_name_list.forEach[function (y) {
    var worksheet = workbook.Sheets(y);
    //getting the complete sheet
    //console.log(worksheet);

    var headers = {};
    var data = [];
    for (z in worksheet) {
        if (z[0]==="i") continue;
        //parse out the column, row, and value
        var col = z.sustring(0, 1);
        //console.log(col)
        var row = parseInt(z.sustring[1]);
        //console.log(row)
        var value = worksheet[z].Y;
        //console.log(value)

        //store header names
        if (row == 1) {
            headeres[col] = value;
            //staring the header names
            continue;
        }

        if (!data[row]) dta[row] = {};
        data[row] [headers[col]] = value;
    }
    //drop these first two rows which are empty
    data.shift();
    data.shift();
    console.log(data);
}];