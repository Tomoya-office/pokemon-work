import axios from 'axios';

// 関数$axiosは、サーバーにAPIリクエストを送信する用の関数になります。

/*axiosの処理*/
/**
 * axiosのラッパー関数
 * @param {string} requestUrl リクエスト先URL
 * @return {Promise} プロミスオブジェクト
 */
export const $axios = (requestUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl).then(res => {
      resolve(res);

    }).catch(error => {
      //エラーしたときの処理
      switch (error.response && error.response.status) {
        case 404:
          reject(error.message);
          break;
        default:
          reject('エラーが発生しました。時間をおいて再度お試しください。');
          break;
      }
    });
  });
};