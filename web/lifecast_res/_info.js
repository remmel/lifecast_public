 
//this is something needed in order to make that code accesible directly via es module and via npm
// I thought before doing getComputedStyle(document.getElementById("buffering_button")).content.slice(5, -2) which won't work if the id is not in DOM
// However I won't work when the css is on the same server than the page calling the script
function getUrlFromStyle(selector, cssStyle) {
  const rule = [...cssStyle.rules].filter(r => r.selectorText == selector)[0]
  if(!rule) return null
  const matches = rule.cssText.match(/url\(\"(.*)\"\)/)
  if(matches.length !== 2) return null
  return matches[1]
}

  const rewindBtnUrl = getUrlFromStyle('#rewind_button', style)
  const spinnerUrl = getUrlFromStyle('#buffering_button', style)


vrbutton_texture_rewind = new THREE.TextureLoader().load('./lifecast_res/rewind_button.png');
vrbutton_texture_buffering = new THREE.TextureLoader().load('./lifecast_res/spinner.png');