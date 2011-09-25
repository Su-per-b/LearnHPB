set "SRC=..\..\3d-assets"
set "DEST=..\..\bin\bin-normal\3d-assets"

call:compileCopy rooftopLowpoly7_29_11_raj2.b

goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:compileCopy
java -jar ..\compiler.jar ^
--js %SRC%\%~1.js ^
--js_output_file %DEST%\%~1.js
copy %SRC%\%~1.bin %DEST%\%~1.bin
goto:eof