import json
from typing import List

INDEX_PATH = "./html/"
INDEX_TEMPLATE_PATH = "./templates/index_template.html"
SHOW_FOLDER = "./html/show/"
SHOW_TEMPLATE_PATH = "./templates/show_template.html"

CITY_COMPONENT = """
                <li class="flex items-center justify-between gap-x-6 py-5">
                  <div class="min-w-0">
                    <div class="flex items-start gap-x-3">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{{link_name}}</p>
                      <p class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">{{link_id}}</p>
                    </div>
                  </div>
                  <div class="flex flex-none items-center gap-x-4">
                    <a href="{{city_file}}" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                        View city<span class="sr-only">, GraphQL API</span>
                    </a>
                  </div>
                </li>
"""
LINK_COMPONENT = """
                <li class="flex items-center justify-between gap-x-6 py-5">
                  <div class="min-w-0">
                    <div class="flex items-start gap-x-3">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{{link_name}}</p>
                      <p class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">{{link_id}}</p>
                    </div>
                  </div>
                  <div class="flex flex-none items-center gap-x-4">
                    <a href="{{city_path}}" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">View city<span class="sr-only">, GraphQL API</span></a>
                  </div>
                </li>
"""


class City:
    def __init__(self, id, name, population, desc, district, links):
        self.id = id
        self.name = name
        self.population = population
        self.desc = desc
        self.district = district
        self.links = links


class CityLink:
    def __init__(self, id, origin, destination, distance):
        self.id = id
        self.origin = origin
        self.destination = destination
        self.distance = distance


class CityManager:
    def __init__(self, json_file):
        self.json_file = json_file
        self.cities: List[City] = []
        self.cities_map: dict = {}
        self.city_links: List[CityLink] = []
        self.city_links_map: dict = {}
        
        self.extract_data()

    def extract_data(self):
        # you first need to extract the links from the json file and then the cities
        self.extract_city_links()
        self.extract_cities()

    def extract_cities(self):
        with open(self.json_file, 'r') as file:
            data = json.load(file)
            for city_raw in data['cidades']:
                links = self.get_links_from_city(city_raw['id'])
                city = City(city_raw['id'], city_raw['nome'], city_raw['população'], city_raw['descrição'], city_raw['distrito'], links)
                self.cities_map[city.id] = city
                self.cities.append(city)

    def extract_city_links(self):
        with open(self.json_file, 'r') as file:
            data = json.load(file)
            for link in data['ligacoes']:
                cityLink = CityLink(link['id'], link['origem'], link['destino'], link['distância'])
                self.city_links.append(cityLink)
                self.city_links_map[link['id']] = cityLink

    def get_links_from_city(self, city_id):
        links = []
        for link in self.city_links:
            if link.origin == city_id:
                links.append(link)
        return links
    
    def get_city_by_id(self, city_id) -> City:
        return self.cities_map[city_id]


class IndexPage:
    def __init__(self, cities: CityManager, template_path: str, output_path: str) -> None:
        self.city_extractor: CityManager = cities
        self.template: str = template_path
        self.path: str = output_path + "index.html"
        self.components: str = self.generate_components()

    def generate_components(self) -> str:
        components = ""
        for city in self.city_extractor.cities:
            component = CITY_COMPONENT
            component = component.replace("{{link_name}}", city.name)
            component = component.replace("{{link_id}}", city.id)
            component = component.replace("{{city_file}}", f"/{city.id}")
            components += component
        return components

    def write_page(self):
        # read the template file and substitue the components with the placeholders
        with open(self.template, "r") as file:
            template = file.read()
            template = template.replace("{{cities}}", self.components)

            # write the template to the destination file
            with open(self.path, "w") as file:
                file.write(template)


class ShowPage:
    def __init__(self, cityManager, city: City, template_path: str) -> None:
        self.cityManager: CityManager = cityManager
        self.city: City = city
        self.template: str = template_path
        self.link_components: str = self.generate_link_components()
        self.page: str = self.generate_page()

    def generate_page(self) -> str:
        return self.replace_tags()

    def generate_link_components(self) -> str:
        # for each link in the city, generate a link component
        components = ""
        for link in self.city.links:
            component = LINK_COMPONENT
            component = component.replace("{{link_name}}", self.cityManager.get_city_by_id(link.destination).name)
            component = component.replace("{{link_id}}", link.id)
            component = component.replace("{{city_path}}", f"/{link.destination}")
            components += component
        return components

    def replace_tags(self) -> str:
        with open(self.template, 'r') as file:
            data = file.read()
            data = data.replace("{{name}}", self.city.name)
            data = data.replace("{{id}}", self.city.id)
            data = data.replace("{{district}}", self.city.district)
            data = data.replace("{{population}}", self.city.population)
            data = data.replace("{{descr}}", self.city.desc)
            data = data.replace("{{links}}", self.link_components)
        return data

    def write_page(self, path: str) -> None:
        with open(path, 'w') as file:
            file.write(self.page)


class ShowGenerator:
    def __init__(self, cityManager: CityManager, template_path: str, output_path: str) -> None:
        self.cityManager = cityManager
        self.template: str = template_path
        self.output: str = output_path

        self.show_pages = self.generate_show_pages()

    def generate_show_pages(self) -> List[ShowPage]:
        pages: List[ShowPage] = []
        for city in self.cityManager.cities:
            pages.append(ShowPage(self.cityManager, city, self.template))
        return pages

    def write_show_pages(self) -> None:
        for page in self.show_pages:
            page.write_page(f"{self.output}{page.city.id}.html")


def main(json_file):
    cityManager = CityManager(json_file)

    index = IndexPage(cityManager, INDEX_TEMPLATE_PATH, INDEX_PATH)
    index.write_page()

    showGenerator = ShowGenerator(cityManager, SHOW_TEMPLATE_PATH, SHOW_FOLDER)
    showGenerator.write_show_pages()

if __name__ == "__main__":
    json_file = "./virtual-map.json"
    main(json_file)

