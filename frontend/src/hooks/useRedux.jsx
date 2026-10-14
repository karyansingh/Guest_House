
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function useRedux() {
  const dispatch = useDispatch();
  const dispatchValue = (action) => {
    dispatch(action);
};

const selectorValue = (selectorFn) => {
    return useSelector(selectorFn);
};
  return { dispatchValue, selectorValue };
}

export default useRedux;