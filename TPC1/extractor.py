import xml.etree.ElementTree as ET

# Function to recursively extract text content while preserving spaces
def extract_text_with_spaces(element):
    text = element.text.strip() if element.text else ''
    for child in element:
        if child.tag == 'lugar' or child.tag == 'data' or child.tag == 'entidade':
            text += ' ' + child.text.strip() if child.text else ''
        elif child.tag == 'para':
            text += ' ' + extract_text_with_spaces(child)
    return text.strip()

def extract_street_description(root):
    para_texts = []
    for para in root.findall('.//para'):
        para_text = extract_text_with_spaces(para)
        para_texts.append(para_text)
    return para_texts

def extract_images(root):
    images = []
    for figura in root.findall('.//figura'):
        image_path = figura.find('imagem').get('path')
        image_legend = figura.find('legenda').text.strip() if figura.find('legenda').text else ''
        images.append((image_path, image_legend))
    return images

def extract_houses(root):
    houses = []
    for casa in root.findall('.//casa'):
        house_info = {}
        house_info['número'] = casa.find('número').text.strip()
        house_info['enfiteuta'] = casa.find('enfiteuta').text.strip() if casa.find('enfiteuta') is not None else ''
        house_info['foro'] = casa.find('foro').text.strip() if casa.find('foro') is not None else ''
        desc_element = casa.find('desc')
        house_info['desc'] = extract_text_with_spaces(desc_element) if desc_element is not None else ''
        houses.append(house_info)
    return houses

# Example usage:
if __name__ == "__main__":
    tree = ET.parse('./MRB-01-RuaDoCampo.xml')
    root = tree.getroot()

    street_description = extract_street_description(root)
    images = extract_images(root)
    houses = extract_houses(root)

    for text in street_description:
        print(text)

    print(images)
    print(houses)
