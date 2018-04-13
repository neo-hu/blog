# # -*- coding: utf-8 -*-
import json
import re
from bs4 import BeautifulSoup
from bs4 import element
import requests
import datetime
import pickle
import urlparse
import sys
import os

reload(sys)
sys.setdefaultencoding('utf-8')

# conn = pymongo.MongoClient(host="localhost", port=27017)
# db = conn['csdn']
# category_tb = db["categories"]
# blogs_tb = db["blogs"]
if not os.path.exists("db"):
    os.mkdir("db")
url = "http://blog.csdn.net/u010066807/article/list/1"
d = datetime.datetime.now().date().strftime("%Y-%m-%d")
headers = {"Host": "blog.csdn.net",
           "Connection": "keep-alive",
           "Cache-Control": "max-age=0",
           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
           "Upgrade-Insecure-Requests": "1",
           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36",
           "Referer": "http://blog.csdn.net/u010066807?viewmode=contents",
           "Accept-Encoding": "gzip, deflate, sdch",
           "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2",
           }


def get_categories(uri=url):
    rep = requests.get(uri, headers=headers)
    assert rep.status_code == 200
    content = rep.content
    soup = BeautifulSoup(content, "html.parser")
    category_a = soup.select(".ClassSort-list a")
    r = []
    for itme in category_a:
        r.append({"title": itme.text.strip(), "url": itme.attrs.get("href").split("/")[-1], "d": d})
    if r:
        with open("db/categories.json", "wb") as f:
            f.write(json.dumps(r))


def get_blogs(uri=url):
    rep = requests.get(uri, headers=headers)
    assert rep.status_code == 200
    content = rep.content
    soup = BeautifulSoup(content, "html.parser")
    r = []
    blogs = soup.select(".blog-units .blog-unit")
    for blog in blogs:
        try:
            top = 0
            description = blog.select_one("a p.text")
            description_text = ""
            if description:
                description_text = description.text
            item = blog.select_one("a")
            h3 = item.select_one("h3")
            title = h3.text.replace("\n", "").replace("\r", "").strip().replace('置顶', '').strip()
            postdate = blog.select(".unit-control div div")[1].text.strip().split(" ")[0]
            href = item.attrs.get("href")

            categories, article_content = get_content(urlparse.urljoin(uri, href))
            _article_id = href.split("/")[-1]
            with open("db/%s" % _article_id, "wb") as f:
                f.write(article_content)
            r.append({"title": title, "url": _article_id, "postdate": postdate, "top": top,
                      "description_text": description_text,
                      "categories": categories})
        except Exception as e:
            print(e)
            raise e

    papelist = soup.select("#papelist a")
    papelist = set(filter(lambda x: x.text == "下一页", papelist))
    next_url = None
    if papelist:
        next_url = papelist.pop().attrs.get("href")
    if next_url:
        r += get_blogs("http://blog.csdn.net%s" % next_url)
    return r


def get_content(blog_url):
    rep = requests.get(blog_url, headers=headers)
    assert rep.status_code == 200
    content = rep.content
    soup = BeautifulSoup(content, "html.parser")
    article_content = soup.select_one("#article_content")
    [x.extract() for x in article_content('script')]
    category_r = soup.select(".article_bar .article_tags a")
    _l = []
    for item in category_r:
        [v.extract() for v in item.children if not isinstance(v, element.NavigableString)]
        _l.append(item.text.strip())

    return _l, str(article_content)


get_categories()

r = get_blogs()
with open("db/articles.json", "wb") as f:
    f.write(json.dumps(r))
