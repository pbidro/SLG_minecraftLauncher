import requests
from pathlib import Path

class ModInstaller:
    def __init__(self, minecraft_directory):
        print("Verificando mods...")
        self.mods_directory = Path(minecraft_directory) / "mods"
        self.mods_directory.mkdir(parents=True, exist_ok=True)

        self.mods_to_install = self.fetch_mods_from_github()

        self.installed_mods = set()

    def fetch_mods_from_github(self):
        github_url = "https://raw.githubusercontent.com/pbidro/SLG_minecraftLauncher/main/mods.json"
        try:
            response = requests.get(github_url)
            response.raise_for_status()  # Check for errors

            mods_data = response.json()
            return mods_data

        except requests.exceptions.RequestException as err:
            print(f"Error fetching mod data from GitHub: {err}")
            return {}

    def install_mods(self):
        for mod_name, mod_url in self.mods_to_install.items():
            mod_path = self.mods_directory / f"{mod_name}.jar"

            # Verificar si el mod ya está instalado
            if mod_path.exists():
                print(f"{mod_name} ya está instalado.")
                self.installed_mods.add(mod_name)
            else:
                # Descargar e instalar el mod
                response = requests.get(mod_url)
                with open(mod_path, 'wb') as mod_file:
                    mod_file.write(response.content)
                print(f"{mod_name} instalado correctamente.")

        # Verificar si todos los mods están instalados
        if len(self.installed_mods) == len(self.mods_to_install):
            print("Todos los mods están instalados. Mods cargados.")
