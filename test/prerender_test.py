"""
Usage:
    prerender_test.py [--prerendered] <url> 
    prerender_test.py (-h | --help)
    prerender_test.py (-V | --version)

Options:
    -h --help   Show this screen
    -V --version    Show version
"""
from docopt import docopt
import requests
from bs4 import BeautifulSoup

APP_VERSION='0.0.0'

def main(arguments):
    if arguments['--prerendered']:
        headers = {"user-agent": "GoogleBot"}
    else:
        headers = {"user-agent": "prerender-test-bot"}

    url = arguments['<url>']

    r = requests.get(url=url, headers=headers)
    soup = BeautifulSoup(r.text,'html.parser')

    data = {
        "tag": {},
        "ogp": {} 
    }   

    for i in soup.find_all("meta"):
        if i.get("property", None) is not None:     
            if i.get("property", None).split(":")[0] == "og":
                data["tag"][i.get("property", None)] = i
                data["ogp"][i.get("property", None)] = i.get("content", None)
    
    print(data) 

if __name__ == "__main__":
    arguments = docopt(__doc__,version="Prerender Test {}".format(APP_VERSION))
    main(arguments)

