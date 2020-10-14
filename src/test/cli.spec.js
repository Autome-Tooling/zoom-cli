import { expect } from 'chai'
import sinon from 'sinon'
import cli from '../cli'

describe('CLI', () => {
  before(() => {
    console.log = () => {}
  })
  
  it('cli should exit with error code when parseArgumentsIntoOptions throws', () => {
    let parseArgumentsIntoOptionsStub = sinon.stub(cli, "parseArgumentsIntoOptions")
        .returns(new Error("FAILURE"));
  
    let junkArgs = ["arg1", "arg2"];
    
    let result = cli.cli(junkArgs);
    
    expect(result).equal(-1);
  
    parseArgumentsIntoOptionsStub.restore();
  });
  
  it('parseArgumentsIntoOptions should parse arguments correctly when doing a valid operation', () => {
    let argumentsToParse = ['_', '_', '--list'];
  
    let result = cli.parseArgumentsIntoOptions(argumentsToParse);
  
    expect(result.list).to.be.true;
    expect(result.add).to.be.null;
    expect(result.remove).to.be.null;
    expect(result.launch).to.be.null;
    expect(result.update).to.be.false;
  });
  
  it('parseArgumentsIntoOptions should throw error if more arguments than necessary are given', () => {
    let argumentsToParse = ['_', '_', '--list', 'extraArgument'];
  
    expect(() => cli.parseArgumentsIntoOptions(argumentsToParse)).to.throw('Unknown argument');
  });
});
