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
import collections
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




def get_blogs_page(uri):
    index = 1
    while True:
        print(uri % index)
        rep = requests.get(uri % index, headers=headers)
        assert rep.status_code == 200
        content = rep.content
        soup = BeautifulSoup(content, "html.parser")
        blogs = soup.select(".article-list .article-item-box")
        index += 1
        if len(blogs) <= 0:
            break
        for blog in blogs:
            if blog.attrs.get("style", "") == "display: none;":
                continue
            top = 0
            description = blog.select_one(".content")
            description_text = ""
            if description:
                description_text = description.get_text(strip=True)
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
            _article_id = href.split("/")[-1]
            yield {"title": title, "url": _article_id, "postdate": postdate, "top": top,
                   "description_text": description_text,
                   "href": href}


d = datetime.datetime.now().date().strftime("%Y-%m-%d")
def get_categories():
    rep = requests.get("http://blog.csdn.net/u010066807/article/list/1", headers=headers)
    assert rep.status_code == 200
    content = rep.content
    soup = BeautifulSoup(content, "html.parser")
    category_a = soup.select("#asideCategory ul li a")
    r = collections.defaultdict(list)
    r2 = []
    for itme in category_a:
        name = itme.select_one(".title").get_text(strip=True)
        for b in get_blogs_page(itme.attrs['href']+"/%s"):
            r[name].append(b['title'])
        r2.append({'title': name, 'url': itme.attrs['href'].split("/")[-1], "d": d})
    with open("db/categories.json", "wb") as f:
        f.write(json.dumps(r2))
    return r


def get_blogs(categories):
    cs = collections.defaultdict(list)
    for c, articles in categories.items():
        for article in articles:
            cs[article].append(c)
    r = []
    blogs = get_blogs_page("http://blog.csdn.net/u010066807/article/list/%s")
    for blog in blogs:
        blog['categories'] = cs[blog['title']]
        try:
            article_content = get_content(blog['href'])
            with open("db/%s" % blog['url'], "wb") as f:
                f.write(article_content)
            r.append(blog)
        except Exception as e:
            traceback.print_exc()
            raise e
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
    return str(article_content).replace("https://img-blog.csdn.net", "http://img-blog.csdn.net")


categories = get_categories()
r = get_blogs(categories)
with open("db/articles.json", "wb") as f:
    f.write(json.dumps(r))
