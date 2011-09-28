@echo off
echo 2-make-single.bat

set "DEST_PATH=..\..\bin\bin-normal"
set "BASE_PATH=..\.."


..\closure_builder\calcdeps.py ^
-i %BASE_PATH%\inc.js ^
-i %BASE_PATH%\main.dev.js ^
-p %BASE_PATH%\js\closure ^
-p %BASE_PATH%\js\o3djs ^
-p %BASE_PATH%\js\hemi ^
-p %BASE_PATH%\js\lgb ^
-o script > .\temp\main.single.js