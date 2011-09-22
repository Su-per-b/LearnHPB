

java -jar compiler.jar ^
--js js/three.js/RequestAnimationFrame.js ^
--js js/three.js/Stats.js ^
--js_output_file js/three.js/ThreeLibs.min.js

java -jar compiler.jar ^
--js 3d-assets/damper-solo.obj.js ^
--js_output_file 3d-assets/damper-solo.obj.min.js
