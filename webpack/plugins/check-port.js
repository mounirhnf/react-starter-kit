const net = require('net');
const chalk = require('react-dev-utils/chalk');

//------------------------------------------------------------------------------

/**
 * Check if a port is already in use
 * @param {number} port Target port to check
 * @param {(inUse: boolean) => void} result A callback that provides the result
 */
function portInUse(port, result) {
  const server = net.createServer();

  // Handle port is used
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      result(true);
    };
  });

  // Handle port is free to use
  server.once('listening', () => {
    server.close();
    result(false);
  });

  server.listen(port);
};

//------------------------------------------------------------------------------

const pluginName = 'check-port-plugin';

module.exports = class CheckPortPlugin {
  constructor(port) {
    this.port = port;
  }

  apply(compiler) {
    // Check port before compilation happens
    compiler.hooks.initialize.tap(pluginName, () => {
      portInUse(this.port, (isInUse) => {
        if (isInUse) {
          console.log(chalk.yellow(`Port ${this.port} is already in use`));
          process.exit(1);
        }
      });
    });
  }
}
