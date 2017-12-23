import $ from 'jquery';

const $document   = $(document);
const $body       = $('body');
const $containers = $('.container');

$document.on('keyup', (e) => {
  if ( e.keyCode === 71 && e.shiftKey ) {
    $body.toggleClass('show-leading');
    $.each($containers, (index) => {
      $containers.eq(index).toggleClass('show-grid');
    });
  }
});