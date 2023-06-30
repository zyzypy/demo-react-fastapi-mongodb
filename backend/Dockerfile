#https://www.runoob.com/docker/docker-dockerfile.html
FROM python:3.10.12-alpine

WORKDIR /App

COPY requirements.txt ./
# RUN pip config set global.index-url https://pypi.douban.com/simple/
RUN pip install -r requirements.txt

# if source code change frequetly, use VOLUMN
COPY . .
EXPOSE 8000

CMD uvicorn app:app --host 0.0.0.0 --proxy-headers --port 8000 --log-level=debug