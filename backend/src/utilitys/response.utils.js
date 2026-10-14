export const sendResponse = (res, data = null, status = 200, message = "Success") => {

    if (data === null) {
        console.error("Fail")
        res.status(status).json({ status, message, data })
    } else if (data.code) {
        console.error("Fail")
        let message = "Fail"
        let status = 400
        res.status(status).json({ status, message, data })
    }else{
        console.info("Success")
        res.status(status).json({ status, message, data })
    }
   
}
export const setError = (res, err = null, status = 400, message = "Fail") => {
    console.error(err)
    res.status(status).json({ status, message, err })
}