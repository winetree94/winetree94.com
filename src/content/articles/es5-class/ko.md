---
title: "자바스크립트 ES5로 ES6 Class 완벽하게 구현하기"
excerpt: "서론\n\n\n1. 문법적 설탕인 클래스\n\nclass A {}\n\n\n자바스크립트 ES6 명세의 클래스는 문법적 설탕으로 실제로는 함수와, 프로토타입을 통해 객체지향 프로그래밍을 구현하고 있습니다. 따라서 위의 코드는 내부적으로는 아래와 같이 변환되어 사용됩니다.\n\nfunction A () {}\n\n\n이렇듯 자바스크립트의 클래스는 실제로는 함수이며, 이는 곧 함수만으로도 클래스와 동일한 기능을 구현할 수 있음을 의미합니다.\n\n\n2. 생성자와 메소드\n\nclass Person {\n\t/* 생성자 */\n\tconstructor(name) {\n\t\tthis.name = name;\n\t}\n\n  /* 메소드 */\n  getName() {\n\t\treturn this.name;\n\t}\n}\n\n/* 인스턴스 생성 */\nconst person1 = new Person('winetree94');\nconst name1 = person1.getName();\nconsole.log(name1); // => 'winetree94';\n"
lang: "ko"
routeSlug: "es5-class"
translationKey: "es5-class"
publishedAt: "2020-12-17T00:00:00.000+00:00"
updatedAt: "2025-12-06T19:09:48.000+00:00"
tags: ["blog", "frontend"]
featureImage: "/content/articles/es5-class/ko/feature-image.png"
commentsTerm: "es5-class"
draft: false
---

<p></p><h1 id="%EC%84%9C%EB%A1%A0">서론</h1><h2 id="1-%EB%AC%B8%EB%B2%95%EC%A0%81-%EC%84%A4%ED%83%95%EC%9D%B8-%ED%81%B4%EB%9E%98%EC%8A%A4">1. 문법적 설탕인 클래스</h2><pre><code class="language-jsx">class A {}
</code></pre><p>자바스크립트 <code>ES6</code> 명세의 클래스는 문법적 설탕으로 실제로는 함수와, 프로토타입을 통해 객체지향 프로그래밍을 구현하고 있습니다. 따라서 위의 코드는 내부적으로는 아래와 같이 변환되어 사용됩니다.</p><pre><code class="language-jsx">function A () {}
</code></pre><p>이렇듯 자바스크립트의 클래스는 실제로는 함수이며, 이는 곧 함수만으로도 클래스와 동일한 기능을 구현할 수 있음을 의미합니다.</p><hr><h2 id="2-%EC%83%9D%EC%84%B1%EC%9E%90%EC%99%80-%EB%A9%94%EC%86%8C%EB%93%9C">2. 생성자와 메소드</h2><pre><code class="language-javascript">class Person {
	/* 생성자 */
	constructor(name) {
		this.name = name;
	}

  /* 메소드 */
  getName() {
		return this.name;
	}
}

/* 인스턴스 생성 */
const person1 = new Person('winetree94');
const name1 = person1.getName();
console.log(name1); // =&gt; 'winetree94';

const person2 = new Person('winetree94');
const name2 = person2.getName();
console.log(person1.getName === person2.getName); // =&gt; true
</code></pre><p>자바스크립트의 클래스도 자바나 기타 다른 언어와 같이 전통적이고 쉬운 사용법을 제공하고 있습니다. <code>생성자</code>를 통해 인스턴스의 고유 정보(이름, 나이 등)를 담을 수 있으며, <code>메소드</code>를 통해 각 인스턴스가 공유하는 함수를 만들어 메모리를 보다 효율적으로 사용할 수 있습니다.</p><p>위 Person 클래스를 함수로 동일하게 구현해보면 아래와 같습니다.</p><pre><code class="language-javascript">function Person (name) {
	this.name = name;
}

Person.prototype.getName = function () {
	return this.name;
}

const person1 = new Person('winetree94');
const name1 = person1.getName();
console.log(name1); // =&gt; 'winetree94';

const person2 = new Person('winetree94');
const name2 = person2.getName();
console.log(person1.getName === person2.getName); // =&gt; true
</code></pre><p>이렇게 함수를 정의하고 new 키워드를 사용해 호출하면 새로운 객체가 만들어지며, 함수의 this 는 새롭게 생성된 객체를 바라보게 됩니다.</p><p>그리고 Person 함수 내부의 <code>prototype</code> 객체에 함수를 정의하면, new 를 통해 만들어진 객체들이 공유하며 사용할 수 있는 메소드가 됩니다.</p><hr><h2 id="3-extends-%EC%99%80-super">3. extends 와 super</h2><pre><code class="language-javascript">class Parent {
	constructor(parent) {
		this.parent = parent;
	}

	getParent() {
		return this.parent;
	}
}

class Child extends Parent {
	constructor(parent, child) 
		super(parent);
		this.child = child;
	}

	getChild() {
		return this.child;
	}
}

/* Parent 와 Child 클래스의 모든 속성을 가지고 있는 인스턴스 */
const child = new Child('parentName', 'childName');
console.log(child.getParent()); // =&gt; 'parentName';
console.log(child.getChild()); // =&gt; 'childName';
</code></pre><p>클래스의 중요한 특성은 기존의 클래스를 확장 하여 모든 기능을 흡수한 새로운 클래스를 정의할 수 있다는 점입니다. 이러한 객체지향의 상속성을 통해 우리는 많은 코드와 하드웨어 자원을 절약할 수 있게 됩니다.</p><p>그런데 만약 이를 함수로 구현한다면 어떻게 작성해야 할까요? 지금까지와는 다르게 여기서부터는 함수로 구현하기에는 상당히 까다로운 작업이 됩니다.</p><pre><code class="language-javascript">function Child extends Parent () {
	super();
	...
}
</code></pre><p>위 코드는 동작하지 않는 코드입니다. 함수에서는 <code>extends</code> 나 <code>super</code> 키워드를 사용할 수 없습니다. 따라서 해당 기능을 수행하는 무언가를 우리가 직접 만들어내야 합니다.</p><p>여기서부터는 코드가 복잡해지기 때문에, 클래스처럼 단순한 사용성을 제공하기 위해서 클래스를 만들어주는 어떠한 다른 함수를 만들어내야할 필요성이 있습니다.</p><hr><h2 id="4-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%82%BC-%ED%95%A8%EC%88%98%EC%9D%98-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95">4. 만들어낼 함수의 사용 방법</h2><pre><code class="language-javascript">function Clazz(data) { ... }

/* 클래스의 생성자, 메소드를 구현 */
const Animal = Clazz({
	constructor(animalName) {
		this.animalName = animalName;
	},
	getAnimalName() {
		return this.animalName;
	}
});

/* 클래스의 상속성을 구현 */
const Person = Clazz({
	constructor(sufer, animalName, personName) {
		sufer(animalName);
		this.personName = personName;
	},
	extend: Animal,
	getPersonName() {
		return this.personName;
	}
});

/* ES6 클래스와의 상호 운용 */
class SomeClass extends Person {
	constructor(animalName, personName, someValue) {
		super(animalName, personName);
		this.someValue = someValue;
	}

	getSomeValue() {
		return this.someValue;
	}
}

const person = new Person('animalName', 'personName');
console.log(person.getAnimalName()); // =&gt; 'animalName';
console.log(person.getPersonName()); // =&gt; 'personName';

const something = new SomeClass('animalName', 'personName', 'someValue');
console.log(something.getAnimalName()); // =&gt; 'animalName';
console.log(something.getPersonName()); // =&gt; 'personName';
console.log(something.getSomeValue()); // =&gt; 'someValue';
</code></pre><p>앞으로 만들어낼 Clazz 라는 함수의 사용 방식입니다.</p><p>Clazz 함수는 ES6 의 class 와 동일한 기능을 수행하는 생성자 함수를 생성해내며, 내부적으로 사용하는 모든 코드는 ES5 의 명세를 따르게 됩니다. 그리고 SomeClass 와 같이 ES6 class 에서도 호환하여 사용할 수 있어야 합니다.</p><hr><h1 id="clazz-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0">Clazz 함수 만들기</h1><p>여기서부터는 ECMAScript 표준 명세에 대한 이해와, Javascript 의 function, prototype, this, closure 등에 대한 기반 지식이 필요합니다. 외부 라이브러리는 사용하지 않습니다.</p><hr><h2 id="1-%ED%95%A8%EC%88%98%EC%9D%98-%EC%9D%B8%EC%9E%90-%EB%B6%84%EC%84%9D%ED%95%98%EA%B8%B0">1. 함수의 인자 분석하기</h2><pre><code class="language-javascript">function Clazz(data) {
	...
}
</code></pre><p>가장 먼저 해야할 일은, Clazz 함수로 들어온 객체를 분석하는 일입니다. 함수의 인자로 들어온 값들 중, 생성자로 쓰일 constructor, 확장에 쓰일 extend, 그리고 프로토타입 메소드로 사용될 이외 값들을 분리해내야 합니다.</p><p>이는 '구조 분해 할당' 문법을 사용하면 손쉽게 나눌 수 있습니다.</p><pre><code class="language-javascript">function Clazz(data) {
	var { constructor, extend, ...rest } = data;
}
</code></pre><p>하지만 구조 분해 할당은 ES6+에서 지원되는 문법이므로, ES5 에서는 사용할 수 없습니다. 따라서 해당 기능을 수행해줄 다른 함수를 만들어야 합니다. 제가 구현한 함수는 아래와 같습니다.</p><pre><code class="language-javascript">/**
 * es5 polyfill for object destructure
 * @param {object} object - object to destructure 
 * @param {string[]} keys - provided keys will be stored at first depth of return object, others will be stored at 'rest' property
 */
function destruct(object, keys) {
  return Object.keys(object).reduce(function (result, current) {
    if (keys.indexOf(current) != -1) {
      result[current] = object[current];
    } else {
      if (!result.rest) {
        result.rest = {};
      }
      result.rest[current] = object[current];
    }
    return result;
  }, {});
}

function Clazz(data) {
	var destructured = destruct(data, ['constructor', 'extend']);

	var constructor = destructured.constructor;
  var extend = destructured.extend;
  var properties = destructured.rest;
}
</code></pre><p>구조 분해 할당은, <code>Object.keys</code> 를 통해 객체를 배열로 변환하고, <code>Array.reduce</code> 함수를 통해 구현할 수 있습니다. destructure 함수는 원본 객체와, 분리하지 않을 키를 배열로 넣으면, 이외의 값들은 rest 라는 속성의 객체에 한번에 묶어주게 됩니다.</p><p>이렇게 분해된 값들은 앞으로의 편한 사용을 통해 각각 constructor, extend, properties 로 변수에 할당해 주었습니다.</p><hr><h2 id="2-%EB%A9%94%EC%86%8C%EB%93%9C%EA%B0%80-%EB%B0%98%EC%98%81%EB%90%9C-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98-%EB%B0%98%ED%99%98%ED%95%98%EA%B8%B0">2. 메소드가 반영된 생성자 함수 반환하기</h2><pre><code class="language-javascript">function Clazz(data) {
	var destructured = destruct(data, ['constructor', 'extend']);

	var constructor = destructured.constructor;
  var extend = destructured.extend;
  var properties = destructured.rest;
}
</code></pre><p>Clazz 함수는 생성자 함수의 prototype 에 properties 변수에 들어있는 메소드들을 반영해야 합니다. 이는 Object.keys 를 통해 간단히 수행할 수 있습니다.</p><pre><code class="language-javascript">function Clazz(data) {
  var destructured = destruct(data, ['constructor', 'extend']);

  var constructor = destructured.constructor;
  var extend = destructured.extend;
  var properties = destructured.rest;

	/* properties 의 메소드들을 생성자 함수의 prototype 에 할당 */
	Object.keys(properties).forEach(function (key) {
    constructor.prototype[key] = properties[key];
  });

	return constructor;
}
</code></pre><p>이제 Clazz 함수를 통해 생성자 함수를 만들어 낼 수 있고, 이를 통해 인스턴스를 생성할 수 있습니다.</p><pre><code class="language-javascript">var Person = Clazz({
	constructor: function (name) {
		this.name = name;
	},
	getName() {
		return this.name;
	}
});

var person = new Person('winetree94');
console.log(person.getName()); // =&gt; 'winetree94';
</code></pre><hr><h2 id="3-extends-%EB%A5%BC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90">3. extends 를 구현하기 전에</h2><p>앞서 만든 함수를 통해 이제 기본적인 생성자 함수는 만들어 낼 수 있었습니다. 하지만 es6 class 의 extend 나 super 키워드는 아직 사용할 수 없으므로, 이를 구현해줄 코드를 중간에 끼워넣어야 합니다.</p><pre><code class="language-javascript">function Clazz(data) {
  var destructured = destruct(data, ['constructor', 'extend']);

  var constructor = destructured.constructor;
  var extend = destructured.extend;
  var properties = destructured.rest;

	if (extend) {
		... 여기서 무언가를 해야한다
	}

	Object.keys(properties).forEach(function (key) {
    constructor.prototype[key] = properties[key];
  });

	return constructor;
}
</code></pre><p>일단 다시 우리가 완성할 Clazz 함수에서 extend 를 사용하는 방식을 보겠습니다.</p><pre><code class="language-javascript">...

var B = Clazz({
  constructor: function B(sufer, a, b) {
    sufer(a); // 2. 실제 생성자에는 sufer 라는 함수가 제공되어야 한다
    this.b = b;
  },
  extend: A,
  getB: function () {
    return this.b;
  }
});

var b = new B('a', 'b'); // 1. 인스턴스 생성시 sufer 라는 함수를 인자로 넣지 않았지만
</code></pre><p>위와같이 B 생성자 함수에서 클래스의 super 의 역할을 대신 수행하는 sufer 라는 함수를 제공해서 B 생성자 함수 내부에서 사용할 수 있어야 합니다.</p><p>이렇게 되면 Clazz 에 인자로 넣은 생성자 함수와, 실제 반환된 생성자 함수의 인자값들이 서로 다르게 됩니다. 이는 Clazz 함수는 인자로 들어온 생성자 함수와는 다른 생성자 함수를 만들어 반환해야한다는 것을 의미합니다.</p><pre><code class="language-javascript">if (extend) {
	var Constructor = function name() {
    ... // 새로운 생성자 함수를 만들어 반환해야 한다..
	}

	constructor = Constructor;
}
</code></pre><hr><h2 id="4-extends-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0">4. extends 구현하기</h2><pre><code class="language-javascript">var B = Clazz({
  constructor: function B(sufer, a, b) {
    sufer(a);
    this.b = b;
  },
  extend: A,
  getB: function () {
    return this.b;
  }
});

var b = new B('a', 'b');
</code></pre><p>이제 b 를 만들기 위해 사용된 새로운 B 생성자 함수와, B 생성자 함수를 만들기 위해 Clazz 함수에 넣은 constructor 의 원본 생성자 함수가 서로 다른 함수라는 것을 이해하셨을 겁니다.</p><p>이를 이제부터는 '새로운 생성자'와 '원본 생성자'로 구분지어 부르도록 하겠습니다.</p><pre><code class="language-javascript">if (extend) {
	/* sufer 를 호출하는 원본 생성자를 보관한다 */
  var originConstructor = constructor;

	/* sufer 를 제외한 arguments 를 인자로 받는 새로운 생성자를 만든다 */
	/* 이 새로운 생성자는 내부적으로는 원본 생성자를 사용해 인스턴스를 생성한다 */
  var Constructor = function name() {
    var that = this;
    function sufer() {
			extend.apply(that, arguments);
    }
    /* 실제로는 원본 생성자를 사용 */
		originConstructor.apply(that, [sufer].concat(Array.prototype.slice.call(arguments));
  }

  /* 기존 생성자를 교체한다 */
  constructor = Constructor;
  /* 부모의 프로토타입을 상속받은 새로운 프로토타입을 만들어 주입한다 */
  constructor.prototype = Object.create(extend.prototype);
  /* 프로토타입엔 constructor 속성에 생성자 함수가 등록되어야 한다 */
  constructor.prototype.constructor = constructor;
}
</code></pre><p>위의 코드는 새로운 생성자 함수를 만들어내는 코드입니다.</p><p>만들어낸 새로운 생성자 함수는 실제 인스턴스 생성에 사용할 인자들만 받는 함수입니다. 들어올 인자의 수는 미리 알 수 없으므로, 함수에는 인자를 선언하지 않고, <code>arguments</code> 객체를 사용합니다.</p><p>그리고 <code>Function.prototype.apply</code> 함수를 통해 원본 생성자의 this 와 부모 생성자의 this 를 새로운 생성자의 this 에 연결하여 값을 할당하고 있습니다.</p><p>만약 Clazz 함수로 생성된 B 라는 새로운 생성자 함수로 인스턴스를 생성하면 아래의 순서로 동작합니다.</p><ol><li>new 키워드를 통해 인스턴스인 빈 객체 <code>{}</code> 가 생성되고, 새로운 생성자 함수의 <code>this</code> 에 생성된 인스턴스가 할당됩니다.</li><li>새로운 생성자 함수는, sufer 함수를 만들어 원본 생성자 함수를 호출합니다.</li><li>원본 생성자 함수는 가장 먼저 sufer 함수를 호출합니다.</li><li>sufer 함수는 부모 생성자를 호출하고 이 생성자가 최초로 인스턴스에 값을 할당합니다.</li><li>sufer 함수의 호출이 끝나면 남은 원본 생성자의 과정을 통해 인스턴스에 값이 할당됩니다.</li></ol><p>이렇게 구성될 경우 2중 상속 이상의 상속 관계에서도 모든 부모의 생성자를 순서대로 거치면서 인스턴스에 값을 할당할 수 있게 됩니다.</p><p>그리고 마지막은 부모의 프로토타입을 상속받은 새로운 프로토타입 객체를 만들어, 새로운 생성자 함수의 프로토타입 객체를 대체하면 됩니다.</p><hr><h2 id="5-%EB%AC%B8%EC%A0%9C%EC%A0%90-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0">5. 문제점 수정하기</h2><p>위에서 extends 를 구현한 코드는 두가지 문제점을 가지고 있습니다.</p><p>첫번째로는 새로운 생성자 함수의 이름이 'name' 으로 고정되는 문제입니다. 이는 javascript 의 순수 문법으로는 아직 동적 이름을 가진 함수를 생성할 수 없기 때문입니다.</p><pre><code class="language-javascript">function name() {}
var a = function name() {}
var c = {
	d: function name() {}
}
// 변수명을 바꿀 수 있어도, 함수명칭을 동적으로 생성할 수는 없다.
</code></pre><p>두번째로는 <code>Function.prototype.apply</code> 함수는 ES5 에서 지원되지 않습니다. 그래서 대체로 <code>Function.prototyope.call</code> 을 사용해야 하지만 인자의 수를 알 수 없으므로 <code>extend.call(this, ...arguments)</code> 와 같이 사용해야 하는데, 이 역시도 ES5 에서 지원되지 않습니다.</p><pre><code class="language-javascript">function (func, ...args) {
	func.apply(this, args); // ES5 미지원...
  func.call(this, ...args); // ES5 미지원...
}
</code></pre><p>이 두개의 문제점은 모두 javascript 의 <code>eval</code> 함수를 통해 극복할 수 있습니다. eval 은 쉽게말해서 문자열을 javascript 코드로 실행시켜주는 함수입니다.</p><pre><code class="language-javascript">eval('var a = 3;');
</code></pre><p>저는 eval 을 통해 위의 두가지 기능을 수행하는 각각의 함수를 별개로 생성하였습니다.</p><hr><h3 id="51-%EB%8F%99%EC%A0%81-%EC%9D%B4%EB%A6%84%EC%9D%84-%EA%B0%80%EC%A7%84-%ED%95%A8%EC%88%98-%EC%83%9D%EC%84%B1">5.1. 동적 이름을 가진 함수 생성</h3><pre><code class="language-javascript">/**
 * create dynamic named function
 * @param {string} name - function name
 * @param {function} anonymousFunction - function body to use
 * @param {object} injectable - because of eval limitation, you must provide outside of function scope variables manually
 */
function createNamedFunction(name, anonymousFunction, injectable) {
  var str = anonymousFunction.toString();
  var start = str.indexOf('function');
  var front = str.slice(start, start + 8) + ' ';
  var back = str.slice(front.length - 1);
  var createdFunction;
  var scope = '';
  if (injectable) {
    scope = Object.keys(injectable).map(function (key) {
      return 'var ' + key + ' = injectable.' + key + ';';
    }).join('');
    scope += ';';
  }
  eval(scope + 'createdFunction = ' + front + name + back);
  return createdFunction;
}
</code></pre><p>위 함수를 통해 특정 이름을 가진 함수를 생성할 수 있습니다. 하지만 eval 함수의 한계가 있어, 함수가 참조하는 스코프 영역의 변수들을 함께 주입해야 합니다.</p><hr><h3 id="52-functionapply-%EC%9D%98-%EB%8C%80%EC%B2%B4-%ED%95%A8%EC%88%98">5.2. Function.apply 의 대체 함수</h3><pre><code class="language-javascript">/**
   * es5 polyfill of Array.apply
   * @param {*} func - function
   * @param {*} that - this
   * @param {ArrayLike[]} args - arguments to bind 
   */
  function apply(func, that, args) {
    var argumentsString = '';
    for (var i = 0; i &lt; args.length; i++) {
      argumentsString += ', args' + '[' + i + ']';
    }
    eval('func.call(that' + argumentsString + ');');
  }
</code></pre><p>위 함수는 <code>Function.prototype.call</code> 함수와 <code>eval</code> 함수만을 사용해서 <code>Function.prototype.apply</code> 와 동일한 기능을 수행해주는 함수입니다.</p><hr><h3 id="53-%EB%8C%80%EC%B2%B4%EB%90%9C-%EC%BD%94%EB%93%9C">5.3. 대체된 코드</h3><pre><code class="language-javascript">if (extend) {
  var originConstructor = constructor;

  var Constructor = createNamedFunction(constructor.name, function () {
    var that = this;
    function sufer() {
      apply(extend, that, arguments);
    }
    apply(originConstructor, that, [sufer].concat(Array.prototype.slice.call(arguments)));
  }, {
    originConstructor: constructor,
    extend: extend,
  });

  /* replace constructor */
  constructor = Constructor;
  constructor.prototype = Object.create(extend.prototype);
  constructor.prototype.constructor = constructor;
}
</code></pre><p>이렇게 되면, 원본 생성자 함수의 명칭대로 새로운 생성자 함수를 만들 수 있게 되고, apply 함수를 통해 동적인 arguments 들을 사용해 다른 생성자 함수들을 호출할 수 있게 됩니다.</p><hr><h2 id="6-%EC%9D%B4%EC%99%B8-%EC%8B%A0%EA%B2%BD%EC%8D%A8%EC%95%BC-%ED%95%A0-%EB%B6%80%EB%B6%84%EB%93%A4">6. 이외 신경써야 할 부분들</h2><p>아직 미흡한 과정들이 남아 있는데, 올바르지 않은 인자를 주입한 경우의 에러 처리나, 아직 반영되지 않은 클래스의 동작 특징들이 아직 남아있기 때문입니다.</p><h3 id="61-%EC%A0%81%EC%A0%88%ED%95%9C-%EC%97%90%EB%9F%AC-%EC%B2%98%EB%A6%AC">6.1. 적절한 에러 처리</h3><pre><code class="language-javascript">if (extend) {
  if (!extend.prototype) {
    throw new Error("provided parent function is not constructor");
  }
}
</code></pre><p>코드를 작성하며 가장 중요한 부분중 하나는 에러를 처리하는 것이라 생각합니다. 코드가 동작하는 경우는 단 한가지 방법 뿐이지만, 에러가 나는 이유는 수만가지가 되기 때문입니다. 적절한 곳에 에러 를 배치에 사용할때의 편의성을 증가시킬 수 있습니다.</p><h3 id="62-super-%EB%A5%BC-%ED%98%B8%EC%B6%9C%ED%95%98%EC%A7%80-%EC%95%8A%EC%9C%BC%EB%A9%B4-%EC%97%90%EB%9F%AC">6.2. super 를 호출하지 않으면 에러</h3><pre><code class="language-javascript">class A {}
class B extends A {
	constructor(a) {
		this.a = a;
	}
}
// =&gt; Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
</code></pre><p>javascript 의 class 는 super 키워드를 통해 부모 생성자를 호출하지 않으면 에러를 발생시킵니다. 이에 대한 처리도 우리가 만든 Clazz 에 추가되어야 합니다.</p><h3 id="63-super-%EC%9D%B4%EC%A0%84%EC%97%90-this-%EC%A0%91%EA%B7%BC%EC%8B%9C-%EC%97%90%EB%9F%AC">6.3. super 이전에 this 접근시 에러</h3><pre><code class="language-javascript">class A {}
class B extends a{
	constructor(a) {
		this.a = a;
		super(a);
	}
}
// =&gt; Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
</code></pre><p>마찬가지로 부모의 호출 이전에 this 키워드에 접근하는 경우에도 위와 동일한 에러가 발생됩니다.</p><p>이러한 부분들은 반영이 쉽기 때문에 따로 과정을 남겨놓지 않았습니다. 궁금하신 분은 마지막의 전체 코드 한눈에 보기를 참고하시면 좋을 것 같습니다.</p><hr><h1 id="%EC%A0%84%EC%B2%B4-%EC%BD%94%EB%93%9C-%ED%95%9C%EB%88%88%EC%97%90-%EB%B3%B4%EA%B8%B0">전체 코드 한눈에 보기</h1><p><a href="https://gist.github.com/winetree94/2500ec8248a2d4d97c346860b7e78e79">https://gist.github.com/winetree94/2500ec8248a2d4d97c346860b7e78e79</a></p>
