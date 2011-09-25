set "SRC=..\.."
set "DEST=..\..\bin\bin-advanced"

java -jar ..\compiler.jar ^
--js %SRC%\js\three.js\Three.dev.js ^
--js %SRC%\main.single.js ^
--compilation_level ADVANCED_OPTIMIZATIONS ^
--js_output_file %SRC%\lgb-advanced.js ^
--externs %SRC%\js\lib\jQuery-1.6-extern.js