import { expect } from 'chai'
import { homedir } from 'os'
import Installer from '../utils/installer'
import Platform from '../utils/platform'
import fs from 'fs'

describe('Installer', () => {
  let installer;

  beforeEach(() => {
    installer = new Installer();
  });

  it('should download the installer', async () => {
    let installerName = (Platform.isMac()) ? 'Zoom.pkg' : 'ZoomInstaller.exe';

    let result = await installer.downloadInstaller();

    expect(result).to.equal(homedir() + "/" + installerName);
    expect(fs.existsSync(result)).to.be.true;
  });
});
