@echo off
echo 4-copy.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."



copy .\index.html  %DEST%\index.html
copy .\htaccess.txt  %DEST%\.htaccess
copy %SRC%\3d-assets\textures\circle.png  %DEST%\3d-assets\textures\circle.png
copy %SRC%\xml\ps7.xml  %DEST%\xml\ps7.xml
copy %SRC%\xml\DefaultScenario.xml  %DEST%\xml\DefaultScenario.xml
xcopy %SRC%\images %DEST%\images /y /i /s
copy %SRC%\css\lgb.min.css %DEST%\css\lgb.min.css
copy %SRC%\css\kendo.common.css %DEST%\css\kendo.common.css
copy %SRC%\css\kendo.lgb.css %DEST%\css\kendo.lgb.css

xcopy %SRC%\css\Kendo %DEST%\css\Kendo /y /i /s
copy %SRC%\js\three\build\Three.js %DEST%\Three.js
copy %SRC%\js\three\build\custom\ThreeExtras.js %DEST%\ThreeExtras.js
copy %SRC%\3d-assets\textures\circle.png %DEST%\3d-assets\textures\circle.png