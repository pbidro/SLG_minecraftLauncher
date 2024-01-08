import minecraft_launcher_lib

class MinecraftInstaller:
    def __init__(self):
        self.vanilla_version = "1.20.1"
        self.minecraft_directory = minecraft_launcher_lib.utils.get_minecraft_directory()
        print(self.minecraft_directory)
        self.target_id = f'fabric-loader-0.15.3-{self.vanilla_version}'
        self.current_max = 0
        print(self.minecraft_directory)

    def set_status(self, status):
        print(status)

    def set_progress(self, progress):
        if self.current_max != 0:
            percentage = (progress / self.current_max) * 100
            print(f"({percentage:.0f}%)")

    def set_max(self, new_max):
        self.current_max = new_max

    def install_fabric(self):
        installed_versions = minecraft_launcher_lib.utils.get_installed_versions(self.minecraft_directory)
        print("Instalando Fabric")

        callback = {
            "setStatus": self.set_status,
            "setMax": self.set_max,
            "setProgress": self.set_progress,
        }

        is_present = any(item['id'] == self.target_id for item in installed_versions)

        if is_present:
            print(f"Ejecutando... \n ")

        else:
            print(f"Instalando... (puede tomar unos minutos) \n")
            minecraft_launcher_lib.fabric.install_fabric(self.vanilla_version, self.minecraft_directory, callback=callback)
        
