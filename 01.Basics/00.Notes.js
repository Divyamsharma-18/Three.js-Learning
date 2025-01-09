🪄 Scene is like a playground, we define scene with =>
 const scene = new THREE.Scene(); 


📸 Camera is like how we see things in playground like how narrow or wide it'll look, it contains of a lot of content like FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane.


Camera defined as => 
const camera = new THREE.PerspectiveCamera(
    75, // Field of view (how wide your eyeball sees)
    window.innerWidth / window.innerHeight, // Screen size ratio
    0.1, // How close you can see
    1000 // How far you can see
);
camera.position.z = 5; // Move the camera back to see things better



👀 FOV => Basically we go with 75. Low FOV i.e. 30 will make the cube zoom in and look very big like binoculars zoom things and high FOV like  120 will zoom it out and show a wide angle.

 

⬜ Aspect Ratio: window.innerWidth / window.innerHeight =>
The aspect ratio tells the camera how wide or tall the screen is.  It's like saying: "Hey camera, the screen shape is like a rectangle!"
If you don't set this correctly, your world might look squished or stretched. 🤪



🔍 Near Clipping Plane => closest distance at which objects are visible to the camera. Anything closer than this distance gets "clipped" (not rendered).


 
