@echo off
echo make-single.bat

set "DEST..\..\bin\bin-normal"
set "SRC=..\.."

..\closure_builder\calcdeps.py ^
-i %SRC%\inc.js ^
-i %SRC%\main.src.js ^
-p %SRC%\js\closure ^
-p %SRC%\js\hemi ^
-p %SRC%\js\lgb ^
-p %SRC%\js\o3djs ^
-o script > .\temp\main.single.js