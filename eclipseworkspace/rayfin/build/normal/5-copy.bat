@echo off
echo 4-copy.bat

set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."



copy %SRC%\index.min.html  %DEST%\index.html
copy %SRC%\css\lgb.css  %DEST%\css\lgb.css
copy %SRC%\3d-assets\textures\circle.png  %DEST%\3d-assets\textures\circle.png
copy %SRC%\xml\particleSystems.xml  %DEST%\xml\particleSystems.xml
