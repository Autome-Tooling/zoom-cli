import chai from 'chai'
import { expect } from 'chai'
import spies from 'chai-spies'
import Installer from '../utils/installer'
import fs from 'fs'

chai.expect();
chai.use(spies);

describe('Installer', () => {
  let installer;

  beforeEach(() => {
    installer = new Installer();
  });

  it('should download the installer', () => {
    
  });

  it('should download the Mac installer when the platform is Mac', () => {

  });

  it('should download the Windows installer when the platform is Windows', () => {

  });
});