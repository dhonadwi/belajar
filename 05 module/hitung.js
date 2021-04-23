import bagi from './bagi.js';
import kali from './kali.js';

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const btnKali = document.querySelector('#kali');
    const btnBagi = document.querySelector('#bagi');

    btnKali.addEventListener('click', () => {
     kali(2,5);
    })
    
    btnBagi.addEventListener('click', () => {
      bagi(2,5);
    })
  })
}

export default main;