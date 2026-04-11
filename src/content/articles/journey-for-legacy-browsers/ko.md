---
title: "구형 브라우저를 위한 여정: 트랜스파일과 바벨"
excerpt: "구형 브라우저를 지원하기 위한 방법"
lang: "ko"
routeSlug: "journey-for-legacy-browsers"
translationKey: "journey-for-legacy-browsers"
publishedAt: "2021-09-11T00:00:00.000+00:00"
updatedAt: "2025-12-07T10:55:40.000+00:00"
tags: ["blog", "frontend"]
featureImage: "/content/articles/journey-for-legacy-browsers/ko/feature-image.png"
commentsTerm: "journey-for-legacy-browsers"
draft: false
---

<p>요즘은 구형 브라우저를 사용하는 사용자가 극히 적은 편입니다. 메이저 브라우저들의 최적화 수준도 높아졌고 대부분 자동 업데이트를 지원해서 굳이 구형을 고집해 사용할 이유가 적기 때문입니다.</p><p>하지만 한국의 많은 기업과 관공서에서는 여전히 구형 브라우저인 인터넷 익스플로러(Internet Explorer, 이하 IE)를 사용하는 곳을 볼 수 있습니다. 관련된 업무를 맡은 프론트엔드 개발자에겐 참 피곤한 일입니다.</p><p>2024년에도 IE를 지원하기 위해 자바스크립트 코드를 작성하는 것은 쉽지 않습니다. 신식 문법에선 한줄로 작성할 수 있는 코드도 구식 문법에선 수십 줄로 작성해야 될 수 있기 때문입니다.</p><p>하지만 다행히도, 전세계 개발자들은 과거에 이미 같은 문제를 고민하고 해결책 역시 만들어 두었습니다. 본문에서는 구형 브라우저를 지원하기 위한 방법인 폴리필(<code>Polyfill</code>)과 트랜스파일(<code>Transpile</code>)에 대해 설명하고 이를 자동화시키기 위해 탄생한 도구인 <code>Babel</code> 에 대해 알아보겠습니다.</p><hr><h2 id="%EC%B5%9C%EC%8B%A0-%EC%BD%94%EB%93%9C%EB%A5%BC-%EA%B5%AC%ED%98%95-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%9C%EB%8B%A4%EB%A9%B4">최신 코드를 구형 브라우저에서 실행한다면?</h2><p>먼저 정상적인 최신 문법의 Javascript 코드를 IE 에서 실행했을 때, 어떤 문제가 발생하는지를 살펴보겠습니다. 예시 코드와 실행 결과는 다음과 같습니다.</p><h3 id="%EC%98%88%EC%8B%9C-1">예시 1</h3><pre><code class="language-javascript">alert('Hello, World!');
Object.assign({});
</code></pre><h3 id="%EC%98%88%EC%8B%9C-2">예시 2</h3><pre><code class="language-javascript">alert('Hello, World!');
async function a() {}
</code></pre><p>예시1과 예시2를 실행하면 모두 오류가 발생했습니다. 하지만 두개의 오류엔 큰 차이점이 있습니다.</p><p>먼저 예시1 의 경우, 코드를 실행했을 때 Alert 가 표시된 이후 콘솔에는 해당 함수가 없다는 오류가 발생했습니다. 이는 전체 코드 해석에 성공했지만 실행 중 해당 함수를 찾을 수 없어서 발생한 오류입니다. 이러한 오류는 <code>런타임 오류(Runtime Error)</code> 라고 부릅니다.</p><p>반면 예시2 의 경우, 코드를 실행했을 때 Alert 도 표시되지 않으며 콘솔에는 이해하기 어려운 오류가 발생했습니다. 이는 전체 코드의 해석을 실패해서 코드의 실행을 완전히 중단한 케이스입니다. 이러한 오류는 <code>구문 분석 오류(Syntax Error)</code> 라고 부릅니다.</p><h3 id="%EC%98%88%EC%8B%9C1%EC%9D%98-%ED%95%B4%EA%B2%B0">예시1의 해결</h3><p>이제 각각의 오류를 해결하기 위한 방법을 살펴보겠습니다. 먼저 예시1의 경우는 쉽게 해결할 수 있습니다. 아래와 같이 <code>Object.assign</code> 함수를 앞단에 직접 정의해주면 됩니다.</p><pre><code class="language-javascript">if (!Object.prototype.entries) {
  Object.prototype.assign = function () {
    // 구현 코드 생략
  };
}

alert('Hello, World!');
Object.assign({});
</code></pre><p>여기서 중요한 점은 <strong>원본의 코드를 수정하지 않고 앞단에 무언가를 채워놓기만 했다는 것</strong> 입니다. 이러한 방법은 '채움'의 의미를 내포한 <code>폴리필(Polyfill)</code> 이라 부릅니다.</p><h3 id="%EC%98%88%EC%8B%9C2%EC%9D%98-%ED%95%B4%EA%B2%B0">예시2의 해결</h3><p>반면 예시2의 경우 코드 실행 전 구문 분석 과정에서부터 오류가 발생하므로 <code>폴리필</code> 만으로는 해결할 수 없습니다. 이 경우는 아래와 같이 코드의 원형을 해당 브라우저에서 해석 가능한 문법으로 변경해야 합니다.</p><pre><code class="language-javascript">alert('Hello, World!');
function a() {
  return new Promise(function(resolve) {
    resolve();
  })
}
</code></pre><p>여기서 중요한 점은 <strong>원본 코드를 구형 브라우저에서 해석 가능한 문법으로 변경한 것</strong> 입니다. 이러한 방법은 '변환'의 의미를 내포한 <code>트랜스파일(Transpile)</code> 이라고 부릅니다.</p><p>정리해보면, 최신 자바스크립트 코드를 구형 브라우저를 지원하기 위해선 먼저 적절한 폴리필을 채워넣고, 폴리필로 해결할 수 없다면 트랜스파일 과정이 함께 필요하다는 것을 알 수 있습니다.</p><p>하지만 이를 개발자가 일일이 처리하는 것은 매우 번거로울거라 예상할 수 있습니다. 프론트엔드는 특성상 수많은 라이브러리를 함께 사용하는데, 이 모든 라이브러리에 대해 폴리필을 작성하고 트랜스파일 하는 것은 불가능에 가깝기 때문입니다. 이제는 이 문제를 해결하기 위해 탄생한 <code>바벨(Babel)</code>에 대해 알아볼 차례입니다.</p><hr><h2 id="%EC%9A%B0%EB%A6%AC%EB%A5%BC-%EA%B5%AC%EC%9B%90%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EB%B0%94%EB%B2%A8">우리를 구원하기 위한 바벨</h2><p></p><p><code>바벨(Babel)</code>은 앞서 설명한 <code>폴리필(Polyfill)</code>과 <code>트랜스파일(Transpile)</code> 과정을 자동으로 처리해주기 위해 만들어진 도구입니다. 바벨은 개발자가 최신 문법의 코드만 작성하더라도 결과물은 오래된 브라우저에서도 잘 동작할 수 있는 구형 코드로 출력해 줍니다.</p><p>이제부터는 <code>Babel</code> 의 <a href="https://babeljs.io/docs/en/usage">문서</a>에서 안내된 사용 가이드를 따라가며, 바벨이 어떤 과정을 통해 코드를 변환시키는 지를 살펴보겠습니다.</p><blockquote>구버전 바벨의 사용 방법을 다루고 있습니다. 사용 방법보다는 동작 원리만 참고하길 권해드립니다.</blockquote><h3 id="%EB%B0%94%EB%B2%A8%EC%9D%98-%ED%8F%B4%EB%A6%AC%ED%95%84polyfill">바벨의 폴리필(Polyfill)</h3><p>문서에서는 IE의 <code>JavaScript</code> 엔진에서 해석 가능한 ES2015+ 명세로 코드를 변환시키기 위해서 먼저 다음과 같은 라이브러리를 코드의 최상단에 추가하라고 안내하고 있습니다.</p><pre><code class="language-jsx">import "core-js/stable";
import "regenerator-runtime/runtime";
</code></pre><p>앞에서 원본 코드의 앞단에 무언가를 추가하는 행위를 폴리필(Polyfill)이라 설명했습니다. <code>core-js</code>는 다양한 폴리필의 집합체입니다. 이는 구형 브라우저의 JavaScript 엔진에 내장되지 않은 다양한 최신 <code>ECMAScript</code> 표준 함수들을 사전에 정의해 줍니다.</p><h3 id="%EB%B0%94%EB%B2%A8%EC%9D%98-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8C%8C%EC%9D%BCtranspile">바벨의 트랜스파일(Transpile)</h3><p>우린 폴리필을 위해 이미 <code>core-js</code>를 추가했습니다. 하지만 바벨은 추가적으로 <code>regenerator-runtime</code> 라이브러리까지 프로젝트의 최상단에 추가할 것을 안내하고 있습니다. 이제 이것이 무엇을 위한 것인지 알아보겠습니다.</p><p>아래의 예시는 폴리필로는 해결할 수 없어서 원본 코드의 문법을 변경(트랜스파일)해야 하는 코드입니다. 해당 코드를 바벨을 통해 변환해 보겠습니다.</p><h4 id="%EC%98%88%EC%8B%9C">예시</h4><pre><code class="language-jsx">async function a() {}
</code></pre><h4 id="%EC%98%88%EC%8B%9C-%EC%BD%94%EB%93%9C%EC%9D%98-%EB%B3%80%ED%99%98-%EA%B2%B0%EA%B3%BC">예시 코드의 변환 결과</h4><pre><code class="language-jsx">"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function test() {
  return _test.apply(this, arguments);
}

function _test() {
  // ------------------------------------ 이곳을 집중해 주세요. ---------------------------------------
  _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}
</code></pre><p>결과가 조금 복잡해 보입니다. 하지만 중요하게 살펴볼 점은 <code>async</code> 코드가 <code>regeneratorRuntime</code> 코드를 참조하는 문법으로 변환되었다는 것 입니다.</p><p>이렇듯, 바벨은 폴리필로는 해결할 수 없는 비동기 코드를 <code>regenerator-runtime</code> 라이브러리를 사용하는 문법으로 트랜스파일합니다. 그래서 코드의 최상단에 <code>regenerator-runtime</code> 라이브러리를 함께 추가해야 하는 것 입니다.</p><p>정리해보면 바벨은 <code>core-js</code>를 통해 폴리필을 적용하고, <code>regenerator-runtime</code>을 통해 코드를 트랜스파일 합니다. 이를 통해 최신 문법의 코드를 구형 브라우저에서도 올바르게 동작할 수 있는 코드로 변환시키게 됩니다.</p><hr><h2 id="%EB%B0%94%EB%B2%A8%EC%9D%98-%ED%95%9C%EA%B3%84">바벨의 한계</h2><p></p><p>바벨을 한번 설정해두고 나면 다시 손대지 않더라도 구형 브라우저에서도 올바르게 동작할 것이라 생각할 수 있습니다. 하지만 실제로는 그렇지 않습니다. 사용자의 코드에 따라 바벨의 <code>core-js</code> 와 <code>regenerator-runtime</code> 만으로는 해결할 수 없는 상황을 살펴보겠습니다.</p><h3 id="core-js%EC%9D%98-%ED%95%9C%EA%B3%84"><code>core-js</code>의 한계</h3><p>먼저 <code>core-js</code>는 ECMAScript 표준 함수들로만 구성되어 있습니다. ECMAScript 는 자바스크립트의 언어적 차원에서 필요한 기능만을 정의합니다. 이는 브라우저에서 필요한 기능들은 포함되어 있지 않다는 의미입니다.</p><p>브라우저에서만 필요한 기능의 예시는 <code>ResizeObserver</code> 입니다. 이 API 는 브라우저의 <code>DOM</code> 요소의 크기가 변경될 때마다 이벤트를 발생시키는 기능을 제공합니다. 하지만 이는 ECMAScript 표준이 아니기 때문에 <code>core-js</code> 에서 제공되지 않습니다.</p><p>그래서 이런 API를 사용해야 한다면 서드파티 폴리필 라이브러리를 포함하거나 개발자가 직접 작성해야 합니다. 또한, 개발자는 자신이 사용하는 API 가 ECMAScript 표준인지, 아니면 브라우저에서만 지원하는 API 인지를 신중하게 검토하고 사용해야 합니다. 폴리필을 추가하는 것을 깜빡하면 구형 브라우저에서 앱이 갑작스럽게 동작을 멈출 수 있기 때문입니다.</p><h3 id="regenerator-runtime-%EC%9D%98-%ED%95%9C%EA%B3%84"><code>regenerator-runtime</code> 의 한계</h3><p>바벨은 대부분의 최신 자바스크립트 문법을 대부분 잘 지원하지만, 아직 ECMAScript 의 표준이 되지 못한 Stage 3 이하의 문법들에 대해서는 공식적으로 지원하지 않습니다.</p><p>이에 대한 대표적 예시는 <code>Metadata</code> 와 <code>Decorator</code>가 있습니다. 둘 모두 표준이 되지 못했지만 타입스크립트의 대중화로 인해 보편적으로 사용되고 있는 문법들입니다. <code>Decorator</code> 코드의 예시는 다음과 같습니다.</p><pre><code class="language-javascript">@annotation
class MyClass {
  constructor() {
    this.name = name;
  }
}
</code></pre><p>이를 바벨에서 사용하기 위해선 별도의 서드파티 플러그인을 설치해야 합니다. 자바스크립트의 표준은 계속 발전하고 있기 때문에 <code>core-js</code> 와 마찬가지로 개발자는 자신이 사용하는 문법이 바벨에서 처리될 수 있는지를 검토하고 사용해야 합니다.</p><h3 id="html-%EA%B3%BC-css-%EB%8A%94"><code>html</code> 과 <code>css</code> 는?</h3><p>마지막으로, 바벨은 자바스크립트를 위한 도구입니다. 하지만 웹 서비스는 자바스크립트로만 이루어져 있지 않습니다. 자바스크립트 문제를 해결했다면 이제 <code>html</code>과 <code>css</code>의 문제를 마주할 차례입니다. 이쪽도 바벨과 같은 도구가 있을까요?</p><p>아쉽게도 <code>html</code>과 <code>css</code>는 바벨과 같은 수준의 도구가 부족한 상황입니다. <code>css</code>는 <code>lightningcss</code> 와 <code>postcss</code> 도구가 있지만 바벨 만큼의 편리함을 주진 못하며, <code>html</code>은 아직 방법이 없어 개발 단계부터 구형 브라우저를 고려해 코드를 작성해야 합니다.</p><hr><h2 id="%EC%96%B8%EC%A0%9C%EC%AF%A4-%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EB%9F%AC%EA%B0%80-%EC%82%AC%EB%9D%BC%EC%A7%88%EA%B9%8C">언제쯤 인터넷 익스플로러가 사라질까</h2><p></p><p>지금까지 구형 브라우저를 지원하기 위한 방법과 발전과정, 그리고 한계에 대해 알아보았습니다. 글을 마치며 인터넷 익스플로러가 언제쯤 사라질지에 대해 개인적인 생각을 전해드립니다.</p><p>제가 2018년 육군에서 전역했을 당시, 군에서 표준으로 사용하고 있는 브라우저는 IE8 이었습니다. 요즘 세상에 어떻게 저 브라우저를 쓰느냐 하시겠지만 군의 모든 업무 시스템은 IE8 의 ActiveX 기술 기반으로 개발되어있어 이를 단번에 전환시키기도 쉽지 않아 보였습니다.</p><p>시간이 흘러, 이제 마이크로소프트는 윈도우11부터 IE를 제거하겠다는 방침을 내놓았습니다. 이후 많은 소식통에서 드디어 IE 가 사라진다고 환영했습니다. 하지만 사실 이 얘기는 윈도우 10의 출시 때에도 나왔던 이야기입니다.</p><p>과거 윈도우10이 출시될 때, 마이크로소프트는 IE를 보조프로그램으로 격하시키고 새로운 Edge 브라우저를 출시했습니다. 모두들 IE가 역사속으로 사라진다며 반겼지만 그럼에도 IE는 계속해서 사용됐습니다. 윈도우11 역시 Edge 브라우저 내에서 IE 호환성 모드를 제공할 예정이기 때문에 IE는 계속해서 사용될 것이라 예상하고 있습니다.</p><p>저는 IE가 기업과 관공서에서까지 완전히 퇴출되는 시기를 빠르면 2040년 쯤으로 바라보고 있습니다. 이것조차 확신이 서지 않는 이유는 조직의 업무 시스템이라는게 결코 쉽게 바뀌지 않기 때문입니다. 마이크로소프트도 이를 인지하고 있어 IE 호환 모드를 최소 2029년까지 지원하겠다고 약속한 상태입니다.</p><p>개발자의 하위호환 작업은 언제나 고통입니다. 그래서 저 역시 인터넷 익스플로러가 하루 빨리 퇴출되길 바라고 있습니다. 그런데 그날이 올 수는 있는건지 모르겠습니다.</p>
