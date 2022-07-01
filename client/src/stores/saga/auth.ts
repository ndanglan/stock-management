import axios from "axios";
import { all, call, put, takeLatest,take } from "redux-saga/effects";
import { login,signup } from "../../api/services/auth";
import { IPayloadAuth } from "../actions/authActions";
import { ActionTypes } from "../constants";

function* handleLogin(value:IPayloadAuth) {
  try {
    
      const {data} =!value.payload.username? yield call(
        login,
        value.payload
      ):yield call(
        signup,
        value.payload
      );
     
    if(data.status){
      yield put({ type: ActionTypes.LOGIN_ACTION, payload: { 
        ...data
       } });
    }else{
      yield put({type:ActionTypes.API_FAILED,payload:{
        ...data
      }})
    }
  } catch (e: any) {
    yield put({type:ActionTypes.API_FAILED,payload:{
      message:'Oops, something went wrong'
    }})
  }
}

function* watchLoginFlow() {
    yield takeLatest(ActionTypes.API_REQUESTING, handleLogin)
}

export function* authSaga() {
  yield all([watchLoginFlow()]);
}