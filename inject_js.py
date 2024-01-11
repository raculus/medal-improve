from bs4 import BeautifulSoup


def inject_js(html_file, js_file):
    with open(html_file, "r", encoding="utf-8") as file:
        # Read the HTML content
        html_content = file.read()

    # Create a BeautifulSoup object
    soup = BeautifulSoup(html_content, "html.parser")

    # Create a new script tag
    script_tag = soup.new_tag("script", src=js_file)

    # Append the script tag to the body of the HTML
    body_tag = soup.body
    if body_tag:
        body_tag.append(script_tag)
    else:
        # If there is no <body> tag, you can create one
        new_body_tag = soup.new_tag("body")
        new_body_tag.append(script_tag)
        # Append the new <body> tag to the soup
        soup.append(new_body_tag)

    # Save the modified HTML back to a file
    with open(html_file, "w", encoding="utf-8") as file:
        file.write(str(soup))
