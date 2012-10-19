@echo off
echo build all

call 1-clean.bat
call 1.5-compile_three.js.bat
call 1.7-compile_kendo.js.bat
call 2-css.bat
call 3-compile.bat
call 5-copy.bat