const base = require("../airtable");
exports.getAllProperties = (req, res) => {
  base("property")
    .select({
      // Selecting the first 3 records in Grid view:
      view: "Grid view",
      pageSize: 10,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        let models = records.map(function (record) {
          return {
            _id: record.getId(),
            name: record.get("name"),
            description: record.get("description"),
            size: record.get("size"),
          };
        });
        // console.log(models);

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        res.send(models);
      },
      function done(err) {
        if (err) {
          console.error(err);
          return err;
        }
      }
    );
};

exports.addProoperties = (req, res) => {
  console.log(req.body);
  let { name, description, size } = req.body;
  base("property").create(
    [
      {
        fields: {
          name: name,
          description: description,
          size: size,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      let models = records.map(function (record) {
        return {
          _id: record.getId(),
          name: record.get("name"),
          description: record.get("description"),
          size: record.get("size"),
        };
      });
      console.log(models);
      res.send(models);
    }
  );
};
exports.deleteProperty = (req, res) => {
  let id = req.params.id;
  base("property").destroy([id], function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deleted", deletedRecords.length, "records");
    res.status(200).json("Record Deleted");
  });
};
