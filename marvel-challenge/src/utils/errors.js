export function handleError(error, requestDescription) {
  const errorData = {
    request: requestDescription,
    message: "",
    statusCode: null,
    timestamp: new Date().toISOString(),

    errorDetails: error.toString(),
  };

  if (error.response) {
    const status = error.response.status;
    errorData.statusCode = status;

    if (status === 404) {
      errorData.message = `Error 404: Recurso no encontrado en ${requestDescription}`;
      console.error(errorData.message);
    } else if (status >= 500) {
      errorData.message = `Error ${status}: Problema del servidor en ${requestDescription}`;
      console.error(errorData.message);
    } else {
      errorData.message = `Error ${status}: ${error.response.statusText} en ${requestDescription}`;
      console.error(errorData.message);
    }
  } else if (error.request) {
    errorData.message = `Error de red o falta de respuesta del servidor en ${requestDescription}`;
    console.error(errorData.message);
  } else {
    errorData.message = `Error desconocido al procesar ${requestDescription}: ${error.message}`;
    console.error(errorData.message);
  }

  sendLogs(errorData);

  return { error: errorData.message };
}

function sendLogs(errorData) {
  //Simular post a un servicio de logs, por ejemplo, Graylog
  console.log("Enviando log a Graylog:", errorData);
}
