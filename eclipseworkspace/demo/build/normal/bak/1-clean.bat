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
mkdir  %DEST%\3d-assets\envelope\
mkdir  %DEST%\3d-assets\furniture\
mkdir  %DEST%\3d-assets\furniture2\
mkdir  %DEST%\3d-assets\hvac\
mkdir  %DEST%\3d-assets\lighting\
mkdir  %DEST%\3d-assets\particle-systems\
mkdir  %DEST%\3d-assets\rooftop\
mkdir  %DEST%\3d-assets\textures\
mkdir  %DEST%\3d-assets\utility\
mkdir  %DEST%\3d-assets\utility\axis
mkdir  %DEST%\3d-assets\viewpoints\

