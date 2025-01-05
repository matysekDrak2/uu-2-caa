const Methods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
}

/**
 * @param baseUri {string} domain of server
 * @param path {string} path to call on the server
 * @param requestMethod {Methods} one of provided methods
 * @param data {JSON|null} data to send in request body
 * @return {Promise<Object<ok: boolean, data: JSON>>}
 * */
async function Call(baseUri, path, requestMethod, data= null) {
    const uri = `${baseUri}/${path}`;
    /**@type {Response}*/
    let response
    if (requestMethod === Methods.get || requestMethod === Methods.delete){
        response = await fetch( `${uri}${data ? `?${data}` : '' }`, {method: requestMethod });
    } else {
        response = await fetch(`${uri}`,{
            method: requestMethod,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    const body = await response.json()
    return {ok: response.ok, data: body};
}

/** returns object with functions that call workout API and return data*/
export function WorkoutAPI(){
    const uri = 'http://localhost:8080'
    const path = 'api/1/workout/'
    return {
        create: async (data) => {return Call(uri, `${path}create`,  Methods.post, data)},
        delete: async (id  ) => {return Call(uri, `${path}${id}`,   Methods.delete)},
        get:    async (id  ) => {return Call(uri, `${path}${id}`,   Methods.get)},
        getAll: async (data) => {return Call(uri, `${path}`,        Methods.get, data)},
        update: async (data) => {return Call(uri, `${path}update`,  Methods.put, data)},
    }
}
/** returns object with functions that call exercise API and return data*/
export function ExerciseAPI(){
    const uri = 'http://localhost:8080'
    const path = 'api/1/exercise/'
    return {
        create:         async (data) => {return Call(uri, `${path}create`,          Methods.post, data)},
        delete:         async (id  ) => {return Call(uri, `${path}${id}`,           Methods.delete)},
        get:            async (id  ) => {return Call(uri, `${path}${id}`,           Methods.get)},
        getAll:         async (data) => {return Call(uri, `${path}`,                Methods.get, data)},
        update:         async (data) => {return Call(uri, `${path}update`,          Methods.put, data)},
        satisfaction:   async (data) => {return Call(uri, `${path}satisfaction`,    Methods.put, data)},
    }
}