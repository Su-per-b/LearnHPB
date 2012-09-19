@echo on
echo 1-clean.bat
set "DEST=..\..\bin\bin-normal"


rmdir /s /q  %DEST%
mkdir %DEST%

rmdir /s /q  temp
mkdir temp

mkdir  %DEST%\css
mkdir  %DEST%\xml
mkdir  %DEST%\3d-assets\
mkdir  %DEST%\3d-assets\ductwork\
mkdir  %DEST%\3d-assets\envelope\
mkdir  %DEST%\3d-assets\particle-systems\
mkdir  %DEST%\3d-assets\rooftop\
mkdir  %DEST%\3d-assets\textures\
mkdir  %DEST%\3d-assets\lighting\
