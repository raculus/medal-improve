from bs4 import BeautifulSoup


def inject_js(html_file, js_file):
    with open(html_file, "r", encoding="utf-8") as file:
        # Read the HTML content
        html_content = file.read()

    # Create a BeautifulSoup object
    soup = BeautifulSoup(html_content, "html.parser")

    # Create a new script tag
    script_tag = soup.new_tag("script", src=js_file)

    body_tag = soup.body
    existing_script = body_tag.find("script", src=js_file)

    if existing_script:
        return False

    # Append the script tag to the body of the HTML
    if body_tag:
        body_tag.append(script_tag)

    # Save the modified HTML back to a file
    with open(html_file, "w", encoding="utf-8") as file:
        file.write(str(soup))
    return True
