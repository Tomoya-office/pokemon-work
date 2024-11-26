import { $axios } from './axiosHelper.js';
import { createErrorElement, createElements } from './createElement.js';
// 必要な関数をモジュールからインポートする

window.addEventListener('DOMContentLoaded', (event) => {
  // HTMLのパース（解析）が完了したら実行される
  // formタグを取得
  const formElement = document.forms['search-form'];
  // formのデフォルトの動作をキャンセル
  event.preventDefault();

  //HTML要素とlist要素の取得
  const characterElement = document.getElementById('list');
  //ポケモン151体分のデータ取得
  $axios('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => {
    // API通信が成功した時の処理

    //for文で繰り返し処理
    for (let i = 0; i <= 151; i++) {
      //axiosでポケモンの画像データを取得
      $axios(response.data.results[i].url).then(response => {
        //↓ポケモンの画像URL  「mgPath」にレスポンスに含まれているポケモンの画像url
        const imgPath = response.data.sprites.other['official-artwork'].front_default;
      //axiosでポケモンの日本語データを取得
        $axios(response.data.species.url).then(response => {
          // ↓ポケモン名の日本語訳を取得するためにAPIリクエスト
          //名前のデータを取得
          // ↓日本語訳のリクエスト先url[0]の入力で日本語を取得。ここの数字を別の値にすると別の言語になる。
          const characterName = response.data.names[0].name;

          // 取得したポケモンの情報をもとに表示するHTML要素を作成
          // ポケモンの写真の埋め込み
          //↓↓↓ listで囲い取得します。
          const list_img = document.createElement(`li`);
          //↓↓↓ list_imgに「list-item」というクラスを付与
          list_img.classList.add("list-item");
          const imgElement = `<div class="character"><img src="${imgPath}" width="475" height="475" alt="" class="character__img"></div>`;
          // ポケモンの名前を埋め込み
          const nameElement = `<p class="character__name">${characterName}</p></li>`;
          list_img.innerHTML = imgElement + nameElement;

          // 作成したHTML要素をDOMに反映
          // appendChildメソッドを使用して、作成したDocumentFragmentをdivタグの子要素の末尾に追加している
          //htmlに反映させますというプログラム
          characterElement.appendChild(list_img);
        });
      }).catch(() => {
        API通信が失敗した時の処理
        リクエストに失敗した場合はエラーメッセージを表示
        formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
      });
    }

  }).catch(() => {

  });


});

// }).catch(() => {

// });


