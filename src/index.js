import React from '../react'
import ReactDOM from '../react-dom'


const Home = () => {
    return (
        <div className="active" title="react">
            hello, <span style={{ color: 'red', fontSize: 30 }}>react</span>
        </div>
    )
}

ReactDOM.render(
    <Home title={'active'} />,
    document.querySelector('#app')
)