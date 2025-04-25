window.onload=()=>{
    const gonderButonu=document.getElementById('gonder');
    const gidecekMesaj=document.getElementById('gidecekMesaj');    
    const gelenMesajlar=document.getElementById('gelenMesajlar')
    
    const ws= new WebSocket('ws://192.168.166.36:3000');

    ws.addEventListener('message',(event)=>{
        const mesajSatiri='->'+event.data+'\n';
        gelenMesajlar.value+=mesajSatiri;
        gelenMesajlar.scrollTop=gelenMesajlar.scrollHeight;
    })

    ws.onopen=()=>{ console.log("sunucuya bağladı:)"); }
    ws.onclose=()=>{ console.log("bağlantı koptu!");}
    ws.onerror=(error)=>{console.log(error);
    }
    mesajGonder=()=>{
        const mesaj=gidecekMesaj.value.trim();
        if(mesaj.length>0) ws.send(mesaj);   
        gidecekMesaj.value='';
    }
    gonderButonu.addEventListener('click',()=>{
        mesajGonder();
    })
    gidecekMesaj.addEventListener('keydown',(e)=>{
        if(e.key==='Enter' && !e.shiftKey){
            e.preventDefault();
            mesajGonder();
        }
    })
}