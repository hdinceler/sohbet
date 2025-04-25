window.onload=()=>{
    const gonderButonu=document.getElementById('gonder');
    const gidecekMesaj=document.getElementById('gidecekMesaj');    
    const gelenMesajlar=document.getElementById('gelenMesajlar')
    const topRakip= document.getElementById('topRakip');
    const topBen= document.getElementById('topBen');

    const ws= new WebSocket('ws://192.168.1.100:3000');

    ws.addEventListener('message',(event)=>{
        const gelenMesaj=JSON.parse(event.data)

        // const mesajSatiri='->'+event.data+'\n';
        // gelenMesajlar.value+=mesajSatiri;
        // gelenMesajlar.scrollTop=gelenMesajlar.scrollHeight;
        
        topRakip.style.left=gelenMesaj.x+'px'
        topRakip.style.top=gelenMesaj.y +'px'
        
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
    });
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX; // pencere içinde X konumu
        const y=e.clientY;
        const position= {x,y}
        ws.send( JSON.stringify(position))
                
        topBen.style.left=x+'px'
        topBen.style.top=y +'px'
      });
}
