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
    var az = (args[0]-args[1])/180;
    var al = (args[2]-args[3])/90;

    if (az > 1){
        az=az-2;
    }

    let profile = device.getCurrentProfile();
    let params = {
      'ProfileToken': profile['token'],
      'Position'    : {'x': az, 'y': al, 'z': parseFloat(args[4])},
      'Speed'       : {'x': 1, 'y': 1, 'z': 1}
    };
    device.services.ptz.absoluteMove(params).then((result) => {
    }).catch((error) => {
      console.error(error);
    });
}).then(() => {
}).catch((error) => {
  console.error(error);
});
