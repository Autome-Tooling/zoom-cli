const { expect } = require('chai');
const chai = require('chai'),
      path = require('path');
chai.expect();
const spies = require('chai-spies');

chai.use(spies);

let Config = require(path.join(__dirname, '../utils', 'config'));

describe("Config", () => {

  describe("getPath", () => {

    it('should create config if not present', () => {
      chai.spy.on(path, resolve, () => {
        console.log("wow");
        return 'wow'
      });

      expect(Config.getPath()).equal("wow");
    });
  });
});