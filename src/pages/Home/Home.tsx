import './Home.css'
import CardVehicule from '../../components/CardVehicule/CardVehicule'
import { useEffect, useRef, useState } from 'react'

interface Vehicule {
    urlImage: string,
    brand: string,
    model: string,
    year: number,
    price: number,
    id: string
}

export default function Home (){

    const ws = useRef<WebSocket>(null)
    
    
    const [vehicules, setVehicles] = useState<Vehicule[]>([])

    useEffect( () => {

        fetch('http://35.173.70.45:3000/vehicules')
        .then(res => res.json())
        .then(data => setVehicles(data.data))
        if(ws.current)
         return ws.current.close()

    },[])

    useEffect ( () => {

    ws.current = new WebSocket('ws://35.172.6.243:5000')
    
    ws.current.addEventListener('open', ()=> console.log('conectades'))
    ws.current.addEventListener('message', data => {
        const {payConcept} = JSON.parse(data.data)
        console.log(payConcept)
        const message = ` su pedido del ${payConcept.model} ${payConcept.brand} con un precio de ${payConcept.price} fue procesado 
                            con exito`

        alert(message)
    })


    }, [vehicules])


    return (
        <section className='home'>

            <h1>Venta de autos online</h1>

            <div className='containerVehicules'>

                {vehicules.map(vehicule => <CardVehicule 
                                            img={vehicule.urlImage} 
                                            brand={vehicule.brand} 
                                            model={vehicule.model} 
                                            year={vehicule.year}
                                            price={vehicule.price}
                                            id={vehicule.id}
                                             />
                                        )
                                    }

            </div>

        </section>
    )
}