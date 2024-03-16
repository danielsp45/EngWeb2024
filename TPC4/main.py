import json
import uuid

def extract_periodos(data):
    periodos_set = set()

    # Extract genres and actors
    for compositor in data['compositores']:
        if 'periodo' in compositor:
            periodos_set.update(compositor['periodo'])

    # Generate unique IDs for genres and actors
    periodos_dict = [{'id': str(uuid.uuid4()), 'name': periodo} for periodo in periodos_set]
    print(periodos_set)

    # Add genres and actors dictionaries to the data
    data['periodos'] = periodos_dict

    return data

# Load JSON data from file
with open('data.json', 'r') as file:
    compositores_data = json.load(file)

# Call the function to extract genres and actors
compositores_data = extract_periodos(compositores_data)

# Write updated data

with open('data.json', 'w') as file:
    json.dump(compositores_data, file, indent=4)
