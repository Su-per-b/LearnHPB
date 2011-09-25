set "DEST_PATH=..\..\bin\bin-normal"
set "BASE_PATH=..\.."

..\closure_builder\calcdeps.py ^
-i %BASE_PATH%\inc.js ^
-i %BASE_PATH%\main.dev.js ^
-p %BASE_PATH%\js\closure ^
-p %BASE_PATH%\js\lgb ^
-o script > %BASE_PATH%\main.single.js