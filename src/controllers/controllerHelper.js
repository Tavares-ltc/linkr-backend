const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401
  });
  
  const STATUS_TEXT = Object.freeze({
    OK: "ok",
    CREATED: "created",
    UNPROCESSABLE_ENTITY: "unprocessable entity",
    BAD_REQUEST: "bad request",
    SERVER_ERROR: "internal server error",
    NOT_FOUND: "not found",
    UNAUTHORIZED: "unauthorized"
  });
  
  function badRequestResponse(res, text = STATUS_TEXT.BAD_REQUEST) {
    return res.status(STATUS_CODE.BAD_REQUEST).send(text);
  }
  
  function notFoundRequestResponse(res, text = STATUS_TEXT.NOT_FOUND) {
    return res.status(STATUS_CODE.NOT_FOUND).send(text);
  }
  
  function unprocessableRequestResponse(
    res,
    text = STATUS_TEXT.UNPROCESSABLE_ENTITY
  ) {
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(text);
  }
  function okResponse(res, text = STATUS_TEXT.OK) {
    return res.status(STATUS_CODE.OK).send(text);
  }
  
  function serverErrorResponse(res, error, text) {
    console.error(error);
    return res.status(STATUS_CODE.SERVER_ERROR).send(text);
  }

  function unauthorizedResponse(res, text = STATUS_TEXT.UNAUTHORIZED) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send(text);
  }
  
  export {
    badRequestResponse,
    unprocessableRequestResponse,
    notFoundRequestResponse,
    okResponse,
    serverErrorResponse,
    unauthorizedResponse
  };