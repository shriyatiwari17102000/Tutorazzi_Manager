export const fileChecker = (file) => {
    const fileSizeInMB = file?.size / (1024 * 1024)
    const videoAudioTypes = ['video/mp4', 'video/webm', 'video/ogg', 'audio/mpeg', 'audio/wav', 'audio/ogg']

    if (fileSizeInMB > 5) {
        return {
            value: false,
            message :'File must be less than 5Mb!'
        }
    }
    if (videoAudioTypes.includes(file?.type)) {
        return {
            value: false,
            message :'Video & Audio type files are invalid!!'
        }
    }

    return {
        value:true
    }

}