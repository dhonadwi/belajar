const apa = () => {
  return new Promise((resolve, reject) => {
    const data = {
        status:'succes',
        data: 
          {id:'argarg',
          name:'dhona',
          age:'33'
        }
        
      }
    resolve(data)
  })
}


const isi = apa();

console.log(isi);

isi.then(a => {
  const {id,name,age} = a.data;
  console.log(`nama saya ${name}, umur ${age} tahun`);
})