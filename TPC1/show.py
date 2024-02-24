from extractor import *
import os

SHOW_FILES="./html/show/"
XML_FILES="./html/texto/"
TEMPLATE_FILE="./templates/show_template.html"

NAME_COMPONENT = """
            <p class="font-bold text-4xl">{nome}</p>
"""

DESCRIPTION_COMPONENT = """
            <p>
              {descr}
            </p>
"""

IMAGE_COMPONENT = """
          <figure class="mt-10">
            <img class="bg-gray-50 object-contain" src="{img_path}" alt="">
            <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
              </svg>
              {vista}
            </figcaption>
          </figure>
"""

HOUSE_COMPONENT = """
              <div class="mt-6 border-t border-black">
                <dl class="divide-y divide-gray-200">
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Número</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{numero}</dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Enfiteuta</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{enfiteuta}</dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Foro</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{foro}</dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Descrição</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {desc}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Vista</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {vista}
                    </dd>
                  </div>
                </dl>
              </div>
"""

def substitute_tags(component, data):
    """
    Substitute {content} tags in the component with corresponding data.
    
    Args:
        component (str): The component template string with {content} tags.
        data (dict): Dictionary containing the data to substitute for each tag.
        
    Returns:
        str: The component with tags substituted.
    """
    return component.format(**data)

def generate_street_html(street_name, description, images, houses):
    """
    Generate an HTML file for the street with the provided components.

    Args:
        street_name (str): The name of the street.
        description (str): The description of the street.
        images (list): List of tuples containing image path and legend.
        houses (list): List of dictionaries containing house information.

    Returns:
        str: The HTML content for the street.
    """
    # Read the base HTML template
    with open(TEMPLATE_FILE, 'r') as file:
        html_template = file.read()
    # print(html_template)

    # Substitute street name and description components
    street_name_component = substitute_tags(NAME_COMPONENT, {'nome': street_name})
    description_component = substitute_tags(DESCRIPTION_COMPONENT, {'descr': description})

    # Generate HTML for images
    images_component = ""
    for img_path, vista in images:
        images_component += substitute_tags(IMAGE_COMPONENT, {'img_path': img_path, 'vista': vista})

    # Generate HTML for houses
    houses_component = ""
    for house in houses:
        houses_component += substitute_tags(HOUSE_COMPONENT, house)

    # Substitute components in the HTML template
    html_content = html_template.replace('{nome}', street_name_component)
    html_content = html_content.replace('{descr}', description_component)
    html_content = html_content.replace('{imagens}', images_component)
    html_content = html_content.replace('{casas}', houses_component)

    return html_content


def generate_show_file(xml_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    street_name = extract_street_name(root)
    street_description = extract_street_description(root)
    images = extract_images(root)
    houses = extract_houses(root)

    # Generate HTML content for the street
    html_content = generate_street_html(street_name, street_description, images, houses)

    # Check if the directory exists, if not create it
    if not os.path.exists(SHOW_FILES):
        os.makedirs(SHOW_FILES)

    # Write HTML content to a file
    output_filename = f'{street_name}.html'
    output_path = os.path.join(SHOW_FILES, output_filename)
    with open(output_path, 'w') as file:
        file.write(html_content)

    # print(f"HTML file generated: {output_path}")


# Example usage:
if __name__ == "__main__":
    xml_files = os.listdir(XML_FILES)

    for file in xml_files:
        file_path = XML_FILES + file
        generate_show_file(file_path)
