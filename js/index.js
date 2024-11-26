import { $axios } from './axiosHelper.js';
import { createErrorElement, createElements } from './createElement.js';
// 必要な関数をモジュールからインポートする

window.addEventListener('DOMContentLoaded', (event) => {
  const formElement = document.forms['search-form'];
  event.preventDefault();

  //HTML要素とlist要素の取得
  const characterElement = document.getElementById('list');
  //ポケモン151体分のデータ取得
  $axios('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => {
    for (let i = 0; i <= 151; i++) {
      //axiosでポケモンの画像データを取得
      $axios(response.data.results[i].url).then(response => {
        const imgPath = response.data.sprites.other['official-artwork'].front_default;

        //axiosでポケモンの日本語データを取得
        $axios(response.data.species.url).then(response => {
          const characterName = response.data.names[0].name;
          const list_img = document.createElement('li');
          console.log(list_img);
          list_img.classList.add("list-item");
          const imgElement = `<div class="character"><img src="${imgPath}" width="475" height="475" alt="" class="character__img"></div>`;
          const nameElement = `<p class="character__name">${characterName}</p>`;
          list_img.innerHTML = imgElement + nameElement;

          characterElement.appendChild(list_img);
        });
      }).catch(() => {
        formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
      });
    }

  }).catch(() => {
    formElement.after(createErrorElement('エラーが発生しました。時間をおいて再度お試しください。'));
  });
});

// }).catch(() => {

// });


