type args = {
    img: string,
    model: string,
    brand: string,
    year: number,
    price: number,
    id: string
}
import './CardVehicule.css'
import defaultImg from '../../assets/img2.wallspic.com-anime-arte_animado-manga-edificio-naranja-2199x1237.jpg'

export default function CardVehicule ({img, model, brand, year, price, id}: args) {

    const buyCar = () => {

        const vehiculeToBuy = {
            model,
            brand,
            year,
            price,
            id
        }

        fetch('http://35.173.70.45:3000/vehicules/order', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(vehiculeToBuy)
        })
        .then(res => res.json())
        .then(data => alert(data.message))

    }

    return (
    <article className='vehicule'>
        <figure>
            <img src={img || defaultImg} alt="" />
        </figure>
        <figcaption>
            <ul>
                <li>
                    <span>{model}</span>
                </li>
                <li>
                    <span>{brand}</span>
                </li>
                <li>
                    <span>{year}</span>
                </li>
                <li>
                    <span>{price}</span>
                </li>
            </ul>
            <button onClick={buyCar}>
                Comprar
            </button>
        </figcaption>
    </article>
    )

}