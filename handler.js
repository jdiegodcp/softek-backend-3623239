import fs from 'fs';
// Se utilizan 3 funciones para poder reutilizar valores que se repiten y no cambian casi nada uno del otro endpoint.
const getAllElements = async (searchvalue, mapa_elementos, apiEndpoint, res) => {
  if (searchvalue !== null) {
    apiEndpoint = apiEndpoint + '?search=' + searchvalue
  }
  try {
    await fetch(apiEndpoint).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        let resultadoTraducido = {};
        for (let prop1 in data) {
          let attribute1 = String(mapa_elementos[String(prop1)]);
          resultadoTraducido[attribute1] = data[prop1];
          if (attribute1 === 'resultados') {
            let tempArr = resultadoTraducido[attribute1];
            for (let index = 0; index < tempArr.length; index++) {
              let resultadoTraducido2 = {};
              const element = tempArr[index];
              for (const prop2 in element) {
                let attribute2 = String(mapa_elementos[String(prop2)]);
                resultadoTraducido2[attribute2] = element[prop2];
              }
              resultadoTraducido[attribute1][index] = resultadoTraducido2
            }
          }
        }
        res = resultadoTraducido
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  } catch (error) {
    console.error(error);
    res = 'Internal Server Error';
  }
  return res
};

const getOneElement = async (searchvalue, mapa_elementos, apiEndpoint, res) => {
  if (searchvalue !== null) {
    apiEndpoint = apiEndpoint + '?search=' + searchvalue
  }
  try {
    await fetch(apiEndpoint).then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return response.json();
    })
      .then(data => {
        let resultadoTraducido = {};
        for (let prop1 in data) {
          let attribute1 = String(mapa_elementos[String(prop1)]);
          resultadoTraducido[attribute1] = data[prop1];
        }
        res = resultadoTraducido
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  } catch (error) {
    console.error(error);
    throw new Error('Ha ocurrido un error en el servidor')
  }
  return res
};

const getResource = async (event, context, callback, resourceType, elementId = null) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body = '';
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  try {
    let searchvalue = null;
    if (event.queryStringParameters !== null && event.queryStringParameters !==undefined) {
      const { search } = event.queryStringParameters
      searchvalue = (event.queryStringParameters === null || search == undefined) ? null : search
    }
    const map_translator = await fs.promises.readFile('mapa_traducir.json', 'utf-8');
    const mapa_traductor = JSON.parse(map_translator);
    const url = elementId ? `https://swapi.py4e.com/api/${resourceType}/${elementId}/` : `https://swapi.py4e.com/api/${resourceType}/`;
    body = await (elementId ? getOneElement(searchvalue, mapa_traductor, url, null) : getAllElements(searchvalue, mapa_traductor, url, null));
    if (body === null || (body !== null && body.contar == 0)) {
      body = {}
      body.detalle = 'No se encontraron datos en la búsqueda'
      statusCode = 404
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body).replace("+", '');
  }

  callback(null, {
    statusCode,
    body,
    headers,
  });
};


export const peopleGetOne = async (event, context, callback) => {
  await getResource(event, context, callback, 'people', event.pathParameters.id);
};

export const peopleGetAll = async (event, context, callback) => {
  await getResource(event, context, callback, 'people', null);
};

export const peopleSearch = async (event, context, callback) => {
  await getResource(event, context, callback, 'people', null);
};

export const planetsGetOne = async (event, context, callback) => {
  await getResource(event, context, callback, 'planets', event.pathParameters.id);
};

export const planetsGetAll = async (event, context, callback) => {
  await getResource(event, context, callback, 'planets', null);
};

export const filmsGetOne = async (event, context, callback) => {
  await getResource(event, context, callback, 'films', event.pathParameters.id);
};

export const filmsGetAll = async (event, context, callback) => {
  await getResource(event, context, callback, 'films', null);
};

export const speciesGetOne = async (event, context, callback) => {
  await getResource(event, context, callback, 'species', event.pathParameters.id);
};

export const speciesGetAll = async (event, context, callback) => {
  await getResource(event, context, callback, 'species', null);
};

export const vehiclesGetOne = async (event, context, callback) => {
  await getResource(event, context, callback, 'vehicles', event.pathParameters.id);
};

export const vehiclesGetAll = async (event, context, callback) => {
  await getResource(event, context, callback, 'vehicles', null);
};