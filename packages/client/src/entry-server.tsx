import ReactDOM from 'react-dom/server'

const AppSSRTemporary = function () {
  return <>Hello</>
}

export const render = () => ReactDOM.renderToString(<AppSSRTemporary />)
