set "BASE_PATH=..\.."

..\closure_builder\calcdeps.py ^
-i %BASE_PATH%\inc.js ^
-i %BASE_PATH%\main.dev.js ^
-i %BASE_PATH%\js\three.js\Three.dev.js ^
-p %BASE_PATH%\js\closure ^
-p %BASE_PATH%\js\lgb ^
-o compiled ^
-c ..\compiler.jar -f "--js=%BASE_PATH%\js\lib\jquery.dev.js" -f "--compilation_level=ADVANCED_OPTIMIZATIONS" > %BASE_PATH%\main.min-advanced.js
