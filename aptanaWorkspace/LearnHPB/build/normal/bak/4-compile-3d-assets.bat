@echo off
echo 4-compile-3d-assets.bat

set "SRC=..\..\3d-assets"
set "DEST=..\..\bin\bin-normal\3d-assets"

call:compileCopy envelope\Floor_All.obj
call:compileCopy envelope\FrontRightWall_09ft.obj
call:compileCopy envelope\FrontRightWall_11ft.obj
call:compileCopy envelope\FrontRightWall_13ft.obj
call:compile envelope\scene.json

call:compileCopy furniture\BlueChair2.obj
call:compileCopy furniture\BlueChair3.obj
call:compile furniture\scene.json

call:compileCopy furniture2\converted5_chair.obj
call:compileCopy furniture2\converted5_conftable.obj
call:compileCopy furniture2\converted5_TaskLight.obj
call:compile furniture2\scene.json

call:compileCopy hvac\diffuser.obj
call:compileCopy hvac\ductwork.obj.json
call:compile hvac\scene.json

call:compileCopy lighting\PendantLight.obj
call:compileCopy lighting\RecessedLight.obj
call:compile lighting\scene.json

call:compile particle-systems\ps9.js

call:compileCopy rooftop\CoolingCoil.obj
call:compileCopy rooftop\Damper.obj
call:compileCopy rooftop\Ducting.obj
call:compileCopy rooftop\Fan.obj
call:compileCopy rooftop\Filter.obj
call:compileCopy rooftop\HeatingCoil.obj
call:compileCopy rooftop\rooftop_cleaned_condensed.obj
call:compile rooftop\scene.json

call:compile viewpoints\scene.obj.json


goto:eof

::--------------------------------------------------------
::-- Function section starts below here
::--------------------------------------------------------

:compileCopy
echo compile %~1
minify_json.py ^
%SRC%\%~1.json ^
%DEST%\%~1.json
copy %SRC%\%~1.bin %DEST%\%~1.bin
goto:eof

:compile
echo compile %~1
minify_json.py ^
%SRC%\%~1.json ^
%DEST%\%~1.json
goto:eof

