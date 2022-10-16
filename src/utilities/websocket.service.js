import localStorageService from "./local.storage.service";

const connectAndSubscribe = (ws, topic, onError, onReceived) => {

    const token = localStorageService.getToken();
    const link = process.env.WEB_SOCKET.concat(ws);

    const header = {
        "Authorization" : `Bearer ${token}`
    }

    const errorHandler = (defaultErrorHandler) =>{
        defaultErrorHandler();
        setTimeout(connectStomp, 10000)
    }

    const connectStomp = () =>{

        const stompClient = Stomp.client(link);
        stompClient.debug = function(str) {};
        stompClient.connect(
            header,
            () =>stompClient.subscribe(topic, onReceived)
            ,() => {
                errorHandler(onError);
            });
    }

    connectStomp();
    }

export {connectAndSubscribe}