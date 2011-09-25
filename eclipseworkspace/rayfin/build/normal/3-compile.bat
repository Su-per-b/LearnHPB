set "SRC=..\.."
set "DEST=..\..\bin\bin-normal"

java -jar ..\compiler.jar ^
--js %SRC%\js\lib\jquery.dev.js ^
--js %SRC%\js\three.js\Three.dev.js ^
--js %SRC%\main.single.js ^
--js_output_file %SRC%\lgb.js