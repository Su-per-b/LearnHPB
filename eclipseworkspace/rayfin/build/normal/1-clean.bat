@echo off
echo 1-clean.bat
set "DEST=..\..\bin\bin-normal"


rmdir /s /q  %DEST%
mkdir %DEST%

mkdir  %DEST%\css
mkdir  %DEST%\xml
mkdir  %DEST%\3d-assets\
mkdir  %DEST%\3d-assets\textures