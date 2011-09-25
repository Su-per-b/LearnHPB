set "DEST=..\..\bin\bin-normal"
set "SRC=..\.."

rmdir /s /q  %DEST%
mkdir %DEST%

mkdir  %DEST%\css
mkdir  %DEST%\3d-assets\

copy %SRC%\index.min.html  %DEST%\index.html
copy %SRC%\css\lgb.css  %DEST%\css\lgb.css
copy %SRC%\lgb.js  %DEST%\lgb.js