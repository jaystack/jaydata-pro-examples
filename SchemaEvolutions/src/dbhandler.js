var dbName = "TestDB";

function makeOldDB( )
{
    $data.defineDatabase(dbName, function (container)
    {
        var Schema = {
            FirstName: String,
            LastName: String
        };

        var Person = $data.define("Person", container, Schema );

        return $data.EntityContext.extend("PeopleContext", container, {
            People: { type: $data.EntitySet, elementType: Person }
        });

    }).on("databaseCreated", function (newDB, options) {
        // you can initialize your database
        // it only runs once
        newDB.People.addMany([
          {
            FirstName: 'Donald',
            LastName: 'Duck'
          },
          {
            FirstName: 'Mickey',
            LastName: 'Mouse'
          }
        ]);
        return newDB.saveChanges();
    });

    return ["FirstName", "LastName"];
}

function makeNewDB( )
{
    $data.defineDatabase(dbName, function (container)
    {
        var Schema = {
            FirstName: String,
            LastName: String,
            EMail: String
        };

        var Person = $data.define( "Person", container, Schema );

        return $data.EntityContext.extend("PeopleContext", container, {
            People: { type: $data.EntitySet, elementType: Person }
        });

    })
      .on("databaseCreated", function (newDB, options) {
          // you can initialize your database
          // it only runs once
          newDB.People.addMany([
            {
              FirstName: 'Porky',
              LastName: 'Pig',
              EMail: "porky_pig@fakemail.com"
            },
            {
              FirstName: 'Bugs',
              LastName: 'Bunny',
              EMail: "bugs_bunny@fakemail.com"
            }
          ]);
          return newDB.saveChanges();
      })
      .on("schemaChanged", function (oldDb, newDB, options) {
          // simple migration, copy everything
          return oldDb.People.toArray()
          .then(function(oldValues) {
              oldValues.forEach(function(person)
              {
                  person.Id = undefined;
                  person.EMail = (
                    person.FirstName.toLowerCase() + "_" +
                    person.LastName.toLowerCase() + "@fakemail.com"
                  );
              });
              newDB.People.addMany(oldValues);
              return newDB.saveChanges();
          })

      });

      return ["FirstName", "LastName", "EMail"];
}

function OpenDB( callback )
{
    return $data.openDatabase(dbName)
    .then(function (db) {

        db.People.toArray()
        .then(callback);
    })
    .fail(function (e) {
        console.error(e);
    });
}
