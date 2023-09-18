'use client'

import { useState } from "react"

interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    new: boolean,
}

export default function MenuItemCard(props: any) {

    const webUrl: string = "http://localhost:8080"

    const [menu, setMenu] = useState<boolean>(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = {
            name: String(event.target.name.value),
            description: String(event.target.description.value),
            category: String(event.target.category.value),
            price: Number(event.target.price.value),
            isNew: Boolean(event.target.isNew.checked),
        }

        fetch(webUrl + "/admin/updateItem/" + props.item.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((data: MenuItem[]) => {
            props.setMenuItems(data);
            setMenu(prev => !prev)

        })

    }

    return (
        <div className="border-2 p-2 m-2 rounded-md bg-gray-100">

            {menu ? 
            

        <form onSubmit={handleSubmit}>
                <h1>Update New Item</h1>
                <div>
                    <h1>Name: </h1>
                    <input type="text" autoComplete="off" id="name" defaultValue={props.item.name} required minLength={3} maxLength={40} />
                </div>

                <div>
                    <h1>Description: </h1>
                    <input type="text" autoComplete="off" id="description" defaultValue={props.item.description} required minLength={3} maxLength={40} />
                </div>

                <div>
                    <h1>Category: </h1>
                    <select defaultValue={props.item.category} id="category">
                        <option value="default" disabled>Select meal type</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select> 
                </div>

                <div>
                    <h1>Price: </h1>
                    <input type="text" autoComplete="off" defaultValue={props.item.price} id="price" />
                </div>

                <div>
                    <h1>Is it new?:</h1>
                    <input type="checkbox" id="isNew" defaultValue={props.item.isNew} />
                </div>

                <button className="bg-green-500/80 p-2 rounded-md" type="submit">Submit</button>
                <button className="bg-red-500/80 p-2 rounded-md" onClick={() => setMenu(prev => !prev)}>Cancel</button>
            </form>

                :

            <div>
                <p>Id: {props.item.id}</p>
                <p>Name: {props.item.name}</p>
                <p>Description: {props.item.description}</p>
                <p>Category: {props.item.category}</p>
                <p>Price: {props.item.price}</p>
                <p>New: {props.item.new ? "true" : "false"}</p>
                <button onClick={() => props.removeItem(props.item.id)} className="bg-red-500/80 mt-2 p-2 rounded-md">Delete</button>
                <button onClick={() => setMenu(prev => !prev)} className="bg-green-500/80 mt-2 p-2 rounded-md">Update Item</button>
            </div>
            }
            </div>
    )
}