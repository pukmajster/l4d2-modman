var fs = require("fs");
var path = require("path");

export function writeAddonInfo(gameDir: string, addons: string) {
  console.log("DOING SOMETHNIG");

  try {
    fs.writeFile(path.join(gameDir, "addonlist.txt"), addons, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("File succesfully saved to disk.");
    });

    return "success";
  } catch {
    return "shit";
  }
}
