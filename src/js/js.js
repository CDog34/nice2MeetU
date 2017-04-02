{

  let body = new Misaka(document.getElementsByTagName('body'));
  let loader = new Misaka(document.getElementsByClassName('loader'));
  let myLinks = new Misaka(document.getElementsByClassName('my-link')).click((e) => {
    e.stopPropagation();
    e.preventDefault();
    body.fadeOut(() => {
      window.location.href = e.clicked.href;
    });
  });


  window.onload = () => {
    loader.fadeOut();

  };
}



