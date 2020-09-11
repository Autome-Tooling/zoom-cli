import chai, { spy } from 'chai'
import { expect } from 'chai'
import spies from 'chai-spies'
chai.expect();
chai.use(spies);
import Config from '../utils/config'
import fs from 'fs'

const CONFIG_TEST_PATH = __dirname + '/.zoom-test-config-file';

describe("Config", () => {
  let config;

  beforeEach(() => {
    config = new Config();
  });

  it('should create config if not present', () => {

    if (fs.existsSync(CONFIG_TEST_PATH)) {
      fs.unlinkSync(CONFIG_TEST_PATH);
    }

    let create = chai.spy.on(config, 'create');
    const result = config.getPath(CONFIG_TEST_PATH);

    expect(result).to.equal(CONFIG_TEST_PATH);
    expect(create).to.have.been.called.once;
  });

  it('should not create config if already present', () => {
    if (!fs.existsSync(CONFIG_TEST_PATH)) {
      config.create(CONFIG_TEST_PATH);
    }

    let create = chai.spy.on(config, 'create');
    const result = config.getPath(CONFIG_TEST_PATH);

    expect(result).to.equal(CONFIG_TEST_PATH);
    expect(create).to.not.have.been.called();
  });

  afterEach(() => {
    if (fs.existsSync(CONFIG_TEST_PATH)) {
      fs.unlinkSync(CONFIG_TEST_PATH);
    }
  });
});