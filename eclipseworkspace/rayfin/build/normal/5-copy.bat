@echo off
echo 4-copy.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."



copy .\index.html  %DEST%\index.html
copy .\htaccess.txt  %DEST%\.htaccess
copy %SRC%\3d-assets\textures\circle.png  %DEST%\3d-assets\textures\circle.png
copy %SRC%\xml\particleSystems.xml  %DEST%\xml\particleSystems.xml
copy %SRC%\xml\DefaultScenario.xml  %DEST%\xml\DefaultScenario.xml
xcopy %SRC%\images %DEST%\images /y /i /s
xcopy %SRC%\css %DEST%\css /y /i /s