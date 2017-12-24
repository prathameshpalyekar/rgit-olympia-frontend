import axios from 'axios';

import Config from '../../../config';

export default function upload(file, auth, progress) {
    let data = new FormData();
    data.append('image', file);

    return axios({
        url: Config.BASE_URL + 'uploads' + (auth ? '' : '/externalupload'),
        method: 'post',
        responseType: 'json',
        data: data,
        progress: (progressEvent) => {
            let percentCompleted = progressEvent.loaded / progressEvent.total;
            progress && progress(percentCompleted);
        }
    });
}
