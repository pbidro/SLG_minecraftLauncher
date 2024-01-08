@echo off

:: Comprobar si Python 3.10 está instalado
where python >nul 2>&1
if %errorlevel% neq 0 (
    :: Descargar e instalar Python 3.10 portable
    set pythonInstallerUrl=https://www.python.org/ftp/python/3.10.0/python-3.10.0-embed-amd64.zip
    set pythonZipPath=%TEMP%\python-3.10.0.zip
    bitsadmin /transfer "DescargaPython" %pythonInstallerUrl% %pythonZipPath%
    powershell Expand-Archive -Path %pythonZipPath% -DestinationPath "%TEMP%\Python-3.10" -Force

    :: Establecer las variables de entorno
    setx PATH "%PATH%;%TEMP%\Python-3.10" -m

    :: Eliminar el archivo zip
    del %pythonZipPath%
)

:: Instalar los módulos de requirements.txt
set requirementsFile=Requirements\requirements.txt
if exist %requirementsFile% (
    python -m pip install -r %requirementsFile%
)

:: Ejecutar Launch.py
set launchScript=Launch.py
if exist %launchScript% (
    python %launchScript%
) else (
    echo Error: No se encontró %launchScript%.
)