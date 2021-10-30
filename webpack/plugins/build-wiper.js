const fs = require('fs-extra');

//------------------------------------------------------------------------------

module.exports = class BuildWiper {
  constructor (buildPath) {
    this.buildPath = buildPath;
  }

  apply() {
    fs.emptyDirSync(this.buildPath);
  }
}
