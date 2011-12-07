@echo off
echo build all

call 1-clean.bat
call 1.5-compile_three.js.bat
call 2-css.bat
call 3-compile.bat
call 4-compile-3d-assets.bat
call 5-copy.bat