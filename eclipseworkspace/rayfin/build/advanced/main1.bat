

..\closure_builder\calcdeps.py -i ..\..\main.dev.js ^
-p ..\..\js\closure ^
-p ..\..\js\lgb ^
-i ..\..\js\three.js\Three.dev.js ^
-i ..\..\js\lib\jquery.dev.js ^
-o compiled ^
-c ..\compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" > ..\..\main.min-advanced.js
