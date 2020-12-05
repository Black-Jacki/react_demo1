const ReactDOM = {
    render
}

// 设置属性
function render(vnode, container) {

    if (vnode === undefined) { return }

    // 如果vnode是字符串
    if (typeof vnode === 'string') {
        // 创建文本节点
        const textNode = document.createTextNode(vnode)

        return container.appendChild(textNode)
    }

    // 如果是虚拟DOM对象
    const { tag, attrs } = vnode
    // 创建节点对象
    const dom = document.createElement(tag)

    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }

    // 递归渲染子节点
    vnode.childrens.forEach(child => render(child, dom))

    return container.appendChild(dom)

}

// 设置属性
function setAttribute(dom, key, value) {
    // 将属性名 className 转换成 class
    if (key === 'className') {
        key = 'class'
    }

    // 如果是事件 onClick onBlur ...
    if (/on\w+/.test(key)) {
        // 转小写
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {

        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''

        } else if (value && typeof value === 'object') {
            
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        // 其他属性
        if (key in dom) {
            // 如果属性名在当前dom中，直接赋值
            dom[key] = value || ''
        }
        if (value) {
            // 更新值
            dom.setAttribute(key, value)
        } else {
            // 移除值
            dom.removeAttribute(key)
        }
    }
}

export default ReactDOM