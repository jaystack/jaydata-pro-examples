function removeSplas( )
{
    $(".loading").remove();
}

function btnClick( )
{
    URLHandler.add( "schema","new" );
    URLHandler.reload( );
}

function stylerOld()
{
    $("#new").addClass("unuse");
    $("#migration-btn").on("click",btnClick);
}

function stylerNew()
{
    $("#old").addClass("unuse");
    $("#migration-btn").addClass("disabled");
}

function Main( )
{
    $("#db-content").html()
    var schema = URLHandler.get("schema");
    var schemaTypes = null;

    switch ( schema )
    {
      case "old":
          schemaTypes = makeOldDB();
          stylerOld();
      break;

      case "new":
          schemaTypes = makeNewDB( schemaTypes );
          stylerNew();
      break;

      default:
        URLHandler.add( "schema","old" );
        URLHandler.reload( );
      return;
    }

    OpenDB(function( dbItems )
    {
        $("#db-content").html(
          tableTemplate(dbItems, schemaTypes)
        )

        setTimeout(removeSplas,1000);
    });
}


window.onload = Main;
