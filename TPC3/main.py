import json
import uuid

def extract_genres_and_actors(data):
    genres_set = set()
    actors_set = set()

    # Extract genres and actors
    for movie in data['movies']:
        if 'genres' in movie:
            genres_set.update(movie['genres'])
        if 'cast' in movie:
            actors_set.update(movie['cast'])

    # Generate unique IDs for genres and actors
    genres_dict = [{'id': str(uuid.uuid4()), 'name': genre} for genre in genres_set]
    actors_dict = [{'id': str(uuid.uuid4()), 'name': actor} for actor in actors_set]

    # Add genres and actors dictionaries to the data
    data['genres'] = genres_dict
    data['actors'] = actors_dict

    return data

# Load JSON data from file
with open('movies.json', 'r') as file:
    movies_data = json.load(file)

# Call the function to extract genres and actors
movies_data_with_genres_and_actors = extract_genres_and_actors(movies_data)

# Write updated data

with open('movies_with_genres_and_actors.json', 'w') as file:
    json.dump(movies_data_with_genres_and_actors, file, indent=4)
