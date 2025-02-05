# MQTT Microservice sample

To be able to receive MQTT messages in the platform we need to set up two microservices:  
1. MQTT Broker. This will run an out-of-the-box MQTT broker, e.g. mosquitto. The devices will send messages to this service.
2. MATT Client. This service will listen for new messages and process them in order to get the data into the platform.
## Broker

To set up a broker we need to create a new microservice and deploy it.  
Once deployed, the API can be used to update its docker image  
For example, to use mosquitto:

```
curl -X PATCH 'http://{TENANT}.davra.com/api/v1/microservices/{MICROSERVICE_UUID}' \
--header 'Authorization: Bearer {AUTH_TOKEN}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config.dockerImage": "registry.hub.docker.com/library/eclipse-mosquitto:1.6"
}'
```

Now to enable direct access to the microservice we add a TCP route with microservice port set to 1883.  
We copy the url and port of the new route to use when setting up the client.

## Client

Create a new microservice and use the files on the `client` directory of this repo (`index.js` and `package.json`)  
Replace the `MQTT_BROKER` variable value with the url and port of the broker microservice.  
Replace the `TOPIC_NAME` variable value with the topic to use.  
Open the terminal and run `npm start`  

To test it we can use a client like [this one](http://mqtt-explorer.com/)  
Publish a message to the topic used before and you should see it being logged on the console.
