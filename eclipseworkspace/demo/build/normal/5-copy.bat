@echo off
echo 5-copy.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."



copy .\index.html  %DEST%\index.html
copy .\htaccess.txt  %DEST%\.htaccess
copy %SRC%\3d-assets\textures\circle.png  %DEST%\3d-assets\textures\circle.png
copy %SRC%\xml\ps8.xml  %DEST%\xml\ps8.xml
copy %SRC%\xml\DefaultScenario.xml  %DEST%\xml\DefaultScenario.xml
xcopy %SRC%\images %DEST%\images /y /i /s
copy %SRC%\css\lgb.min.css %DEST%\css\lgb.min.css
copy %SRC%\css\kendo.common.css %DEST%\css\kendo.common.css
copy %SRC%\css\kendo.lgb.css %DEST%\css\kendo.lgb.css

copy temp\Three.js %DEST%\Three.js
copy temp\ThreeExtras.js %DEST%\ThreeExtras.js
copy %SRC%\3d-assets\textures\circle.png %DEST%\3d-assets\textures\circle.png

copy temp\lgb.js %DEST%\lgb.js
copy temp\kendo.min.js %DEST%\kendo.min.js