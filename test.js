{
  fetch("https://www.izmir.bel.tr/tr/Sirketler/169")
    .then(res => res.text())
    .then(data => {

      console.log(data);

    })
}