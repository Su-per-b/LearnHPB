@echo off
echo 5-copy.bat

set "DEST=..\..\LearnHPB\bin\bin-normal"
set "SRC=..\..\LearnHPB"

xcopy %SRC%\3d-assets %DEST%\3d-assets /y /i /s

copy .\index.html  %DEST%\index.html
copy .\htaccess.txt  %DEST%\.htaccess
copy %SRC%\xml\ps8.xml  %DEST%\xml\ps8.xml
copy %SRC%\xml\DefaultScenario.xml  %DEST%\xml\DefaultScenario.xml
xcopy %SRC%\images %DEST%\images /y /i /s
xcopy %SRC%\css\Silver %DEST%\css\Silver /y /i /s
copy %SRC%\css\lgb.min.css %DEST%\css\lgb.min.css
copy %SRC%\css\kendo.common.css %DEST%\css\kendo.common.css
copy %SRC%\css\kendo.silver.css %DEST%\css\kendo.silver.css
copy %SRC%\css\highlight.png %DEST%\css\highlight.png
copy ..\temp\three.min.js %DEST%\three.min.js
copy temp\lgb.js %DEST%\lgb.js
copy temp\kendo.min.js %DEST%\kendo.min.js