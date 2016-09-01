function tableTemplate( data, types )
{
    var template ="<table class=\"table nocollapse\"><thead>{{#dbDataTypes}}</thead><tbody>{{#dbData}}</tbody></table>";

    var dbData = [];
    data.forEach(function( dataItem )
    {
        dbData.push("<tr>");
        types.forEach(function( typeItem )
        {
            dbData.push("<td>"+dataItem[typeItem]+"</td>");
        });
        dbData.push("</tr>");
    });

    var dbDataTypes = [];
    types.forEach(function( typeItem )
    {
        dbDataTypes.push("<th>"+typeItem+"</th>");
    });

    return template
    .replace("{{#dbData}}",dbData.join(""))
    .replace("{{#dbDataTypes}}", dbDataTypes.join(""));
}
