import {createTimeOfInterest} from 'astronomy-bundle/time/index.js';
import {createSun} from 'astronomy-bundle/sun/index.js';
import {createLocation} from 'astronomy-bundle/earth/index.js';

const location = createLocation('<geographic coordinates>');

const toi = createTimeOfInterest.fromCurrentTime();
const sun = createSun(toi);

const {azimuth, altitude, radiusVector} = await sun.getTopocentricHorizontalCoordinates(location);
console.log(azimuth+","+altitude);
