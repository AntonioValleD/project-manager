const formaterMS = (msTime) => {
    let ms = msTime % 1000;
    let st = Math.floor(((msTime - ms) / 1000))
    let s = st % 60;
    let m = Math.floor((st / 60) % 60);
    let h = Math.floor((st / 60 / 60)); 

    Number.prototype.ceros = function(n){
      return (this + "").padStart(n, 0);
    }

    return h.ceros(2)+":"+m.ceros(2)+":"+s.ceros(2);
}


export { formaterMS };