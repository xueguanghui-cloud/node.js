const codexgh = require('./codexgh-tools/index')

const dtStr = codexgh.dateFormat(new Date())
console.log(dtStr);


const htmlStr = '<h1 title="abc">这是一个转义字符</h1>'

const str1 = codexgh.htmlEscape(htmlStr);
console.log(str1);

const str = '&lt;h1 title=&quot;abc&quot;&gt;这是一个转义字符&lt;/h1&gt;';

const res = codexgh.htmlUnEscape(str);
console.log(res);