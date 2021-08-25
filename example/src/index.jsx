import * as Surplus from 'surplus'; Surplus;
import S from 's-js'

S.root(() => {
  const name = S.data(`world ${Date.now()}`)
  const view = (
    <div>
      <h1>Hello {name()}!</h1>
    </div>
  )
  const root = document.getElementById('js-root')
  root.innerHTML = ''
  root.appendChild(view)

  setInterval(() => {
    name(`world ${Date.now()}`)
  }, 10)
})
