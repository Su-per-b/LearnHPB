@echo on
echo 1-clean.bat
set "DEST=..\..\LearnHPB\bin\bin-normal"


rmdir /s /q  %DEST%
mkdir %DEST%

rmdir /s /q  temp
mkdir temp

mkdir  %DEST%\css
mkdir  %DEST%\xml


