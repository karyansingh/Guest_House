import { useCallback } from 'react'
import { isLoading } from '../store/slices/LoadingSlice'
import useRedux from './useRedux';
const useLoading = () => {
    const {dispatchValue, selectorValue}=useRedux()
    const { loading } = selectorValue((state) => state.loading)
 const callAPI = useCallback(async (action, ...args) => {
         dispatchValue(isLoading(true));
        try {
            const result = await action(...args)
            return result
        } finally {
             dispatchValue(isLoading(false))
        }
    }, [dispatchValue]);

    return { loading, callAPI }
}

export default useLoading