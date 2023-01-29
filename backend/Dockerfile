FROM python:3.10.9

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip config set global.index-url https://pypi.douban.com/simple/  # comment out this line if you are not in china
RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

CMD [ "python", "./app.py" ]