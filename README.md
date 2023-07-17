React-FastAPI-Mongo Demo
===
## Brief
Status:  
Year: 2022  

A Demo built with popular frameworks with React,FastAPI,MongoDB and TailwindCSS.  
I studied this project from the book 《Full Stack FastAPI,React,and MongoDB》.  
[Live Demo](https://demo-farm-react.zyzypy.com/)

根据实战项目图书学习的一个项目，为了补足个人短板，React国外需求量大比Vue好找工作，FastAPI是前后端分离时代Python生态开始火爆的框架，
TailwindCSS是近年来CSS领域难得火爆的UI框架。业务逻辑简单，关于汽车数据的增删改查，主要关注架构。

## Tech Stack
![](./README_IMG/1-structure.png)  
- Frontend:  
    - React create-react-app react-router  
    - TailwindCSS  
- Backend: FastAPI  
- Database: Mongodb  
- Deployment:  
  - docker-compose  
  - Caddy  


Personal opinion:  
- Admittedly, React is the most popular frontend framework and has most active ecology, it similar to past backend 
framework like Java .jsp file, it's flexible and easy to understand, but code isn't concise and everyone has different code
style that reduces legibility.  
- Tailwind CSS, really hot in 2022, though it's says itself has several features, but it's really similar to Bootstrap.
Though we say inline-style isn't benefit to maintenance, however, as a back-end programmer with limited front-end capabilities,
I can't continue using the React-Material-UI, but succeeded in making the project when using Tailwind. It's easier to use
and modify than component UI lib, but in-line style, what's your choice?  
- FastAPI, will become to the most popular framework in Python field, will surpass Django, because of front-rear-separate-development today.
Not freedom and many restrictions when coding, but parameter checking and API documentation will be generated automatically.
- Mongodb, I still preferred relationship database.
- docker compose, suitability for this project which contains three sub-service.
- Caddy, a simply auto-https reverse proxy server similar to Nginx.

