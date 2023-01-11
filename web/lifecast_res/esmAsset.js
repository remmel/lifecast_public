

// Below are functions to make assets accessible directly via npm (and es module) when loading them as threejs texture `new THREE.TextureLoader().load(url);`
// another alternative could be to get use the img canvas (instead of getting its url)


// Get the url of the asset. Except when the css is on the same server than the page calling the script
// cssStyle comes from `import cssStyle from './mystyle.css' assert { type: 'css' }`
function getUrlFromStyle(selector, cssStyle) {
  const rule = [...cssStyle.rules].filter(r => r.selectorText == selector)[0]
  if(!rule) return null
  const matches = rule.cssText.match(/url\(\"(.*)\"\)/)
  if(matches.length !== 2) return null
  return matches[1]
}

// Get the url of the asset. Should work in all cases
export function getAssetUrl(select) {
  //if is already existing, do not create new one, because can be a problem if 2 elements with same id
  let el = document.querySelector(select)
  let computedStyleContent = null
  if(!el) {
    el = createElementFromSelector(select)
    el.style.display = 'none'
    document.body.appendChild(el)
    computedStyleContent = getComputedStyle(el).content
    el.remove()
  } else {
    computedStyleContent = getComputedStyle(el).content
  }

  const matches = computedStyleContent.match(/url\(\"(.*)\"\)/)
  if(!matches || matches.length !== 2) return null
  return matches[1]
}

function createElementFromSelector(selector) {
  var pattern = /^(.*?)(?:#(.*?))?(?:\.(.*?))?(?:@(.*?)(?:=(.*?))?)?$/;
  var matches = selector.match(pattern);
  var element = document.createElement(matches[1]||'div');
  if(matches[2]) element.id = matches[2];
  if(matches[3]) element.className = matches[3];
  if(matches[4]) element.setAttribute(matches[4],matches[5]||'');
  return element;
}

