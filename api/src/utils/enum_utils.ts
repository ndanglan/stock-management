export enum HttpStatusCode {
  Success=200,
  Failed=400,
  Failed2=401,
}

export enum JobStatus{
  INTERVIEW='INTERVIEW',
  DECLINED='DECLINED',
  PENDING='PENDING'
}

export enum ErrorHandlerType{
  VALIDATIONERROR='ValidationError',
  CASTERROR='CastError'
}