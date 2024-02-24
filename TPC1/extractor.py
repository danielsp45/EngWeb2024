import xml.etree.ElementTree as ET

# Function to recursively extract text content while preserving spaces
def extract_text_with_spaces(element):
    text = ''
    if element.text:
        text += element.text
    for child in element:
        text += extract_text_with_spaces(child)
        if child.tail:
            text += child.tail + ' '
    return text

def extract_street_description(root):
    para_texts = ""
    corpo = root.find('corpo')
    for para in corpo.findall('para'):
        para_text = extract_text_with_spaces(para)
        para_texts += para_text

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
        house_info['numero'] = casa.find('número').text if casa.find('número') is not None else '-'
        house_info['enfiteuta'] = casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else '-'
        house_info['foro'] = casa.find('foro').text if casa.find('foro') is not None else '-'
        house_info['vista'] = casa.find('vista').text if casa.find('vista') is not None else '-'
        desc_element = casa.find('.//desc')
        house_info['desc'] = extract_text_with_spaces(desc_element) if desc_element is not None else '-'
        houses.append(house_info)
    return houses

def extract_street_name(root):
    return root.find('.//nome').text.strip()

def substitute_tags(component, data):
    """
    Substitute {content} tags in the component with corresponding data.
    """
    return component.format(**data)
