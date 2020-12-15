const onvif = require('node-onvif');
var args = process.argv.slice(2);

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  xaddr: '<camera service address>',
  user : '<user>',
  pass : '<pass>'
});

// Initialize the OnvifDevice object
device.init().then(() => {
const az = parseFloat(args[0]);
const al = parseFloat(args[1]);
let profile = device.getCurrentProfile();
let params = {
  'ProfileToken': profile['token'],
  'Position'    : {'x': az, 'y': al, 'z': 0},
  'Speed'       : {'x': 1, 'y': 1, 'z': 1}
};
device.services.ptz.absoluteMove(params).then((result) => {
    console.log(args[0]+" "+args[1]);
}).catch((error) => {
  console.error(error);
});
}).then(() => {
  console.log("al= "+al);
}).catch((error) => {
  console.error(error);
});
