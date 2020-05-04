const useTemplate = (selector) => {
  const TEMPLATE_PROPERTY = '$template';
  const elem = document.querySelector(selector);
  const delimiters = ['{{', '}}'];
  const cacheData = {};

  const changeTextNode = elem => {
    let startPosition = 0;
    let endPosition = 0;
    let val = '';
    let copiedTemplate = '';

    //템플릿 캐싱
    if (!elem.hasOwnProperty(TEMPLATE_PROPERTY)) {
      elem[TEMPLATE_PROPERTY] = elem.textContent;
    }

    copiedTemplate = elem[TEMPLATE_PROPERTY];

    while (startPosition > -1) {
      val = '';
      //시작 위치를 찾는 다
      startPosition = copiedTemplate.indexOf(
        delimiters[0],
        startPosition
      );
      //데이터가 모두 변경되어 탬플릿 키워드가 없을 때
      if (startPosition === -1) break;

      //종료 위치를 찾는 다
      endPosition = copiedTemplate.indexOf(
        delimiters[1],
        startPosition + delimiters[0].length - 1
      );
      //변수 key값을 찾는 다.
      const variableName = copiedTemplate.substring(
        startPosition + delimiters[0].length,
        endPosition
      );

      //데이터에 변수값이 있을 경우 반영한다.
      if (typeof cacheData[variableName] !== 'undefined') {
        val = cacheData[variableName];
      }

      copiedTemplate = copiedTemplate.replace(
        delimiters[0] + variableName + delimiters[1],
        val,
      );
    }

    if (elem.textContent !== copiedTemplate) {
      elem.textContent = copiedTemplate;
    }
  };

  const cacheObj = data => {
    for (const key in data) {
      cacheData[key] = data[key];
    }
  };

  const traversal = elem => {
    elem.childNodes.forEach(node => {
      if (node.childNodes.length > 0) {
        traversal(node);
      } else {
        changeTextNode(node);
      }
    });
  };

  const bindData = data => {
    cacheObj(data);
    traversal(elem);
  };

  return {bindData}
};
