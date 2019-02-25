# # -*- coding: utf-8 -*-
import json
import re
from bs4 import BeautifulSoup
from bs4 import element
import requests
import datetime
import pickle
import traceback
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
    blogs = soup.select(".article-list .article-item-box")
    for blog in blogs:
        try:
            top = 0
            description = blog.select_one(".content")
            description_text = ""
            if description:
                description_text = description.get_text(strip=True)
            if blog.attrs.get("style", "") == "display: none;":
                continue
            h4 = blog.select_one("h4 a")
            for l in h4.contents:
                if isinstance(l, element.Tag):
                    h4.contents.remove(l)
            title = h4.get_text(strip=True).replace("\n", "").replace("\r", "").strip()
            if title.startswith("转") or title.startswith("原"):
                title = title[1:]
            if blog.select_one(".settop"):
                top = 1

            postdate = blog.select_one(".info-box p .date").get_text(strip=True).split(" ")[0]
            href = h4.attrs.get("href")
            categories, article_content = get_content(urlparse.urljoin(uri, href))
            _article_id = href.split("/")[-1]
            with open("db/%s" % _article_id, "wb") as f:
                f.write(article_content)
            print(title)
            r.append({"title": title, "url": _article_id, "postdate": postdate, "top": top,
                      "description_text": description_text,
                      "categories": categories})
        except Exception as e:
            traceback.print_exc()
            raise e
    papelist = soup.select(".pagination a")
    papelist = set(filter(lambda x: x.attrs.get('rel') and x.attrs.get('rel')[0] == "next", papelist))
    next_url = None
    if papelist:
        next_url = papelist.pop().attrs.get("href")
    if next_url:
        r += get_blogs(next_url)
    return r


def get_content(blog_url):
    print(blog_url)
    rep = requests.get(blog_url, headers=headers)
    assert rep.status_code == 200
    content = rep.content
    soup = BeautifulSoup(content, "html.parser")
    article_content = soup.select_one("#content_views")
    [x.extract() for x in article_content('script')]
    [x.extract() for x in article_content('svg')]
    _l = []
    return _l, str(article_content).replace("https://img-blog.csdn.net", "http://img-blog.csdn.net")


get_categories()

r = get_blogs()
with open("db/articles.json", "wb") as f:
    f.write(json.dumps(r))
