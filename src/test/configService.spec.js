import chai, { config } from 'chai'
import { expect } from 'chai'
import spies from 'chai-spies'
import sinon from 'sinon'
import ConfigService from '../services/configService'
import fs from 'fs'
import { homedir } from 'os'
import Platform from '../utils/platform'

chai.expect();
chai.use(spies);

const CONFIG_TEST_PATH = __dirname + '/.zoom-test-config-file';

describe("Config Service", () => {

  let configService;

  before(() => {
    configService = new ConfigService();
  });

  beforeEach(() => {
    if (fs.existsSync(CONFIG_TEST_PATH)) {
      fs.unlinkSync(CONFIG_TEST_PATH);
    }
  });

  it('should create config if not present', () => {
    sinon.stub(configService, 'getPath').returns(CONFIG_TEST_PATH);

    let result = configService.create();

    expect(result).to.equal(0);
    expect(fs.existsSync(CONFIG_TEST_PATH)).to.be.true;

    sinon.rese
  });

  it('should not create config if already present', () => {
    sinon.stub(configService, 'getPath').returns(CONFIG_TEST_PATH);

    if (!fs.existsSync(CONFIG_TEST_PATH)) {
      fs.writeFileSync(CONFIG_TEST_PATH, '');
    }

    let result = configService.create();

    expect(result).to.equal(0);
    expect(fs.existsSync(CONFIG_TEST_PATH)).to.be.true;
  });

  it('should return true if config exists', () => {
    sinon.stub(configService, 'getPath').returns(CONFIG_TEST_PATH);

    if (!fs.existsSync(CONFIG_TEST_PATH)) {
      fs.writeFileSync(CONFIG_TEST_PATH, '');
    }

    let result = configService.configExists();

    expect(result).to.be.true;
  });

  it ('should return false if config does not exist', () => {
    sinon.stub(configService, 'getPath').returns(CONFIG_TEST_PATH);

    let result = configService.configExists();

    expect(result).to.be.false;
  });

  it ('should return correct path', () => {
    let configService = new ConfigService();

    let result = configService.getPath();

    if (Platform.isMac()) {
      expect(result).to.equal(homedir() + '/.zoom');
    }
    else if (Platform.isWindows()) {
      expect(result).to.equal((homedir() + '/.zoom').split(/\\(.+)/)[1]);
    }
  });

  afterEach(() => {
    if (fs.existsSync(CONFIG_TEST_PATH)) {
      fs.unlinkSync(CONFIG_TEST_PATH);
    }

    sinon.restore();
  });
});
