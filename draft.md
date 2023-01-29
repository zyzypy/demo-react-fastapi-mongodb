Draft script
===

## Backend
### 
pip config set global.index-url https://pypi.douban.com/simple/ 
pip config set global.index-url https://pypi.org/simple/ 
pip install fastapi 
pip install uvicorn
pip config set global.index-url https://pypi.douban.com/simple/ 
alternative       pip install uvicorn[standard]      "Cython-based"

pip freeze > requirement.txt

### 
FROM python:3.8
COPY . /usr/src/python-demo
WORKDIR /usr/src/python-demo
ENTRYPOINT [ "python" ]
CMD ["python", "demo.py" ]

docker build --tag=pydemo:1.0.1
docker run -it pydemo:1.0.1


## Frontend
npm config set registry https://registry.npmmirror.com
(npm config set registry https://registry.npmjs.org/)
(npm config get registry)
npm install -g cnpm

npx create-react-app appname   (call npm by default, so cnpm not work)
(cnpm install -g create-react-app)
(create-react-app appname)

(create-react-app goes very slowly and broken because of China network connection,timeout error,even if set https://registry.npmmirror.com,
open ClashX global proxy and raw registry npmjs.org config, finally work)

Dockerfile
COPY package.json
cnpm install







## MongoDB
docker run --name "mongo" -d -p 27017:27017 mongo:6.0.3
docker run --name "mongo-express" -it --rm -p 8081:8081 --link mongo:mongo mongo-express

To import csv data, docker run -v/shell mongoimport -f/build a new image with COPY command/ would be troublesome.
 GUI is convenience, but only mongo-compass(not datagrip,not mongo-express) support importing csv file and automatically determining field type.
