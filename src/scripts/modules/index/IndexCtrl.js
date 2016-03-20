require('./')
  .controller('IndexCtrl', IndexCtrl);

/**
 * @ngInject
 */
function IndexCtrl() {

  var vm = this,
      box = angular.element(document.querySelector('.shadow__box')),
      castDistance = 30,
      color = 0,
      castTop = 0,
      castLeft = 0,
      step = 3;

  // vars used for creating the shadow rules
  var shadow = '',
      opacity,
      top,
      left,
      trail;

  for (var i = 1; i <= castDistance; i++) {
    // opacity is based on how much of the shadow is left to be cast
    percentOfNumbersUsed = ((castDistance - i) / castDistance) * 100;
    opacity = (percentOfNumbersUsed / 5000);
    top = (castTop + i) * step;
    left = (castLeft + i) * step;
    trail = (i !== castDistance) ? ',' : '';
    shadow += 'rgba('+color+','+color+','+color+','+opacity+') '+top+'px '+left+'px 1px 3px'+trail;
  }

  box.css('box-shadow', shadow);


}
