@echo off
echo 4-compile-3d-assets.bat

set "SRC=..\..\3d-assets"
set "DEST=..\..\bin\bin-normal\3d-assets"


call:compileCopy ductwork\diffuser.obj
call:compileCopy ductwork\ductworkVents.obj
call:compile ductwork\scene-bin.js

call:compileCopy envelope\FrontRight11ft.obj
call:compileCopy envelope\FrontRight13ft.obj
call:compileCopy envelope\FrontRight9ft.obj
call:compile envelope\scene.floorCeilingGeom.js
call:compile envelope\scene-bin.js

call:compile particle-systems\ps8.js

call:compileCopy rooftop\cooling-coil.obj
call:compileCopy rooftop\damper.obj
call:compileCopy rooftop\ducting.obj
call:compileCopy rooftop\fan.obj
call:compileCopy rooftop\filter.obj
call:compileCopy rooftop\heating-coil.obj
call:compile rooftop\scene-bin.js



goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:compileCopy
echo compile %~1
java -jar ..\compiler.jar ^
--js %SRC%\%~1.js ^
--js_output_file %DEST%\%~1.js
copy %SRC%\%~1.bin %DEST%\%~1.bin
goto:eof

:compile
echo compile %~1
java -jar ..\compiler.jar ^
--js %SRC%\%~1 ^
--js_output_file %DEST%\%~1
goto:eof

