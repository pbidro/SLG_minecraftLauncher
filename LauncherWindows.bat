@echo off

:: Verificar permisos de administrador
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if %errorlevel% neq 0 (
    echo Este script requiere privilegios de administrador.
    echo Por favor, ejecútalo como administrador.
    pause
    exit /b 1
)

:: Cambiar al directorio del script
cd /d "%~dp0"

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

:: Verificar existencia del archivo de configuración
set configFile=config.txt
if not exist %configFile% (
    echo Por favor, configure el archivo %configFile% seleccionando su nombre de usuario.
    pause
    exit /b 1
)

:: Ejecutar Launch.py
set launchScript=Launch.py
if exist %launchScript% (
    python %launchScript%
) else (
    echo Error: No se encontró %launchScript%.
    pause
    exit /b 1
)
