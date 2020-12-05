import React from '../react'
import ReactDOM from '../react-dom'

const ele = (
    <div className="active" title="react">
        hello, <span style={{ color: 'red', fontSize: 30 }}>react</span>
    </div>
)

ReactDOM.render(ele, document.querySelector('#app'))