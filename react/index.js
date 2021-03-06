const React = {
    createElement
}

// 创建元素
function createElement(tag, attrs, ...childrens) {
    return {
        tag,  // 外层的标签
        attrs,  // 属性 是一个对象
        childrens  // 是一个数组
    }
}

export default React