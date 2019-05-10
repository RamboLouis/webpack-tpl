console.log('这是index.js')

function clickHandler1 (e) {
  console.log('0', e)
}

function clickHandler2 (e) {
  console.log('1', e)
}

const onClick1 = document.getElementById('OnClick1')
onClick1.onclick = clickHandler1

const onClick2 = document.getElementById('OnClick2')
onClick2.addEventListener('click', clickHandler2)

import axios from 'axios'

axios.get('http://localhost:8081/userInfo')
  .then(function (response) {
    console.log('status', response.status)
    console.log('response.data', response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
