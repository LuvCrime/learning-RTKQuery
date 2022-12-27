import {useDispatch} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import { jsonPlaceholderActions } from '../redux/jsonplaceholder.api/jsonplaceholder.slice';

const actions = {
  ...jsonPlaceholderActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}