# Comprobar si Python 3.10 está instalado
$pythonInstalled = Get-Command python -ErrorAction SilentlyContinue

if (-not $pythonInstalled) {
    # Descargar e instalar Python 3.10 portable
    $pythonInstallerUrl = "https://www.python.org/ftp/python/3.10.0/python-3.10.0-embed-amd64.zip"
    $pythonZipPath = "$env:TEMP\python-3.10.0.zip"
    Invoke-WebRequest -Uri $pythonInstallerUrl -OutFile $pythonZipPath
    Expand-Archive -Path $pythonZipPath -DestinationPath "$env:TEMP\Python-3.10" -Force

    # Establecer las variables de entorno
    $env:Path += ";$env:TEMP\Python-3.10"

    # Eliminar el archivo zip
    Remove-Item $pythonZipPath -Force
}

# Instalar los módulos de requirements.txt
$requirementsFile = "Requirements\requirements.txt"
if (Test-Path $requirementsFile) {
    python -m pip install -r $requirementsFile
}

# Ejecutar Launch.py
$launchScript = "Launch.py"
if (Test-Path $launchScript) {
    python $launchScript
} else {
    Write-Host "Error: No se encontró $launchScript."
}
