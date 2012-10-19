@echo off
echo 5-copy.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."

xcopy %SRC%\3d-assets %DEST%\3d-assets /y /i /s

copy .\index.html  %DEST%\index.html
copy .\htaccess.txt  %DEST%\.htaccess
copy %SRC%\xml\ps9.xml  %DEST%\xml\ps9.xml
copy %SRC%\xml\DefaultScenario.xml  %DEST%\xml\DefaultScenario.xml
xcopy %SRC%\images %DEST%\images /y /i /s
copy %SRC%\css\lgb.min.css %DEST%\css\lgb.min.css
copy %SRC%\css\kendo.common.css %DEST%\css\kendo.common.css
copy %SRC%\css\kendo.lgb.css %DEST%\css\kendo.lgb.css

copy temp\three.min.js %DEST%\three.min.js
copy temp\lgb.js %DEST%\lgb.js
copy temp\kendo.min.js %DEST%\kendo.min.js