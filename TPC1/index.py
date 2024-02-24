from extractor import *
import os

XML_FILES="./html/texto/"
INDEX_PATH="./html/"
SHOW_PATH="./html/show/"
INDEX_TEMPLATE="./templates/index_template.html"
 
STREET_COMPONENT = """
        <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <img class="w-full h-full" src="{img_path}" alt="">
          </div>
          <a class="mt-3 -mt-px flex items-center justify-center divide-x divide-gray-200" href="{file_path}">
            <div class="flex items-center justify-center">
              <p class="pt-1 mb-1 font-semibold text-lg">{name}</p>
            </div>
          </a>
        </li>
"""

def generate_street_card(xml_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    street_name = extract_street_name(root)
    images = extract_images(root)

    file_path = f'show/{street_name}.html'
    img_path = f'{images[0][0].replace("../", "")}'

    # Substitute street name and description components
    return substitute_tags(STREET_COMPONENT, {'name': street_name, 'img_path': img_path, 'file_path':file_path})

if __name__ == "__main__":
    xml_files = os.listdir(XML_FILES)

    with open(INDEX_TEMPLATE, 'r') as file:
        html_template = file.read()

    streets_listing = ""
    for file in xml_files:
        file_path = XML_FILES + file
        streets_listing += generate_street_card(file_path)
    html_content = html_template.replace('{ruas}', streets_listing)
    output_path = os.path.join(INDEX_PATH, "index.html")

    with open(output_path, 'w') as file:
        file.write(html_content)
