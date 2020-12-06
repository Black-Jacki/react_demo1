import Component from '../react/component'

const ReactDOM = {
    render
}

// 渲染子节点
function render(vnode, container) {
    return container.appendChild(_render(vnode))
}

function createComponent(comp, props) {

    let inst
    // 如果是类定义的组件，则创建实例返回
    if (comp.prototype && comp.prototype.render) {
        inst = new comp(props)
    } else {
        // 如果是函数组件，将函数组件扩展成类组件，方便后面统一管理
        inst = new Component(props)
        inst.constructor = comp
        // 定义render函数
        inst.render = function() {
            return this.constructor(props)
        }
    }

    return inst
}

function renderComponent(comp) {
    let base
    const renderer =  comp.render()
    base = _render(renderer)
    comp.base = base
}

function setComponentProps(comp, props) {
    // 设置组件的属性
    comp.props = props
    // 渲染组件
    renderComponent(comp)
}

function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
        vnode = ''
    }

    // 如果vnode是字符串
    if (typeof vnode === 'string') {
        // 创建文本节点
        return document.createTextNode(vnode)
    }

    // 如果tag是函数，则渲染组件
    if (typeof vnode.tag === 'function') {
        // 1.创建组件
        const comp = createComponent(vnode.tag, vnode.attrs)
        // 2.设置组件的属性
        setComponentProps(comp, vnode.attrs)
        // 3.返回组件渲染的节点对象
        return comp.base
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

    return dom
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