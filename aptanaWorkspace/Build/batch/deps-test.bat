::root_with_prefix {find_file_here}  {write path} 

..\closurebuilder\depswriter.py --root_with_prefix="..\..\LearnHPB\js\closure\goog ..\..\LearnHPB\js\closure\goog" ^
--root_with_prefix="..\..\LearnHPB\js\lgb ..\..\LearnHPB\js\lgb" ^
--root_with_prefix="..\..\Test\js\overrides ..\js\overrides" ^
--root_with_prefix="..\..\Test\js\test ..\js\test" ^
--output_file ..\..\Test\js\closure\deps-Test.js
