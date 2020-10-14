import { expect } from 'chai'
import sinon from 'sinon'
import { promisify } from 'util'
import { exec } from 'child_process'
import Config from '../utils/config'

let TEST_CONFIG_PATH = 'test/.test_zoom';

describe('System level tests', () => {

  let config;

  before(() => {
    config = new Config();
    sinon.stub(config, 'getPath').returns(TEST_CONFIG_PATH);
  });

  it('should add room', async () => {
    let key = 'myRoom';
    let url = 'https://blah.com'
    
    let result = await runCommand(`zoom -a ${key}:${url}`);

    expect(result.stdout).to.equal('SUCCESS: Successfully added room!\n');
    expect(result.stderr).to.be.empty;
  });

  it('should remove room', () => {

  });

  it('should list rooms', () => {

  });

  it('should launch room', () => {

  });
});

async function runCommand(command) {
  const execute = promisify(exec);
  return await execute(command);
}