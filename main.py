import os
import glob
from inject_js import inject_js
import shutil


def get_plugins():
    js_files = glob.glob("plugins/*.js")
    print("--- Found plugins ---")
    for index, plugin in enumerate(js_files):
        print(index + 1, plugin)
    print()
    return js_files


def copy_plugins(plugin_list, destination):
    for plugin in plugin_list:
        print(f"Copying plugin: {plugin}")
        shutil.copy(plugin, destination)
    print()


def __main__():
    local_path = os.getenv("LOCALAPPDATA")

    if not local_path:
        print("No local path found")
        return

    # Define the pattern
    pattern = r"\Medal\app-*\resources\app"

    # Use glob to find matching paths
    matching_paths = glob.glob(local_path + pattern)
    if not matching_paths:
        print("Medal not found")
        return
    path = matching_paths[len(matching_paths) - 1]

    plugin_list = get_plugins()
    plugins_destination = path + "\\plugins"

    if not os.path.exists(plugins_destination):
        os.mkdir(plugins_destination)

    for plugin in plugin_list:
        plugin_name = os.path.basename(plugin)
        print(f"Plugin {plugin_name}", end=" ")
        if not os.path.exists(plugins_destination + "\\" + plugin_name):
            inject_js(f"{path}\\index.min.html", f"plugins/{plugin_name}")
            print("injected")
        else:
            print("update")
    copy_plugins(plugin_list, plugins_destination)


__main__()
os.system("pause")
