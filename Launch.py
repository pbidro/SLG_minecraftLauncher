import Classes.GameDownload as GameDownload
import Classes.ModDownload as ModDownload
import minecraft_launcher_lib
import subprocess

class MainApp:
    def __init__(self):
        self.load_config()

        self.game_installer = GameDownload.MinecraftInstaller()
        print(self.game_installer.minecraft_directory)
        self.mod_installer = ModDownload.ModInstaller(self.game_installer.minecraft_directory)

    def load_config(self):
        # Cargar la configuración desde el archivo config.txt
        with open("config.txt", "r") as config_file:
            lines = config_file.readlines()
            for line in lines:
                if line.startswith("username="):
                    self.username = line.split("=")[1].strip()

    def jugar(self):
        self.mod_installer.install_mods()

        options = {
            "username": self.username,
            "uuid": "",
            "token": ""
        }

        minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(
            self.game_installer.target_id,
            self.game_installer.minecraft_directory,
            options
        )
        
        subprocess.run(minecraft_command)

if __name__ == "__main__":
    main_app = MainApp()
    main_app.jugar()