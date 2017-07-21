/**
 * Created by rcarlton1 on 10/21/2016.
 */
if (module.hot) {
    module.hot.accept();
}
import './main.scss';

var url = require("./images/test.png");
var component = require('./javascripts/component');
let fibonacci = function* (numbers) {
    let pre = 0, cur = 1
    while (numbers-- > 0) {
        [pre, cur] = [cur, pre + cur]
        yield cur
    }
}

for (let n of fibonacci(1000))
    console.log(n)

let numbers = [...fibonacci(1000)]
let test = (newV) => {
    console.log(newV);
}
let [n1, n2, n3, ...others] = fibonacci(1000)
document.body.appendChild(component());