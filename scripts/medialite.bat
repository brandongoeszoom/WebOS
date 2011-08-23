@REM 
@REM Copyright 2009-2011 Mediafly, Inc.
@REM 
@REM Licensed under the Apache License, Version 2.0 (the "License");
@REM you may not use this file except in compliance with the License.
@REM You may obtain a copy of the License at
@REM 
@REM   http://www.apache.org/licenses/LICENSE-2.0
@REM 
@REM Unless required by applicable law or agreed to in writing, software
@REM distributed under the License is distributed on an "AS IS" BASIS,
@REM WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM See the License for the specific language governing permissions and
@REM limitations under the License.
@REM 

@ECHO OFF
set brand=%1

IF NOT EXIST brand\%brand%\config.txt GOTO NO_FILE

@REM use these commands to copy the source then modify files in it to make all branded apps someday
@REM xcopy /eq ..\src branded\
@REM rd /s /q branded

copy brand\%brand%\brand.json ..\src\
copy brand\%brand%\icon.png ..\src\
copy brand\%brand%\boot.png ..\src\images\brand\
copy brand\%brand%\topbanner-portrait.png ..\src\images\brand\
copy brand\%brand%\first-time\welcome-1.png ..\src\images\brand\first-time\
copy brand\%brand%\first-time\welcome-2.png ..\src\images\brand\first-time\

copy ..\src\appinfo.json .

setLocal EnableDelayedExpansion
for /f "tokens=* delims= " %%a in (brand\%brand%\config.txt) do (
set /a N+=1
set v!N!=%%a
)
set appId=!v1!
set appName=!v2!

set N=0
for /f "tokens=* delims= " %%a in (appinfo.json) do (
set /a N+=1
if !N! lss 2 echo %%a> ..\src\appinfo.json
if !N!==2 echo "id":"%appId%",>> ..\src\appinfo.json
if !N!==3 echo "title":"%appName%",>> ..\src\appinfo.json
if !N! gtr 3 echo %%a>> ..\src\appinfo.json
)

del appinfo.json


GOTO DONE

:NO_FILE
echo Error: %brand%.cfg Not Found

:DONE
