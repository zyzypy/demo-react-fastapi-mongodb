FROM mongo:6.0.6

WORKDIR /App

COPY cars_data.csv ./tmp/cars_data.csv
# .sh .js in /docker-entrypoint-initdb.d directory will be executed when mongo container initializing.
COPY init_data.sh /docker-entrypoint-initdb.d

EXPOSE 27017
