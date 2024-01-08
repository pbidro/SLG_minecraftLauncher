#!/bin/bash

# Comprobar si Python 3.10 está instalado
if command -v python3.10 >/dev/null 2>&1; then
    echo "Python 3.10 ya está instalado."
else
    # Descargar e instalar Python 3.10 portable
    pythonInstallerUrl="https://www.python.org/ftp/python/3.10.0/python-3.10.0-macosx10.9.pkg"
    pythonInstallerPkg="/tmp/python-3.10.0.pkg"
    curl -o $pythonInstallerPkg $pythonInstallerUrl
    sudo installer -pkg $pythonInstallerPkg -target /

    # Eliminar el instalador
    rm $pythonInstallerPkg
fi

# Instalar los módulos de requirements.txt
requirementsFile="Requirements/requirements.txt"
if [ -f $requirementsFile ]; then
    python3.10 -m pip install -r $requirementsFile
fi

# Ejecutar Launch.py
launchScript="Launch.py"
if [ -f $launchScript ]; then
    python3.10 $launchScript
else
    echo "Error: No se encontró $launchScript."
fi
