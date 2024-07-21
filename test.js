{
  //let keys = ["person", "name", "tr"];
  //keys = keys.reverse();
  //let value = "gencer";
  //let obj = {};

  //obj[keys[0]] = {[keys[1]] : {[keys[2]] : value}}

  let obj = {
    person_name_tr: "gencer",
    person_name_en: "young soldier",
    person_age: 34,
    time: new Date()
  }


  function correctObj(obj) {
    //
    function subKeysToObj(subKeys, value) {
      let current = { [subKeys[0]]: value }

      for (let subKey of subKeys.slice(1)) {
        current = { [subKey]: current };
        obj = current;
      }

      return obj;
    }

    let keys = Object.keys(obj);
    let subKeysWithValues = keys.map(key => { return { subKeys: key.split("_"), value: obj[key] } });
    let newObj = {};

    for (let item of subKeysWithValues) {
      newObj = { ...subKeysToObj(item.subKeys, item.value) }
    }

    return newObj;
  }




  console.log(correctObj(obj));
}

