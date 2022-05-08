const dev_local = {
    url: {
        API_GET_MODEL_LIST: "https://dbapidev.digitalflowplanning.com/viewerapi?UserId=",
        API_UPLOAD_MODEL: "http://localhost:8080/upload",
        API_DELETE_MODEL: "http://localhost:8080/delete",
        API_RENAME_MODEL: "https://dbapidev.digitalflowplanning.com/viewerapi"
    }
};

const dev_server = {
    url: {
        API_GET_MODEL_LIST: "https://dbapidev.digitalflowplanning.com/viewerapi?UserId=",
        API_UPLOAD_MODEL: "https://serverapidev.digitalflowplanning.com/upload",
        API_DELETE_MODEL: "https://serverapidev.digitalflowplanning.com/delete",
        API_RENAME_MODEL: "https://dbapidev.digitalflowplanning.com/viewerapi"
    }
};

const prod = {
    url: {
        API_GET_MODEL_LIST: "https://dbapiprod.digitalflowplanning.com/viewerapi?UserId=",
        API_UPLOAD_MODEL: "https://serverapiprod.digitalflowplanning.com/upload",
        API_DELETE_MODEL: "https://serverapiprod.digitalflowplanning.com/delete",
        API_RENAME_MODEL: "https://dbapiprod.digitalflowplanning.com/viewerapi"
    }
};

const config_env = () => {
    const env = process.env.NODE_ENV;
    const react_env = process.env.REACT_APP_ENV;
    if(env !== "test") {
        if(env === "production") {
            if(react_env === "dev_server") {
                return dev_server;
            } else {
                return prod;
            }
        } else {
            return dev_local;
        }
    }
}

export const urlConfig = config_env();