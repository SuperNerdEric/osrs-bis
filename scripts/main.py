import requests
import mwparserfromhell
import json

API_URL = 'https://oldschool.runescape.wiki/api.php'


def get_transcluded_page_ids(template_name, continue_param=None):
    params = {
        'action': 'query',
        'list': 'embeddedin',
        'eititle': template_name,
        'eilimit': 'max',
        'format': 'json'
    }

    if continue_param:
        params.update(continue_param)

    response = requests.get(API_URL, params=params).json()

    if 'query' not in response:
        return []

    page_ids = [page['pageid'] for page in response['query']['embeddedin']]

    if 'continue' in response:
        page_ids.extend(get_transcluded_page_ids(template_name, response['continue']))

    return page_ids

def get_monster_ids():
    params = {
        'action': 'query',
        'format': 'json',
        'list': 'embeddedin',
        'eititle': 'Template:Infobox Monster',
        'eilimit': 'max'  # gets up to 500 IDs at once, you might want to implement continuation if there are more
    }

    response = requests.get(API_URL, params=params)
    data = response.json()
    page_ids = [page['pageid'] for page in data['query']['embeddedin']]
    return page_ids

def get_page_contents(page_ids):
    ids_string = "|".join(map(str, page_ids))
    params = {
        'action': 'query',
        'format': 'json',
        'pageids': ids_string,
        'prop': 'revisions',
        'rvprop': 'content'
    }

    response = requests.get(API_URL, params=params)
    data = response.json()
    return data['query']['pages']

def parse_infobox(wikitext):
    parsed_data = mwparserfromhell.parse(wikitext)
    infoboxes = [template for template in parsed_data.filter_templates() if 'Infobox Monster' in template.name]
    if infoboxes:
        infobox = infoboxes[0]  # Only taking the first infobox for simplicity
        return {param.name.strip(): param.value.strip() for param in infobox.params}
    return {}

def fetch_page_content(page_ids):
    response = requests.get(API_URL, params={
        'action': 'query',
        'pageids': '|'.join(map(str, page_ids)),
        'prop': 'revisions',
        'rvprop': 'content',
        'format': 'json'
    })
    return {page['title']: page['revisions'][0]['*'] for page in response.json()['query']['pages'].values()}

def extract_infoboxes(wikitext):
    code = mwparserfromhell.parse(wikitext)
    return [template for template in code.filter_templates() if template.name.strip().startswith("Infobox Monster")]

def split_versions(monster_data):
    versions = {}
    max_version = max([int(key.replace('version', '')) for key in monster_data.keys() if
                       key.startswith('version') and len(key) > len('version')], default=0)
    if max_version == 0:
        versions['default'] = monster_data
    else:
        for version_number in range(1, max_version + 1):
            version_name = monster_data.get(f'version{version_number}', f'default{version_number}')
            version_data = {k.replace(str(version_number), ''): v for k, v in monster_data.items() if k.endswith(str(version_number)) and not k.startswith('version')}
            for k, v in monster_data.items():
                if not any(k.endswith(str(i)) for i in range(1, max_version + 1)):
                    version_data[k] = v
            versions[version_name] = version_data
    return versions


def main():
    monsters = []
    page_ids = get_transcluded_page_ids('Template:Infobox Monster')

    for i in range(0, len(page_ids), 50):  # Batch size of 50
        batch_ids = page_ids[i:i + 50]
        pages_content = fetch_page_content(batch_ids)
        for title, content in pages_content.items():
            infoboxes = extract_infoboxes(content)
            for infobox in infoboxes:
                data = {param.name.strip(): param.value.strip() for param in infobox.params if param.showkey}
                monster_versions = split_versions(data)
                monster_entry = {
                    'title': title,
                    'data': monster_versions
                }
                monsters.append(monster_entry)

    with open('./wiki_monster_data.json', 'w', encoding='utf-8') as f:
        json.dump(monsters, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()